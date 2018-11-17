import * as React from 'react';
import l from '../styles/layout';
import { spacing } from '../styles/theme';
import t from '../styles/typography';
import { Page } from './App';
import Divider from './Divider';
import Hero from './Hero';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const About = () => (
  <div>
    <Hero secondary />
    <t.Title center mb={spacing.ml}>
      About
    </t.Title>
    <Divider white />
    <Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
      <l.FlexCentered>Under Construction</l.FlexCentered>
    </Page>
    <Newsletter />
    <l.Space height={[100, 200, 300]} />
  </div>
);

export default withScroll(About);
