import * as React from 'react';
import styled from 'react-emotion';
import { Redirect, RouteComponentProps } from 'react-router';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { PulseLoader } from 'react-spinners';
import { getGenericMembership } from 'src/utils/membership';
import { scrollToId } from 'src/utils/scroll';
import l from '../styles/layout';
import {
  borders,
  breakpoints,
  colors,
  fontSizes,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { login } from '../utils/auth';
import Divider from './Divider';
import { ButtonTertiary } from './Form/Button';
import withScroll from './hoc/withScroll';
import MembershipBadge, { multipassCost } from './MembershipBadge';
import SignupForm from './SignupForm';

const MembershipCard = styled(l.FlexColumn)({
  border: borders.blackThick,
  borderRadius: borders.borderRadius,
  height: 300,
  justifyContent: 'space-between',
  padding: spacing.xl,
  [breakpoints.tabletDown]: {
    padding: spacing.ml,
  },
});

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
            <t.TextButton
              border={borders.red}
              color={colors.red}
              large
              mb={spacing.ml}
              onClick={() => scrollToId('sign-up-here')}>
              Sign up here
            </t.TextButton>
            <t.Text center large mb={spacing.ml}>
              Then you will be able to choose a membership and enroll in
              programs.
            </t.Text>
            <t.Text center large>
              We offer the following membership options:
            </t.Text>
            <l.FlexCentered columnRevOnMobile my={spacing.xxxl} width="100%">
              <MembershipCard>
                <div>
                  <t.Text bold center large mt={spacing.sm}>
                    Single Program Membership
                  </t.Text>
                  <l.Space height={spacing.xxxxl} />
                  <t.Text center color={colors.gray}>
                    Full access to one RFC program
                  </t.Text>
                </div>
                <l.Space height={spacing.sm} />
                <t.Link
                  border={borders.red}
                  center="true"
                  color={colors.red}
                  large="true"
                  mb={spacing.ml}
                  to="/programs">
                  Click here for program pricing
                </t.Link>
              </MembershipCard>
              <l.Space height={spacing.xxxl} width={spacing.xxxl} />
              <MembershipCard>
                <MembershipBadge
                  membership={getGenericMembership('multipass')}
                />
                <l.Space height={spacing.sm} />
                <t.Text center color={colors.gray}>
                  Unlimited access to all RFC programs
                </t.Text>
                <l.Space height={spacing.s} />
                <t.Text center color={colors.gray}>
                  2 free day passes per month included
                </t.Text>
                <l.Space height={spacing.sm} />
                {multipassCost}
              </MembershipCard>
            </l.FlexCentered>
            <t.Text center large mb={spacing.xxl}>
              Day passes are also available at the door for $10 / day.
            </t.Text>
            <t.Text color={colors.red} large id="sign-up-here">
              Sign up below:
            </t.Text>
            <t.Text large my={spacing.xxl}>
              Create a React Fitness Club account with social media.
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
            <t.Text large>
              Create an account with your email address and password.
            </t.Text>
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
