import * as React from 'react';
import SignupImg from '../assets/images/signup';
import UserImg from '../assets/images/user';
import l from '../styles/layout';
import { borders, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { newMemberDefaults } from '../types/member';
import { scrollToId } from '../utils/scroll';
import Divider from './Divider';
import { ButtonPrimary, ButtonSecondary } from './Form/Button';
import withScroll from './hoc/withScroll';
import SetupForm from './SetupForm';

interface State {
  success: boolean;
}

class NewSignup extends React.Component<{}, State> {
  state = {
    success: false,
  };

  handleSuccess = () => {
    this.setState({ success: true });
    scrollToId('title');
  };

  reset = () => {
    this.setState({ success: false });
  };

  render() {
    const { success } = this.state;
    return (
      <div>
        <t.Title center pb={spacing.ml} id="title">
          <l.FlexCentered>
            <l.Space mr={spacing.ml}>
              <SignupImg side={[spacing.xxl, spacing.xxl, spacing.xxxxl]} />
            </l.Space>
            RFC Sign Up
          </l.FlexCentered>
        </t.Title>
        <Divider white />
        <l.Page
          px={[spacing.sm, 0]}
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}
        >
          <l.Space mb={spacing.xxxl} mx="auto" width={['100%', '100%', '80%']}>
            <l.FlexCentered>
              <t.Text center large mb={spacing.ml}>
                Already an RFC member?
              </t.Text>
            </l.FlexCentered>
            <l.FlexCentered mb={spacing.xl}>
              <t.Anchor href="https://rfc.kicksite.net/" target="_blank">
                <ButtonPrimary size="small">
                  <l.Flex>
                    <UserImg side={spacing.l} color={colors.white} />
                    <l.Space width={spacing.m} />
                    Login Here
                  </l.Flex>
                </ButtonPrimary>
              </t.Anchor>
            </l.FlexCentered>
            <l.FlexCentered>
              <t.Link
                border={borders.red}
                center="true"
                color={colors.red}
                mb={spacing.xxxxxl}
                to="/signup"
              >
                Click here for membership options
              </t.Link>
            </l.FlexCentered>
            {success ? (
              <>
                <l.Line width="100%" />
                <t.Text
                  center
                  color={colors.green}
                  large
                  mb={[spacing.ml, spacing.xl]}
                  mt={spacing.xxxl}
                >
                  Success!
                </t.Text>
                <t.Text center mb={[spacing.ml, spacing.xl]}>
                  Please check your email for a welcome newsletter. You will
                  also receive instructions to create a member portal login when
                  your account is setup. See you at the studio!
                </t.Text>
                <l.FlexCentered>
                  <ButtonSecondary onClick={this.reset}>Reset</ButtonSecondary>
                </l.FlexCentered>
              </>
            ) : (
              <>
                <t.H1 alignSelf="flex-start">New Member Signup</t.H1>
                <l.Line width="100%" />
                <t.Text mt={spacing.xxxl}>
                  To sign up for any RFC programs, please fill out our
                  membership form below. Once you complete the form you will
                  receive a link to create a portal username and password within
                  24 hours to finish your account setup.
                </t.Text>
                <l.FlexColumnCentered mt={spacing.xxxl} width="100%">
                  <SetupForm
                    member={newMemberDefaults}
                    handleSuccess={this.handleSuccess}
                  />
                </l.FlexColumnCentered>
              </>
            )}
          </l.Space>
        </l.Page>
      </div>
    );
  }
}

export default withScroll(NewSignup);
