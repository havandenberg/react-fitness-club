import * as emailjs from 'emailjs-com';
import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { PulseLoader } from 'react-spinners';
import SendImg from '../assets/images/send.svg';
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
import { programsList } from '../utils/constants';
import { isTabletUp } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import { isValidEmail } from '../utils/validation';
import { ButtonPrimary, ButtonSecondary } from './Form/Button';
import { CheckboxRadioInputWithLabel } from './Form/CheckboxRadio';
import { SelectInput, TextArea, TextInput } from './Form/Input';

const ContactFormWrapper = styled('div')({
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
  addToNewsletter: boolean;
  completed: boolean;
  email: string;
  errors: {
    email: boolean;
    firstName: boolean;
    lastName: boolean;
    message: boolean;
  };
  failed: boolean;
  firstName: string;
  lastName: string;
  loading: boolean;
  message: string;
  program: string;
}

const initialState = {
  addToNewsletter: true,
  completed: false,
  email: '',
  errors: {
    email: false,
    firstName: false,
    lastName: false,
    message: false,
  },
  failed: false,
  firstName: '',
  lastName: '',
  loading: false,
  message: '',
  program: '',
};

type contactField = 'firstName' | 'lastName' | 'email' | 'message' | 'program';

class ContactForm extends React.Component<{}, State> {
  state = initialState;

  handleChange = (field: contactField) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      this.setState({
        ...this.state,
        [field]: e.target.value,
      });
    };
  };

  toggleAddToNewsletter = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      addToNewsletter: e.target.checked,
    });
  };

  handleSubmit = (subscribe: (data: object) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      const {
        addToNewsletter,
        email,
        loading,
        message,
        firstName,
        lastName,
        program,
      } = this.state;

      if (!this.validate()) {
        scrollToId('contact-form');
        return;
      }

      if (!loading && this.validate()) {
        if (addToNewsletter) {
          subscribe({
            EMAIL: email,
            FNAME: firstName,
            LNAME: lastName,
            SOURCE: 'web-contact-form',
          });
        }

        this.setState(
          {
            loading: true,
          },
          () => {
            if (process.env.REACT_APP_EMAILJS_KEY) {
              emailjs
                .send(
                  'react_fitness_club',
                  'template_rfc',
                  {
                    from_name: `${firstName} ${lastName}`,
                    mailing_list: addToNewsletter
                      ? 'This contact was also added to the mailing list.'
                      : 'This contact was NOT added to the mailing list.',
                    message,
                    program,
                    reply_to: email,
                  },
                  process.env.REACT_APP_EMAILJS_KEY,
                )
                .then(
                  () => {
                    this.setState({ ...initialState, completed: true });
                  },
                  (error: object) => {
                    console.log(error);
                    this.setState({ failed: true, loading: false });
                  },
                );
            } else {
              console.log('Invalid emailjs key');
            }
          },
        );
      }
    };
  };

  hasErrors = () => {
    const { errors } = this.state;
    return (
      errors.firstName || errors.lastName || errors.email || errors.message
    );
  };

  resetForm = () => {
    scrollToId('contact-form');
    this.setState(initialState);
  };

  validate = () => {
    const { email, firstName, lastName, message } = this.state;

    const errors = {
      email: false,
      firstName: false,
      lastName: false,
      message: false,
    };

    if (!isValidEmail(email)) {
      errors.email = true;
    }

    if (R.isEmpty(message)) {
      errors.message = true;
    }

    if (R.isEmpty(firstName)) {
      errors.firstName = true;
    }

    if (R.isEmpty(lastName)) {
      errors.lastName = true;
    }

    this.setState({ errors });

    return (
      !errors.firstName && !errors.lastName && !errors.message && !errors.email
    );
  };

  render() {
    const {
      addToNewsletter,
      completed,
      email,
      errors,
      failed,
      firstName,
      lastName,
      loading,
      message,
      program,
    } = this.state;

    return (
      <MailchimpSubscribe
        render={({ subscribe }) => (
          <form id="contact-form" onSubmit={this.handleSubmit(subscribe)}>
            <ContactFormWrapper>
              {completed && !failed && (
                <t.Text center color={colors.green} large mb={spacing.xl}>
                  Success! One of our coaches will contact you as soon as
                  possible with a response.
                </t.Text>
              )}
              {!completed && failed && (
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
                  <InputLabel>Program interest:</InputLabel>
                  <SelectInput
                    onChange={this.handleChange('program')}
                    value={program}
                  >
                    <option value="general">General interest</option>
                    {programsList.map((prog: string, index: number) => (
                      <option key={index} value={prog}>
                        {prog}
                      </option>
                    ))}
                  </SelectInput>
                </InputWrapper>
                <l.Space height={spacing.xl} />
                <InputWrapper alignTop>
                  <InputLabel error={errors.message} mt={[0, spacing.s]}>
                    Message<l.Red>*</l.Red>:
                  </InputLabel>
                  <TextArea
                    error={errors.message}
                    onChange={this.handleChange('message')}
                    value={message}
                  />
                </InputWrapper>
                <t.Text bold center large mb={spacing.xl} mt={spacing.xxxl}>
                  Would you like to sign up for the monthly newsletter for
                  updates on events, competitions, and similar?
                </t.Text>
                <l.FlexCentered>
                  <CheckboxRadioInputWithLabel
                    checked={addToNewsletter}
                    onChange={this.toggleAddToNewsletter}
                    text={addToNewsletter ? 'Yes, please' : 'Not right now'}
                    type="checkbox"
                  />
                </l.FlexCentered>
              </div>
            </ContactFormWrapper>
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
        )}
        url={`${process.env.REACT_APP_MAILCHIMP_URI}`}
      />
    );
  }
}

export default ContactForm;
