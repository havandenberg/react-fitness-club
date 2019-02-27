import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { PulseLoader } from 'react-spinners';
import UserImg from '../assets/images/user.svg';
import l from '../styles/layout';
import { colors, fontSizes, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { login } from '../utils/auth';
import { scrollToId } from '../utils/scroll';
import Divider from './Divider';
import ForgotPasswordForm from './ForgotPasswordForm';
import { ButtonTertiary } from './Form/Button';
import withScroll from './hoc/withScroll';
import LoginForm from './LoginForm';

interface Props {
  loading: boolean;
  member?: Member;
}

interface State {
  forgotPassword: boolean;
}

class Login extends React.Component<RouteComponentProps & Props, State> {
  state = {
    forgotPassword: false,
  };

  setForgotPassword = (forgotPassword: boolean) => {
    this.setState({ forgotPassword }, () => scrollToId('form-section'));
  };

  render() {
    const { loading, member } = this.props;
    const { forgotPassword } = this.state;

    if (member) {
      return <Redirect to="/dashboard" />;
    }

    if (loading) {
      return (
        <l.FlexCentered my={spacing.xxxxxl}>
          <PulseLoader sizeUnit="px" size={30} color={colors.black} />
        </l.FlexCentered>
      );
    }

    return (
      <div>
        <t.Title center pb={spacing.ml}>
          <l.FlexCentered>
            <l.Img
              height={[spacing.xxl, spacing.xxl, spacing.xxxxl]}
              mr={spacing.ml}
              src={UserImg}
            />
            RFC Portal Login
          </l.FlexCentered>
        </t.Title>
        <Divider white />
        <l.Page
          px={[spacing.sm, 0]}
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
          <l.FlexColumn>
            <t.Text large mb={spacing.ml}>
              Log in to RFC with your social media account.
            </t.Text>
            <t.Link center="true" color={colors.red} large="true" to="/signup">
              New to RFC? Sign up here!
            </t.Link>
          </l.FlexColumn>
          <l.Space height={[spacing.xl, spacing.xxxl]} />
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
          <l.Space height={[spacing.xl, spacing.xxxl]} />
          <l.FlexCentered>
            <t.Text fontSize={fontSizes.h2}>- or -</t.Text>
          </l.FlexCentered>
          <l.Space height={[spacing.xl, spacing.xxxl]} />
          <l.FlexCentered id="form-section">
            <t.Text large>
              {forgotPassword
                ? 'Enter your email and click send to receive a password reset email.'
                : 'Log in with your email address and password.'}
            </t.Text>
          </l.FlexCentered>
          <l.Space height={[spacing.xl, spacing.xxxl]} />
          {forgotPassword ? (
            <ForgotPasswordForm onBack={() => this.setForgotPassword(false)} />
          ) : (
            <LoginForm />
          )}
          {!forgotPassword && (
            <>
              <l.Space height={[spacing.xl, spacing.xxxl]} />
              <l.FlexCentered>
                <ButtonTertiary onClick={() => this.setForgotPassword(true)}>
                  Forgot password?
                </ButtonTertiary>
              </l.FlexCentered>
            </>
          )}
          <l.Space height={[spacing.xl, spacing.xxxl]} />
          <l.FlexCentered>
            <t.Link to="/signup">
              <ButtonTertiary>Sign up</ButtonTertiary>
            </t.Link>
          </l.FlexCentered>
        </l.Page>
      </div>
    );
  }
}

export default withScroll(Login);
