import * as React from 'react';
import styled from 'react-emotion';
import BulletImg from '../assets/images/bullet.svg';
import StarImg from '../assets/images/star.svg';
import l from '../styles/layout';
import {
  borders,
  colors,
  fontSizes,
  mobileSizes,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import { CAPOEIRA_PATH, REACT_PATH } from '../utils/constants';
import { isMobile, isTabletUp } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import { Page } from './App';
import FeaturedLinks from './FeaturedLinks';
import { LinkPrimary } from './Form/Button';
import Hero from './Hero';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const Bold = styled('span')({
  fontWeight: 'bold',
});

const Bullet = styled('img')(({ secondary }: { secondary?: boolean }) => ({
  height: secondary ? spacing.xl : spacing.xxl,
  marginRight: secondary ? spacing.ml : spacing.xl,
  width: secondary ? spacing.xl : spacing.xxl,
}));

export const Star = styled('img')({
  height: spacing.xxxl,
  width: spacing.xxxl,
});

const Home = () => (
  <div>
    <Hero />
    <t.Text
      center
      italic
      large
      mb={[spacing.xl, spacing.xxl]}
      mx="auto"
      width={['100%', '75%']}
    >
      <t.Link
        border={borders.red}
        color={colors.red}
        to="/contact?id=studio-location"
      >
        Our brand new studio
      </t.Link>{' '}
      is still undergoing renovations, but we will be opening for classes soon.{' '}
      <t.Anchor
        border={borders.red}
        color={colors.red}
        fontSize={[mobileSizes.largeText, fontSizes.largeText]}
        onClick={() => scrollToId('newsletter')}
      >
        Sign up for our newsletter
      </t.Anchor>{' '}
      for updates about opening day!
    </t.Text>
    <FeaturedLinks />
    <Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
      <l.Flex columnOnMobile spaceBetween>
        {isTabletUp() && <Star src={StarImg} />}
        <t.Text
          center={!isMobile()}
          large
          mb={[spacing.xl, 0]}
          mx="auto"
          textAlign="justify"
          width={['100%', '80%']}
        >
          React Fitness Club is a multi-style <Bold>martial arts</Bold> and{' '}
          <Bold>fitness</Bold> club. Each of our programs aims to support the
          path to individual <Bold>physical and mental success</Bold> as a human
          being. Through martial arts and <Bold>team-based</Bold> fitness
          training and activities, we provide resources and coach our students
          to improve their <Bold>strength, endurance, and mobility</Bold>, as
          well as cultivate <Bold>positive mental habits</Bold> in all areas of
          life.{' '}
        </t.Text>
        <Star src={StarImg} />
      </l.Flex>
      <t.Text
        center
        fontSize={[fontSizes.largeText, fontSizes.h2]}
        mt={[spacing.xxxl, spacing.xxxxxl]}
      >
        Join the club that gets you further!
      </t.Text>
      <l.Space height={[spacing.xxxl, spacing.xxxxxl]} />
      <l.Space mx="auto" width={['100%', '90%', '70%']}>
        <t.H2 mb={[spacing.ml, spacing.ml]}>Martial Arts Styles:</t.H2>
        <t.Text large mb={spacing.xxxl}>
          Some of our styles participate in competitions. Learn more on each
          style page. We currently offer classes for three styles of martial
          arts:
          <l.Break />
          <l.Space height={spacing.xl} />
          <t.Anchor
            border={borders.red}
            color={colors.red}
            fontSize={[mobileSizes.largeText, fontSizes.largeText]}
            href={REACT_PATH}
            target="_blank"
          >
            REaCT:
          </t.Anchor>{' '}
          A mixed martial arts system with 3 phases of training, stand up, take
          downs, and grappling. Taught by Coach Ryan. Ages 8+.
          <l.Break />
          <l.Space height={spacing.ml} />
          <t.Anchor
            border={borders.red}
            color={colors.red}
            fontSize={[mobileSizes.largeText, fontSizes.largeText]}
            href={CAPOEIRA_PATH}
            target="_blank"
          >
            Capoeira:
          </t.Anchor>{' '}
          African-Brazilian martial art that incorporates acrobatics, dance,
          music, and songs in a rhythmic dialogue of body, mind, and spirit.
          Taught by Professor Morcego. Ages 8+.
          <l.Break />
          <l.Space height={spacing.ml} />
          <t.Anchor
            border={borders.red}
            color={colors.red}
            fontSize={[mobileSizes.largeText, fontSizes.largeText]}
            target="_blank"
          >
            Aikido:
          </t.Anchor>{' '}
          Modern Japanese martial art that focuses on defending yourself while
          also protecting your attacker from injury. Training consists of rolls,
          strikes, grabs, throws and pins. Taught by Sensei Koksul.
        </t.Text>
        <t.H2 mb={[spacing.ml, spacing.ml]}>Fitness Programs:</t.H2>
        <t.Text large mb={[spacing.xxxl, spacing.xxxl]}>
          We also offer general fitness programs for a range of goals. We hope
          to add more unique fitness programs in the future!
        </t.Text>
        <t.H2 mb={[spacing.ml, spacing.ml]}>Team-Based Approach:</t.H2>
        <t.Text large mb={[spacing.xxxl, spacing.xxxxxl]}>
          No one gets there alone. RFC is a community of like-minded, fitness
          oriented humans who are there to support you with your physical and
          mental training. We encourage friendly competition!
        </t.Text>
      </l.Space>
      <l.FlexCentered
        mb={[spacing.ml, spacing.xxxl]}
        mx="auto"
        width={['100%', '70%']}
      >
        <Bullet src={BulletImg} />
        <t.Text fontSize={[mobileSizes.h3, fontSizes.h3]} width="100%">
          Free 30 minute intro classes for any program
        </t.Text>
      </l.FlexCentered>
      <l.FlexCentered
        mb={[spacing.ml, spacing.xxxl]}
        mx="auto"
        width={['100%', '70%']}
      >
        <Bullet src={BulletImg} />
        <t.Text fontSize={[mobileSizes.h3, fontSizes.h3]} width="100%">
          All ages training from 8+
        </t.Text>
      </l.FlexCentered>
      <l.FlexCentered
        mb={[spacing.xxxl, spacing.xxxxxl]}
        mx="auto"
        width={['100%', '70%']}
      >
        <Bullet src={BulletImg} />
        <t.Text fontSize={[mobileSizes.h3, fontSizes.h3]} width="100%">
          No martial arts or fitness experience necessary
        </t.Text>
      </l.FlexCentered>
      <l.FlexCentered columnOnMobile mx="auto" spaceBetween width="100%">
        <LinkPrimary to="/about" width={['100%', 'auto']}>
          More about our philosophy
        </LinkPrimary>
        <l.Space
          height={[spacing.xl, 0]}
          width={[0, spacing.xxl, spacing.xxxxxl]}
        />
        <LinkPrimary to="/programs" width={['100%', 'auto']}>
          Check out our programs
        </LinkPrimary>
      </l.FlexCentered>
    </Page>
    <Newsletter />
    <l.Space height={100} />
  </div>
);

export default withScroll(Home);
