import * as React from 'react';
// import styled from 'react-emotion';
import { Redirect, RouteComponentProps } from 'react-router';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { PulseLoader } from 'react-spinners';
import UserImg from '../assets/images/user.svg';
import l from '../styles/layout';
import {
  // borders,
  // breakpoints,
  colors,
  fontSizes,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { login } from '../utils/auth';
// import { getGenericMembership } from '../utils/membership';
// import { scrollToId } from '../utils/scroll';
import Divider from './Divider';
import { ButtonTertiary } from './Form/Button';
import withScroll from './hoc/withScroll';
// import MembershipBadge, { multipassCost } from './MembershipBadge';
import SignupForm from './SignupForm';

// const MembershipCard = styled(l.FlexColumn)({
//   border: borders.blackThick,
//   borderRadius: borders.radius,
//   height: 300,
//   justifyContent: 'space-between',
//   padding: spacing.xl,
//   [breakpoints.tabletDown]: {
//     padding: spacing.ml,
//   },
// });

interface Props {
  loading: boolean;
  member?: Member;
}

class Signup extends React.Component<RouteComponentProps & Props> {
  render() {
    const { loading, member } = this.props;

    if (member) {
      return <Redirect to="/portal" />;
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
            RFC Sign Up
          </l.FlexCentered>
        </t.Title>
        <Divider white />
        <l.Page
          px={[spacing.sm, 0]}
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
          <l.FlexColumn>
            <t.Text
              center
              large
              mb={spacing.xxl}
              width={['100%', '100%', '80%']}>
              To sign up for any of our programs, create a React Fitness Club
              account using one of the options below.
            </t.Text>
            <t.Text large mb={spacing.xxl}>
              Create an account with social media.
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
