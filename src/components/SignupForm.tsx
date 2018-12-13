import * as firebase from 'firebase';
import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { PulseLoader } from 'react-spinners';
import SendImg from '../assets/images/send.svg';
import { auth } from '../firebase';
import l from '../styles/layout';
import {
  borders,
  breakpoints,
  colors,
  fontSizes,
  mobileSizes,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import { newUserDefaults } from '../types/user';
import { isTabletUp } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import {
  containsLowercase,
  containsNumber,
  containsUppercase,
  enoughCharacters,
  isValidEmail,
  isValidPassword,
} from '../utils/validation';
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
  margin: `0 auto`,
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
  confirmPassword: string;
  email: string;
  errors: {
    confirmPassword: boolean;
    email: boolean;
    firstName: boolean;
    lastName: boolean;
    password: boolean;
    passwordMatch: boolean;
  };
  failed: boolean;
  firstName: string;
  lastName: string;
  loading: boolean;
  password: string;
}

const initialState = {
  confirmPassword: '',
  email: '',
  errors: {
    confirmPassword: false,
    email: false,
    firstName: false,
    lastName: false,
    password: false,
    passwordMatch: false,
  },
  failed: false,
  firstName: '',
  lastName: '',
  loading: false,
  password: '',
};

type signupField =
  | 'email'
  | 'confirmPassword'
  | 'password'
  | 'firstName'
  | 'lastName';

class ContactForm extends React.Component<{}, State> {
  state = initialState;

