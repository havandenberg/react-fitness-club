import * as React from 'react';
import { spacing } from '../styles/theme';
import t from '../styles/typography';
import { Page } from './App';
import Divider from './Divider';
import Hero from './Hero';
import withScroll from './hoc/withScroll';
import SignupForm from './SignupForm';

const Signup = () => (
  <div>
    <Hero secondary />
    <t.Title center mb={spacing.ml}>
      Program Signup
    </t.Title>
    <Divider white />
    <Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
      <SignupForm />
    </Page>
  </div>
);

export default withScroll(Signup);
