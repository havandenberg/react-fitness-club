import * as React from 'react';
import styled from 'react-emotion';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { PulseLoader } from 'react-spinners';
import l from '../styles/layout';
import { borders, breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { scrollToId } from '../utils/scroll';
import { isValidEmail } from '../utils/validation';
import Divider from './Divider';
import { ButtonSecondary } from './Form/Button';
import { TextInput } from './Form/Input';

const NewsletterInner = styled(l.FlexColumn)({
  marginTop: spacing.xxxxxl,
  padding: `0 ${spacing.sm}`,
  [breakpoints.mobile]: {
    marginTop: spacing.xxxl,
  },
});

interface State {
  email: string;
  showError?: boolean;
}

class Newsletter extends React.Component<{}, State> {
  state = {
    email: '',
    showError: false,
  };

  handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  signup = (subscribe: (data: object) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      scrollToId('newsletter');
      this.setState({ showError: false }, () => {
        if (isValidEmail(this.state.email)) {
          subscribe({
            EMAIL: this.state.email,
            SOURCE: 'web-newsletter-signup',
          });
          this.setState({ email: '' });
        } else {
          this.setState({ showError: true });
        }
      });
    };
  };

  render() {
    const { email, showError } = this.state;
    return (
      <l.Space id="newsletter" position="relative">
        <Divider white showHeavyBags />
        {process.env.REACT_APP_MAILCHIMP_URI && (
          <NewsletterInner>
            <t.Text
              bold
              center
              italic
              large
              mb={[spacing.ml, spacing.xl]}
              mx="auto"
              width={['100%', '60%']}
            >
              Enter your email here to sign up for our monthly newsletter!
            </t.Text>
            <MailchimpSubscribe
              render={({ subscribe, status }) => (
                <form onSubmit={this.signup(subscribe)}>
                  <l.FlexColumn width={['100%', 'auto']}>
                    {status === 'success' && (
                      <t.Text center color={colors.green} mb={spacing.ml}>
                        Success!
                      </t.Text>
                    )}
                    {status === 'error' && !showError && (
                      <t.Text center color={colors.red} mb={spacing.ml}>
                        An error has occurred. Please try again later or&nbsp;
                        <t.Link
                          border={borders.black}
                          color={colors.black}
                          to="/contact"
                        >
                          contact us directly.
                        </t.Link>
                      </t.Text>
                    )}
                    {showError && (
                      <t.Text center color={colors.red} mb={spacing.ml}>
                        Please enter a valid email.
                      </t.Text>
                    )}
                    <TextInput
                      error={showError}
                      onChange={this.handleEmailChange}
                      placeholder="me@awesome.com"
                      textAlign="center"
                      value={email}
                    />
                    <l.Space height={spacing.xl} />
                    {status === 'sending' ? (
                      <PulseLoader
                        sizeUnit="px"
                        size={30}
                        color={colors.black}
                      />
                    ) : (
                      <ButtonSecondary type="submit">Sign Up</ButtonSecondary>
                    )}
                  </l.FlexColumn>
                </form>
              )}
              url={process.env.REACT_APP_MAILCHIMP_URI}
            />
          </NewsletterInner>
        )}
      </l.Space>
    );
  }
}

export default Newsletter;