  handleChange = (field: signupField) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      this.setState({
        ...this.state,
        [field]: e.target.value,
      });
    };
  };

  handleSubmit = (subscribe: (data: object) => void) => (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    const { email, firstName, lastName, loading, password } = this.state;
    this.setState({ failed: false });

    const isValid = this.validate();

    if (!isValid) {
      scrollToId('contact-form');
      return;
    }

    if (!loading && isValid) {
      this.setState({ loading: true }, () => {
        subscribe({
          EMAIL: email,
          FNAME: firstName,
          LNAME: lastName,
          SOURCE: 'web-portal-form',
        });
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((data: firebase.auth.UserCredential) => {
            if (data.user) {
              firebase
                .database()
                .ref(`members/${data.user.uid}`)
                .set({
                  ...newUserDefaults,
                  email,
                  firstName,
                  lastName,
                });
            }
          });
      });
    }
  };

  hasErrors = () => {
    const { errors } = this.state;
    return (
      errors.email ||
      errors.password ||
      errors.passwordMatch ||
      errors.confirmPassword ||
      errors.firstName ||
      errors.lastName
    );
  };

  resetForm = () => {
    this.setState(initialState);
  };

  validate = () => {
    const {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    } = this.state;

    const errors = { ...initialState.errors };

    if (!isValidEmail(email)) {
      errors.email = true;
    }

    if (!isValidPassword(password)) {
      errors.password = true;
    }

    if (R.isEmpty(confirmPassword)) {
      errors.confirmPassword = true;
    }

    if (!R.equals(password, confirmPassword)) {
      errors.passwordMatch = true;
    }

    if (R.isEmpty(firstName)) {
      errors.firstName = true;
    }

    if (R.isEmpty(lastName)) {
      errors.lastName = true;
    }

    this.setState({ errors });

    return (
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword &&
      !errors.passwordMatch &&
      !errors.firstName &&
      !errors.lastName
    );
  };

  render() {
    const {
      confirmPassword,
      email,
      errors,
      failed,
      firstName,
      lastName,
      loading,
      password,
    } = this.state;
    return (
      <MailchimpSubscribe
        render={({ subscribe }) => (
          <form id="signup-form" onSubmit={this.handleSubmit(subscribe)}>
            <SelectFormWrapper>
              {failed && (
                <t.Text center color={colors.red} large mb={spacing.xl}>
                  An error has occurred. Please try again later or email us
                  directly at
                  <t.Anchor
                    border={borders.red}
                    color={colors.red}
                    href="mailto:reactfitnessclub@gmail.com"
                  >
                    reactfitnessclub@gmail.com
                  </t.Anchor>
                </t.Text>
              )}
              <div>
                {this.hasErrors() && (
                  <ErrorMessage mb={spacing.xl}>
                    Please correct the fields highlighted below and try again.
                  </ErrorMessage>
                )}
                <InputWrapper>
                  <InputLabel error={errors.firstName} nowrap>
                    Name<l.Red>*</l.Red>:
                  </InputLabel>
                  <TextInput
                    error={errors.firstName}
                    onChange={this.handleChange('firstName')}
                    value={firstName}
                  />
                  {!isTabletUp() && <l.Space height={spacing.s} />}
                  {!isTabletUp() && (
                    <t.HelpText flex={1} width={350}>
                      first name
                    </t.HelpText>
                  )}
                  {!isTabletUp() && <l.Space height={spacing.ml} />}
                  <l.Space width={[0, spacing.xxxl]} />
                  <TextInput
                    error={errors.lastName}
                    onChange={this.handleChange('lastName')}
                    value={lastName}
                  />
                </InputWrapper>
                <l.Space height={spacing.s} />
                <InputWrapper>
                  {isTabletUp() && <InputLabel />}
                  {isTabletUp() && (
                    <t.HelpText
                      flex={1}
                      valid={!R.isEmpty(firstName)}
                      width={350}
                    >
                      first name
                    </t.HelpText>
                  )}
                  <l.Space width={[0, spacing.xxxl]} />
                  <t.HelpText flex={1} valid={!R.isEmpty(lastName)}>
                    last name
                  </t.HelpText>
                </InputWrapper>
                <l.Space height={spacing.xl} />
                <InputWrapper>
                  <InputLabel error={errors.email}>
                    Email<l.Red>*</l.Red>:
                  </InputLabel>
                  <TextInput
                    error={errors.email}
                    onChange={this.handleChange('email')}
                    value={email}
                  />
                </InputWrapper>
                <l.Space height={spacing.s} />
                <InputWrapper>
                  {isTabletUp() && <InputLabel />}
                  <t.HelpText valid={isValidEmail(email)}>
                    me@awesome.com
                  </t.HelpText>
                </InputWrapper>
                <l.Space height={spacing.xl} />
                <InputWrapper>
                  <InputLabel error={errors.password || errors.passwordMatch}>
                    Password<l.Red>*</l.Red>:
                  </InputLabel>
                  <TextInput
                    error={errors.password || errors.passwordMatch}
                    onChange={this.handleChange('password')}
                    type="password"
                    value={password}
                  />
                </InputWrapper>
                <l.Space height={spacing.s} />
                <InputWrapper>
                  {isTabletUp() && <InputLabel />}
                  <t.HelpText>
                    <t.HelpSpan valid={!!containsLowercase(password)}>
                      1 lowercase
                    </t.HelpSpan>
                    ,{' '}
                    <t.HelpSpan valid={!!containsUppercase(password)}>
                      1 uppercase
                    </t.HelpSpan>
                    ,{' '}
                    <t.HelpSpan valid={!!containsNumber(password)}>
                      1 number
                    </t.HelpSpan>
                    ,{' '}
                    <t.HelpSpan valid={!!enoughCharacters(password)}>
                      8+ characters
                    </t.HelpSpan>
                  </t.HelpText>
                </InputWrapper>
                <l.Space height={spacing.xl} />
                <InputWrapper>
                  <InputLabel
                    error={errors.confirmPassword || errors.passwordMatch}
                  >
                    Confirm Password<l.Red>*</l.Red>:
                  </InputLabel>
                  <TextInput
                    error={errors.confirmPassword || errors.passwordMatch}
                    onChange={this.handleChange('confirmPassword')}
                    type="password"
                    value={confirmPassword}
                  />
                </InputWrapper>
                <l.Space height={spacing.s} />
                <InputWrapper>
                  {isTabletUp() && <InputLabel />}
                  <t.HelpText>
                    <t.HelpSpan
                      valid={
                        !R.isEmpty(password) &&
                        R.equals(password, confirmPassword)
                      }
                    >
                      must match password
                    </t.HelpSpan>
                  </t.HelpText>
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
                    Sign Up
                  </ButtonPrimary>
                </l.FlexCentered>
              )}
            </l.FlexCentered>
          </form>
        )}
        url={process.env.REACT_APP_MAILCHIMP_URI || ''}
      />
    );
  }
}

export default ContactForm;
