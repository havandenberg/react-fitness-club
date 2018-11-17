import * as React from 'react';
import styled from 'react-emotion';
import StarImg from '../assets/images/star.svg';
import l from '../styles/layout';
import { borders, colors, fontSizes, spacing } from '../styles/theme';
import t from '../styles/typography';
import { DESKTOP, isMobile } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import { Page } from './App';
import ContactForm from './ContactForm';
import Divider from './Divider';
import Hero from './Hero';
import withScroll from './hoc/withScroll';
import { Star } from './Home';
import SocialIcons from './SocialIcons';

const ContactText = styled(t.Text)({
  fontSize: fontSizes.h3,
});

const Contact = () => (
  <div>
    <Hero secondary />
    <t.Title center mb={spacing.ml}>
      Contact
    </t.Title>
    <Divider white />
    <Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
      <l.Flex
        alignTop
        columnOnMobile
        mb={[0, spacing.xxxl]}
        mx="auto"
        spaceBetween
      >
        <l.Space mb={[spacing.xxl, 0]} width={['100%', 'auto']}>
          <ContactText mb={spacing.ml}>
            Follow us on social media:&nbsp;
          </ContactText>
          <SocialIcons showLabels />
        </l.Space>
        <ContactText mb={[spacing.xxl, 0]} width={['100%', 'auto']}>
          Call us:
          <l.Break />
          <l.Space height={spacing.sm} />
          <t.Anchor
            border={borders.red}
            href="tel:17743171269"
            width={['100%', 'auto']}
          >
            <t.Text
              center={isMobile()}
              color={colors.red}
              fontSize={[fontSizes.largeText, fontSizes.largeText]}
              width={['100%', 'auto']}
            >
              774-317-1267
            </t.Text>
          </t.Anchor>
        </ContactText>
        <ContactText width={['100%', 'auto']}>
          Visit our studio:
          <l.Break />
          <l.Space height={spacing.sm} />
          <t.Anchor
            border={borders.red}
            onClick={() => scrollToId('studio-location')}
            width={['100%', 'auto']}
          >
            <t.Text
              center={isMobile()}
              color={colors.red}
              fontSize={[fontSizes.largeText, fontSizes.largeText]}
              width={['100%', 'auto']}
            >
              173 Grove St, 2nd Floor
              <l.Break />
              Worcester, MA 01605
            </t.Text>
          </t.Anchor>
        </ContactText>
      </l.Flex>
      <l.FlexCentered my={spacing.xxxl}>
        <Star src={StarImg} />
      </l.FlexCentered>
      <t.Text center large my={spacing.xl}>
        To contact us with any questions about our schedule or programs,
        <l.Break breakpoint={DESKTOP} />
        &nbsp;please&nbsp;
        <t.Anchor border={borders.red} href="tel:17743171269">
          <t.Text color={colors.red} large>
            call us
          </t.Text>
        </t.Anchor>
        &nbsp;directly or use the form below.
      </t.Text>
      {/* <t.Text center large mb={spacing.xl}>
        To sign up for any RFC program directly, please click here to start the
        full signup process.
      </t.Text> */}
      <ContactForm />
      <div id="studio-location" />
    </Page>
    <l.Space height={[100, 200, 300]} />
  </div>
);

export default withScroll(Contact);
