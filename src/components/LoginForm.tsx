import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { PulseLoader } from 'react-spinners';
import SendImg from '../assets/images/send.svg';
import { auth } from '../firebase';
import l from '../styles/layout';
import {
  breakpoints,
  colors,
  fontSizes,
  mobileSizes,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import { scrollToId } from '../utils/scroll';
import { ButtonPrimary, ButtonSecondary } from './Form/Button';
import { TextInput } from './Form/Input';

const SelectFormWrapper = styled('div')({
  padding: spacing.xl,
  [breakpoints.mobile]: {
    padding: `${spacing.l} ${spacing.m}`,
  },
});

const ErrorMessage = styled(l.FlexCentered)({
  color: colors.red,
  fontSize: fontSizes.largeText,
  [breakpoints.mobile]: {
    fontSize: mobileSizes.largeText,
  },
});

const InputLabel = styled(t.Text)(
  {
    fontSize: fontSizes.largeText,
    fontWeight: 'bold',
    marginRight: spacing.l,
    width: '30%',
    [breakpoints.mobile]: {
      fontSize: fontSizes.text,
      marginBottom: spacing.ml,
      width: 'auto',
    },
  },
  ({ error }: { error?: boolean }) => ({
    color: error ? colors.red : colors.black,
  }),
);

const InputWrapper = styled(l.Flex)({
  margin: `0 auto ${spacing.xl}`,
  width: '90%',
  [breakpoints.mobile]: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: 'auto',
  },
});

const SendIcon = styled('img')({
  height: spacing.xl,
  marginRight: spacing.ml,
});

interface State {
  email: string;
  failed: boolean;
  loading: boolean;
  password: string;
  errors: {
    email: boolean;
    password: boolean;
  };
}

const initialState = {
  email: '',
  errors: {
    email: false,
    password: false,
  },
  failed: false,
  loading: false,
  password: '',
};

type loginField = 'email' | 'password';

class LoginForm extends React.Component<{}, State> {
  state = initialState;

  handleChange = (field: loginField) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      this.setState({
        ...this.state,
        [field]: e.target.value,
      });
    };
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, loading, password } = this.state;
    this.setState({ failed: false });

    const isValid = this.validate();

    if (!isValid) {
      scrollToId('contact-form');
      return;
    }

    if (!loading && isValid) {
      this.setState({ loading: true }, () => {
        auth
          .signInWithEmailAndPassword(email, password)
          .catch((error: Error) => {
            this.setState({
              email: '',
              failed: true,
              loading: false,
              password: '',
            });
            console.log(error);
          });
      });
    }
  };

  hasErrors = () => {
    const { errors } = this.state;
    return errors.email || errors.password;
  };

  resetForm = () => {
    this.setState(initialState);
  };

  validate = () => {
    const { email, password } = this.state;

    const errors = { ...initialState.errors };

    if (R.isEmpty(email)) {
      errors.email = true;
    }

    if (R.isEmpty(password)) {
      errors.password = true;
    }

    this.setState({ errors });

    return !errors.password && !errors.email;
  };

  render() {
    const { email, errors, failed, loading, password } = this.state;
    return (
      <form id="contact-form" onSubmit={this.handleSubmit}>
        <SelectFormWrapper>
          {failed && (
            <t.Text center color={colors.red} large mb={spacing.xl}>
              Invalid credentials, please try again.
            </t.Text>
          )}
          <div>
            {this.hasErrors() && (
              <ErrorMessage mb={spacing.xl}>
                Please correct the fields highlighted below and try again.
              </ErrorMessage>
            )}
            <InputWrapper>
              <InputLabel error={errors.email}>Email:</InputLabel>
              <TextInput
                error={errors.email}
                onChange={this.handleChange('email')}
                value={email}
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel error={errors.password}>Password:</InputLabel>
              <TextInput
                error={errors.password}
                onChange={this.handleChange('password')}
                type="password"
                value={password}
              />
            </InputWrapper>
          </div>
        </SelectFormWrapper>
        <l.FlexCentered mt={spacing.ml}>
          {loading ? (
            <PulseLoader sizeUnit="px" size={30} color={colors.red} />
          ) : (
            <l.FlexCentered columnRevOnMobile>
              {(failed || this.hasErrors()) && (
                <ButtonSecondary
                  py={spacing.l}
                  mr={[0, spacing.xl]}
                  onClick={this.resetForm}
                >
                  Reset
                </ButtonSecondary>
              )}
              <ButtonPrimary mb={[spacing.ml, 0]} type="submit">
                <SendIcon src={SendImg} />
                Login
              </ButtonPrimary>
            </l.FlexCentered>
          )}
        </l.FlexCentered>
      </form>
    );
  }
}

export default LoginForm;
