import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { PulseLoader } from 'react-spinners';
import l from '../styles/layout';
import { colors, fontSizes, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { login } from '../utils/auth';
import Divider from './Divider';
import { ButtonTertiary } from './Form/Button';
import withScroll from './hoc/withScroll';
import LoginForm from './LoginForm';

interface Props {
  loading: boolean;
  member?: Member;
}

class Login extends React.Component<RouteComponentProps & Props> {
  render() {
    const { loading, member } = this.props;

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
        <t.Title center mb={spacing.ml}>
          RFC Portal Login
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
            <t.Text large>Log in with your email address and password.</t.Text>
          </l.FlexCentered>
          <l.Space height={spacing.xxxl} />
          <LoginForm />
          <l.Space height={spacing.xxxl} />
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
