import * as React from 'react';
import SignupImg from '../assets/images/signup';
import UserImg from '../assets/images/user';
import l from '../styles/layout';
import { borders, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { newMemberDefaults } from '../types/member';
import Divider from './Divider';
import { ButtonPrimary } from './Form/Button';
import withScroll from './hoc/withScroll';
import SetupForm from './SetupForm';

const NewSignup = () => (
  <div>
    <t.Title center pb={spacing.ml}>
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
      <l.Space mb={spacing.xxl} mx="auto" width={['100%', '100%', '80%']}>
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
            center
            color={colors.red}
            hoverStyle="underline"
            mb={spacing.xxl}
            to="/signup"
          >
            Click here for membership options and pricing.
          </t.Link>
        </l.FlexCentered>
        <t.H1 alignSelf="flex-start">New Members</t.H1>
        <l.Line width="100%" />
        <t.Text mt={spacing.xxxl}>
          To sign up for any RFC programs, please fill out our membership form
          below. Once you complete the form you will receive a link to create a
          portal username and password within 24 hours to finish your account
          setup.
        </t.Text>
        <l.FlexColumnCentered mt={spacing.xxxl} width="100%">
          <SetupForm member={newMemberDefaults} />
        </l.FlexColumnCentered>
      </l.Space>
    </l.Page>
  </div>
);

export default withScroll(NewSignup);
