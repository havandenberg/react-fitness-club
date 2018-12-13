import * as React from 'react';
import styled from 'react-emotion';
import StarImg from '../assets/images/star.svg';
import l from '../styles/layout';
import { borders, colors, fontSizes, spacing } from '../styles/theme';
import t from '../styles/typography';
import { ASSETS_PATH } from '../utils/constants';
import { DESKTOP, isMobile } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import { Page } from './App';
import ContactForm from './ContactForm';
import Divider from './Divider';
import GalleryImage from './GalleryImage';
import Hero from './Hero';
import withScroll from './hoc/withScroll';
import { Star } from './Home';
import SocialIcons from './SocialIcons';

const ContactText = styled(t.Text)({
  fontSize: fontSizes.h3,
});

const MapImage = styled('img')({
  width: '100%',
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
            onClick={() => scrollToId('studio-location', { offset: -40 })}
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
      <t.Text center large mb={spacing.xl}>
        To sign up for any RFC program directly, please{' '}
        <t.Link border={borders.red} color={colors.red} to="/login?type=signup">
          click here
        </t.Link>{' '}
        to begin program signup.
      </t.Text>
      <ContactForm />
      <l.Space id="studio-location" height={[spacing.xxxl, spacing.xxxxxl]} />
      <t.Subtitle center mb={[spacing.l, spacing.l]}>
        The React Fitness Club Studio is located at:
      </t.Subtitle>
      <t.H2 center color={colors.red} mb={[spacing.xl, spacing.xl]}>
        173 Grove St, 2nd Floor
        <l.Break />
        Worcester, MA 10605
      </t.H2>
      <l.Flex columnOnMobile mb={[0, spacing.xxxl]}>
        <GalleryImage
          image={{
            caption: '',
            src: `${ASSETS_PATH}/studio/front-sign.png`,
            thumbnail: `${ASSETS_PATH}/studio/front-sign.png`,
            thumbnailHeight: 150,
            thumbnailWidth: 120,
          }}
        />
        <l.Space height={spacing.ml} width={spacing.xxl} />
        <GalleryImage
          image={{
            caption: '',
            src: `${ASSETS_PATH}/studio/front-building.png`,
            thumbnail: `${ASSETS_PATH}/studio/front-building.png`,
            thumbnailHeight: 150,
            thumbnailWidth: 120,
          }}
        />
        <l.Space height={spacing.ml} width={spacing.xxl} />
        <GalleryImage
          image={{
            caption: '',
            src: `${ASSETS_PATH}/studio/front-room.png`,
            thumbnail: `${ASSETS_PATH}/studio/front-room.png`,
            thumbnailHeight: 150,
            thumbnailWidth: 120,
          }}
        />
      </l.Flex>
      <t.Anchor
        href="https://www.google.com/maps/place/React+Fitness+Club/@42.2793643,-71.8049137,15z/data=!4m2!3m1!1s0x0:0x9046b19a3d697bcc?ved=2ahUKEwjSvtKd5PfeAhXEx4MKHc9mAekQ_BIwEHoECAYQCA"
        target="_blank"
      >
        <MapImage src={`${ASSETS_PATH}/studio/map.png`} />
      </t.Anchor>
    </Page>
    <l.Space height={100} />
  </div>
);

export default withScroll(Contact);
