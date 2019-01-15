import * as React from 'react';
import l from '../styles/layout';
import { spacing } from '../styles/theme';
import t from '../styles/typography';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const Programs = () => (
  <div>
    <t.Title center mb={spacing.ml}>
      Programs
    </t.Title>
    <Divider white />
    <l.Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
      <l.FlexCentered>Under Construction</l.FlexCentered>
    </l.Page>
    <Newsletter />
    <l.Space height={100} />
  </div>
);

export default withScroll(Programs);
