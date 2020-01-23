import * as React from 'react';
import NewsletterImg from '../assets/images/newsletter.svg';
import l from '../styles/layout';
import { colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import Divider from './Divider';

const Newsletter = () => (
  <l.Space id="newsletter" position="relative">
    <Divider white showHeavyBags />
    <l.FlexCentered mb={spacing.xl} mt={[spacing.xxl, spacing.xxxxl]}>
      <l.Img height={spacing.xxxxl} src={NewsletterImg} />
    </l.FlexCentered>
    <t.Text
      bold
      center
      italic
      large
      mb={spacing.xl}
      mx="auto"
      width={['100%', '60%']}
    >
      Enter your email here to sign up for our monthly newsletter!
    </t.Text>
    {status === 'success' && (
      <t.Text center color={colors.green} large mb={spacing.ml}>
        Success!
      </t.Text>
    )}
    {status === 'error' && (
      <t.Text center color={colors.red} mb={spacing.ml}>
        Invalid email or already subscribed, please try again.
      </t.Text>
    )}
    <l.Flex height={250} mx="auto" width={['95%', 400]}>
      <l.Frame src="https://rfc.kicksite.net/bizbuilders/lead_capture_forms/eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoibGNmXzEzMSJ9.P5eWd3Oy19Ails0djOLIf2YywfDmr_sGIb1MhZyvEkM" />
    </l.Flex>
  </l.Space>
);

export default Newsletter;
