import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { PulseLoader } from 'react-spinners';
import { getGenericMembership } from 'src/utils/membership';
import l from '../styles/layout';
import { borders, colors, fontSizes, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { login } from '../utils/auth';
import Divider from './Divider';
import { ButtonTertiary } from './Form/Button';
import withScroll from './hoc/withScroll';
import MembershipBadge, { multipassCost } from './MembershipBadge';
import SignupForm from './SignupForm';

interface Props {
  loading: boolean;
  member?: Member;
}

class Signup extends React.Component<RouteComponentProps & Props> {
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
          RFC Sign Up
        </t.Title>
        <Divider white />
        <l.Page
          px={[spacing.sm, 0]}
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
          <l.FlexColumn>
            <t.Text
              center
              large
              mb={spacing.ml}
              width={['100%', '100%', '80%']}>
              To sign up for React Fitness Club, create an account using one of
              the options below and complete the setup form.
            </t.Text>
            <t.Text center large mb={spacing.ml}>
              Then you will be able to choose a membership and enroll in
              programs.
            </t.Text>
            <t.Text center large mb={spacing.ml}>
              We offer the following membership options:
            </t.Text>
            <l.Flex
              columnRevOnMobile
              justifyContent="space-around"
              my={spacing.xxxl}
              width="100%">
              <l.FlexColumn>
                <t.Text bold large>
                  Single Program Membership
                </t.Text>
                <l.Space height={spacing.xxxl} />
                <t.Text color={colors.gray}>
                  Full access to one RFC program
                </t.Text>
                <l.Space height={spacing.sm} />
                <t.Link
                  border={borders.red}
                  color={colors.red}
                  large="true"
                  to="/programs">
                  Click here for program pricing
                </t.Link>
              </l.FlexColumn>
              <l.FlexColumn mb={[spacing.xxxl, 0, 0]}>
                <MembershipBadge
                  membership={getGenericMembership('multipass')}
                />
                <l.Space height={spacing.sm} />
                <t.Text color={colors.gray}>
                  Unlimited access to all RFC programs
                  <l.Break />2 free day passes per month included
                </t.Text>
                <l.Space height={spacing.sm} />
                {multipassCost}
              </l.FlexColumn>
            </l.Flex>
            <t.Text large my={spacing.ml}>
              Sign up for a React Fitness Club account with social media.
            </t.Text>
          </l.FlexColumn>
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
            <t.Text large>Sign up with your email address and password.</t.Text>
          </l.FlexCentered>
          <l.Space height={spacing.xxxl} />
          <SignupForm />
          <l.Space height={spacing.xxxl} />
          <l.FlexCentered>
            <t.Link to="/login">
              <ButtonTertiary>Login</ButtonTertiary>
            </t.Link>
          </l.FlexCentered>
        </l.Page>
      </div>
    );
  }
}

export default withScroll(Signup);
