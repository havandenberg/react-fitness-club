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
import { ButtonTertiary } from './form/Button';
import Hero from './Hero';
import withScroll from './hoc/withScroll';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface Props {
  login: (provider: AuthProvider) => void;
  logout: () => void;
  user: Member | null;
}

interface State {
  isNew: boolean;
}

class Login extends React.Component<Props, State> {
  state = {
    isNew: false,
  };

  toggleIsNew = () => {
    this.setState({ isNew: !this.state.isNew });
  };

  render() {
    const { login, user } = this.props;
    const { isNew } = this.state;
    return user ? (
      <Redirect to="/" />
    ) : (
      <div>
        <Hero secondary />
        <t.Title center mb={spacing.ml}>
          RFC Portal Login
        </t.Title>
        <Divider white />
        <Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
          <l.FlexCentered>
            <GoogleLoginButton onClick={() => login('google')} />
            <l.Space width={spacing.xxxl} />
            <FacebookLoginButton onClick={() => login('facebook')} />
          </l.FlexCentered>
          <l.Space height={spacing.xxxxxl} />
          <l.FlexCentered>
            <t.Text fontSize={fontSizes.h2}>- or -</t.Text>
          </l.FlexCentered>
          <l.Space height={spacing.xxxl} />
          {isNew ? <SignupForm /> : <LoginForm />}
          <l.Space height={spacing.xxxl} />
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
