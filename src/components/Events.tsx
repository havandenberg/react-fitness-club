import * as React from 'react';
import l from '../styles/layout';
import { spacing } from '../styles/theme';
import t from '../styles/typography';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const Events = () => (
  <div>
    <t.Title center mb={spacing.ml}>
      Events
    </t.Title>
    <Divider white />
    <l.Page px={[spacing.sm, 0]} py={[spacing.xxxl,spacing.xxxl, spacing.xxxxxl]}>
      <t.Anchor href="https://worcesteraikido.com/events" target="_blank">
        <l.Img
          src="https://s3.amazonaws.com/react-fitness-club/programs/Aikido/events/NV-Worcester-2019.png"
          width="100%"
        />
      </t.Anchor>
    </l.Page>
    <Newsletter />
    <l.Space height={100} />
  </div>
);

export default withScroll(Events);
