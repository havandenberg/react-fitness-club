import * as React from 'react';
import styled from 'react-emotion';
import l from '../styles/layout';
import {
  borders,
  breakpoints,
  colors,
  fontSizes,
  gradients,
  shadows,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import Divider from './Divider';
import { TextInput } from './Form/Input';

const NewsletterInner = styled(l.FlexColumn)({
  fontStyle: 'italic',
  marginTop: spacing.xxxxxl,
  padding: `0 ${spacing.sm}`,
  [breakpoints.mobile]: {
    marginTop: spacing.xxxl,
  },
});

const Submit = styled('button')({
  background: gradients.black,
  borderRadius: borders.borderRadius,
  boxShadow: shadows.box,
  color: colors.white,
  cursor: 'pointer',
  fontSize: fontSizes.largeText,
  fontWeight: 'bold',
  height: '100%',
  padding: spacing.sm,
});

interface State {
  email: string;
}

class Newsletter extends React.Component<{}, State> {
  state = {
    email: '',
  };

  handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  signup = () => {
    const subscriber = JSON.stringify({
      email_address: this.state.email,
      status: 'subscribed',
    });

    console.log(subscriber);

    // request({
    //   body: subscriber,
    //   headers: {
    //     Authorization: 'apikey 475de040e38fa7648ec54050c8f8e9c3-us19',
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    //   url: 'https://us19.api.mailchimp.com/3.0/lists/f68e0e9587/members',
    // });
    // axios.post('https://us19.api.mailchimp.com/3.0/lists/f68e0e9587/members/', {
    //   data: {
    //     email_address: 'halseyvandenberg@gmail.com',
    //     merge_fields: {
    //       FNAME: 'Halsey',
    //       LNAME: 'Vandenberg',
    //     },
    //     status: 'subscribed',
    //   },
    //   headers: {
    //     Authorization: 'admin 475de040e38fa7648ec54050c8f8e9c3-us19',
    //     'Content-Type': 'application/json',
    //   },
    // });
  };
  render() {
    const { email } = this.state;
    return (
      <l.Space position="relative">
        <Divider white showHeavyBags />
        <NewsletterInner>
          <t.Text
            bold
            center
            large
            mb={[spacing.xl, spacing.xl]}
            mx="auto"
            width={['100%', '60%']}
          >
            Enter your email here to sign up for our monthly newsletter!
          </t.Text>
          <l.FlexColumn width={['100%', 'auto']}>
            <TextInput
              onChange={this.handleEmailChange}
              placeholder="me@awesome.com"
              textAlign="center"
              value={email}
            />
            <l.Space height={spacing.xl} />
            <Submit onClick={this.signup}>Sign Up</Submit>
          </l.FlexColumn>
        </NewsletterInner>
      </l.Space>
    );
  }
}

export default Newsletter;
