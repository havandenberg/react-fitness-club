import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import UserImg from '../assets/images/user.svg';
import l from '../styles/layout';
import { spacing } from '../styles/theme';
import t from '../styles/typography';
import { newMemberDefaults } from '../types/member';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import SetupForm from './SetupForm';

class Signup extends React.Component<RouteComponentProps> {
  render() {
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
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}
        >
          <t.Text center large mb={spacing.xxl} width={['100%', '100%', '80%']}>
            To sign up for any of our programs, create a React Fitness Club
            account using the form below.
          </t.Text>
          <SetupForm member={newMemberDefaults} />
        </l.Page>
      </div>
    );
  }
}

export default withScroll(Signup);
