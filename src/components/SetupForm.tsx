import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { PulseLoader } from 'react-spinners';
import SendImg from '../assets/images/send.svg';
import firebase from '../firebase';
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
import { Member } from '../types/user';
import { scrollToId } from '../utils/scroll';
import { isValidEmail } from '../utils/validation';
import { ButtonPrimary, ButtonSecondary } from './form/Button';
import { TextInput } from './form/Input';

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
  completed: boolean;
  failed: boolean;
  loading: boolean;
  member: Member;
  errors: {
    city: boolean;
    dateOfBirth: boolean;
    email: boolean;
    firstName: boolean;
    lastName: boolean;
    newsletter: boolean;
    state: boolean;
    streetAddress1: boolean;
    zip: boolean;
  };
}

const initialState = {
  completed: false,
  errors: {
    city: false,
    dateOfBirth: false,
    email: false,
    firstName: false,
    lastName: false,
    newsletter: false,
    state: false,
    streetAddress1: false,
    zip: false,
  },
  failed: false,
  loading: false,
  member: {
    city: '',
    dateOfBirth: null,
    email: '',
    enrolledPrograms: [],
    firstName: '',
    isAccountSetupComplete: false,
    lastName: '',
    newsletter: false,
    state: '',
    streetAddress1: '',
    streetAddress2: '',
    zip: '',
  },
};

type signupField =
  | 'city'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'dateOfBirth'
  | 'state'
  | 'streetAddress1'
  | 'streetAddress2'
  | 'zip';

class ContactForm extends React.Component<{}, State> {
  state = initialState;

  handleChange = (field: signupField) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      this.setState({
        ...this.state,
        member: {
          ...this.state.member,
          [field]: e.target.value,
        },
      });
    };
  };

  toggleAddToNewsletter = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      member: {
        ...this.state.member,
        newsletter: e.target.checked,
      },
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { loading } = this.state;
    this.setState({ completed: false, failed: false });

    const isValid = this.validate();

    if (!isValid) {
      scrollToId('contact-form');
      return;
    }

    if (!loading && isValid) {
      this.setState({ loading: true }, () => {
        const membersRef = firebase.database().ref('members');
        membersRef
          .push()
          .set(this.state.member)
          .then(() => {
            this.setState({ ...initialState, completed: true, loading: false });
          })
          .catch((error: Error) => {
            this.setState({ failed: true, loading: false });
            console.log(error);
          });
      });
    }
  };

  hasErrors = () => {
    const { errors } = this.state;
    return (
      errors.firstName ||
      errors.lastName ||
      errors.email ||
      errors.streetAddress1 ||
      errors.city ||
      errors.state ||
      errors.zip
    );
  };

  resetForm = () => {
    this.setState(initialState);
  };

  validate = () => {
    const { email, firstName, lastName } = this.state.member;

    const errors = { ...initialState.errors };

    if (!isValidEmail(email)) {
      errors.email = true;
    }

    if (R.isEmpty(firstName)) {
      errors.firstName = true;
    }

    if (R.isEmpty(lastName)) {
      errors.lastName = true;
    }

    this.setState({ errors });

    return !errors.firstName && !errors.lastName && !errors.email;
  };

  render() {
    const { completed, errors, failed, loading } = this.state;
    const { email, firstName, lastName } = this.state.member;
    return (
      <form id="contact-form" onSubmit={this.handleSubmit}>
        <SelectFormWrapper>
          {completed && !failed && (
            <t.Text center color={colors.green} large mb={spacing.xl}>
              Success! Thank you for signing up and we look forward to seeing
              you at the studio.
            </t.Text>
          )}
          {!completed && failed && (
            <t.Text center color={colors.red} large mb={spacing.xl}>
              An error has occurred. Please try again later or email us directly
              at
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
                mb={[spacing.ml, 0]}
                onChange={this.handleChange('firstName')}
                placeholder="first"
                value={firstName}
              />
              <l.Space width={[0, spacing.xxxl]} />
              <TextInput
                error={errors.lastName}
                onChange={this.handleChange('lastName')}
                placeholder="last"
                value={lastName}
              />
            </InputWrapper>
            <InputWrapper>
              <InputLabel error={errors.email}>
                Email<l.Red>*</l.Red>:
              </InputLabel>
              <TextInput
                error={errors.email}
                onChange={this.handleChange('email')}
                placeholder="me@awesome.com"
                value={email}
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
                  Form
                </ButtonSecondary>
              )}
              <ButtonPrimary mb={[spacing.ml, 0]} type="submit">
                <SendIcon src={SendImg} />
                Submit
              </ButtonPrimary>
            </l.FlexCentered>
          )}
        </l.FlexCentered>
      </form>
    );
  }
}

export default ContactForm;
