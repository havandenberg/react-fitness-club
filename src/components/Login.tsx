import { parse } from 'query-string';
import * as R from 'ramda';
import * as React from 'react';
import { Redirect } from 'react-router';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { AuthProvider } from '../firebase';
import l from '../styles/layout';
import { fontSizes, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/user';
import { Page } from './App';
import Divider from './Divider';
import { ButtonTertiary } from './Form/Button';
import Hero from './Hero';
import withScroll from './hoc/withScroll';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface Props {
  location: {
    search: string;
  };
  login: (provider: AuthProvider) => void;
  logout: () => void;
  user?: Member;
}

interface State {
  isNew: boolean;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const values = parse(props.location.search);

    this.state = {
      isNew: R.equals(values.type, 'signup') || false,
    };
  }

  toggleIsNew = () => {
    this.setState({ isNew: !this.state.isNew });
  };

  render() {
    const { login, user } = this.props;
    const { isNew } = this.state;
    return user ? (
      <Redirect to="/dashboard" />
    ) : (
      <div>
        <Hero secondary />
        <t.Title center mb={spacing.ml}>
          RFC Portal Login
        </t.Title>
        <Divider white />
        <Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
          <l.FlexCentered>
            <t.Text large>
              Sign up or log in to RFC with your social media account.
            </t.Text>
          </l.FlexCentered>
          <l.Space height={spacing.xxxl} />
          <l.FlexCentered columnOnMobile>
            <GoogleLoginButton
              onClick={() => login('google')}
              style={{ width: 252 }}
            />
            <l.Space height={spacing.xl} width={spacing.xxxl} />
            <FacebookLoginButton
              onClick={() => login('facebook')}
              style={{ width: 252 }}
            />
          </l.FlexCentered>
          <l.Space height={spacing.xxxl} />
          <l.FlexCentered>
            <t.Text fontSize={fontSizes.h2}>- or -</t.Text>
          </l.FlexCentered>
          <l.Space height={spacing.xxxl} />
          <l.FlexCentered>
            <t.Text large>{`${
              isNew ? 'Sign up' : 'Log in'
            } with your email address and password.`}</t.Text>
          </l.FlexCentered>
          <l.Space height={spacing.xl} />
          {isNew ? <SignupForm /> : <LoginForm />}
          <l.Space height={[spacing.ml, spacing.xxxl]} />
          <l.FlexCentered>
            <ButtonTertiary onClick={this.toggleIsNew}>
              {isNew ? 'Login' : 'Sign Up'}
            </ButtonTertiary>
          </l.FlexCentered>
        </Page>
      </div>
    );
  }
}

export default withScroll(Login);
