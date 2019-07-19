import * as React from 'react';
import styled from 'react-emotion';
import BulletImg from '../assets/images/bullet.svg';
import StarImg from '../assets/images/star';
import l from '../styles/layout';
import {
  borders,
  colors,
  fontSizes,
  mobileSizes,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import { isMobile, isTabletUp } from '../utils/screensize';
import Divider from './Divider';
import FeaturedLinks from './FeaturedLinks';
import { ButtonPrimary, LinkPrimary } from './Form/Button';
import withScroll from './hoc/withScroll';
import IntroVideo from './IntroVideo';
import Newsletter from './Newsletter';

export const INTRO_BUTTON_WIDTH = 182;

const Bold = styled('span')({
  fontWeight: 'bold',
});

export const Bullet = styled('img')(
  ({ secondary }: { secondary?: boolean }) => ({
    height: secondary ? spacing.xl : spacing.xxl,
    marginRight: secondary ? spacing.ml : spacing.xl,
    width: secondary ? spacing.xl : spacing.xxl,
  }),
);

const Home = () => (
  <div>
    <Divider white />
    <l.Space height={spacing.xl} />
    <t.Text center italic large mx="auto" width={['95%', '85%', '75%']}>
      Our{' '}
      <t.Link
        border={borders.red}
        color={colors.red}
        large="true"
        to="/contact?id=studio-location">
        brand new studio in Worcester, MA
      </t.Link>{' '}
      is now open for training.
    </t.Text>
    <l.Space height={spacing.xl} />
    <l.FlexCentered columnOnMobile>
      <IntroVideo />
      <l.Space height={spacing.xl} width={spacing.xxxl} />
      <t.Link to="/signup">
        <ButtonPrimary width={INTRO_BUTTON_WIDTH}>Sign up here</ButtonPrimary>
      </t.Link>
    </l.FlexCentered>
    <l.Space height={[spacing.xl, spacing.xxl]} />
    <FeaturedLinks />
    <l.Page
      px={[spacing.sm, 0]}
      py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
      <l.Flex columnOnMobile spaceBetween>
        {isTabletUp() && <StarImg />}
        <t.Text
          center={!isMobile()}
          large
          mb={[spacing.xl, 0]}
          mx="auto"
          textAlign="justify"
          width={['100%', '80%']}>
          React Fitness Club is a multi-style <Bold>martial arts</Bold> and{' '}
          <Bold>fitness</Bold> club. Each of our programs aims to support the
          path to individual <Bold>physical and mental success</Bold> as a human
          being. Through martial arts and <Bold>team-based</Bold> fitness
          training and activities, we provide resources and coach our students
          to improve their <Bold>strength, endurance, and mobility</Bold>, as
          well as cultivate <Bold>positive mental habits</Bold> in all areas of
          life.{' '}
        </t.Text>
        <StarImg />
      </l.Flex>
      <l.FlexCentered my={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
        <t.Link
          border={borders.red}
          color={colors.red}
          fontSize={[fontSizes.largeText, fontSizes.h2]}
          to={'/signup'}>
          Join the club that gets you further!
        </t.Link>
      </l.FlexCentered>
      <l.FlexCentered
        mb={[spacing.ml, spacing.xxxl]}
        mx="auto"
        width={['100%', '100%', '70%']}>
        <Bullet src={BulletImg} />
        <t.Text fontSize={[mobileSizes.h3, fontSizes.h3]} width="100%">
          Free 45 minute intro classes for any program
        </t.Text>
      </l.FlexCentered>
      <l.FlexCentered
        mb={[spacing.ml, spacing.xxxl]}
        mx="auto"
        width={['100%', '100%', '70%']}>
        <Bullet src={BulletImg} />
        <t.Text fontSize={[mobileSizes.h3, fontSizes.h3]} width="100%">
          All ages training from 3+
        </t.Text>
      </l.FlexCentered>
      <l.FlexCentered
        mb={[spacing.xxxl, spacing.xxxxxl]}
        mx="auto"
        width={['100%', '100%', '70%']}>
        <Bullet src={BulletImg} />
        <t.Text fontSize={[mobileSizes.h3, fontSizes.h3]} width="100%">
          No martial arts or fitness experience necessary
        </t.Text>
      </l.FlexCentered>
      <l.FlexCentered
        columnOnMobile
        mb={100}
        mx="auto"
        spaceBetween
        width="100%">
        <LinkPrimary to="/mission" width={['100%', 281]}>
          More about our mission
        </LinkPrimary>
        <l.Space
          height={[spacing.xl, 0]}
          width={[0, spacing.xxl, spacing.xxxxxl]}
        />
        <LinkPrimary to="/programs" width={['100%', 281]}>
          Check out our programs
        </LinkPrimary>
      </l.FlexCentered>
    </l.Page>
    <Newsletter />
    <l.Space height={100} />
  </div>
);

export default withScroll(Home);
