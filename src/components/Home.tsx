import * as React from 'react';
import styled from 'react-emotion';
import BulletImg from '../assets/images/bullet.svg';
import StarImg from '../assets/images/star.svg';
import l from '../styles/layout';
import { fontSizes, mobileSizes, spacing } from '../styles/theme';
import t from '../styles/typography';
import { isMobile } from '../utils/screensize';
import { Page } from './App';
import FeaturedLinks from './FeaturedLinks';
import { ButtonPrimary } from './Form/Button';
import Hero from './Hero';
import Newsletter from './Newsletter';

const Bullet = styled('img')({
  height: spacing.xxl,
  marginRight: spacing.xl,
  width: spacing.xxl,
});

const Star = styled('img')({
  height: spacing.xxxl,
  width: spacing.xxxl,
});

const Home = () => (
  <div>
    <Hero />
    <FeaturedLinks />
    <Page>
      <l.Flex columnOnMobile spaceBetween>
        {!isMobile() && <Star src={StarImg} />}
        <t.Text
          center={!isMobile()}
          large
          mb={[spacing.xl, 0]}
          mx="auto"
          width={['100%', '80%']}
        >
          React Fitness Club is a multi style martial arts and fitness club.
          Each of our programs aims to provide one possible component of the
          path to your individual physical and mental success as a human being.
          Through team-based training and activities, we provide resources and
          coach our students to improve their strength, endurance, and mobility,
          as well as cultivate positive mental and nutritional habits.{' '}
        </t.Text>
        <Star src={StarImg} />
      </l.Flex>
      <l.Space height={[spacing.xxxl, spacing.xxxxxl]} />
      <t.H2 mb={[spacing.ml, spacing.ml]}>
        Sexual Assault Awareness & Prevention with Self Defense (SAAPSD)
      </t.H2>
      <t.Text large mb={[spacing.xxxl, spacing.xxxl]}>
        Specialized self defense program with a focus on.
      </t.Text>
      <t.H2 mb={[spacing.ml, spacing.ml]}>Martial Arts Programs:</t.H2>
      <t.Text large mb={[spacing.xxxl, spacing.xxxl]}>
        We offer a variety of martial arts styles for ages 8 and up, Click here
        to view our programs.
      </t.Text>
      <t.H2 mb={[spacing.ml, spacing.ml]}>General Fitness Classes:</t.H2>
      <t.Text large mb={[spacing.xxxl, spacing.xxxxxl]}>
        Our fitness programs focus on varying combinations of strength,
        endurance, and mobility training.
      </t.Text>
      <l.FlexCentered
        mb={[spacing.ml, spacing.xxxl]}
        mx="auto"
        width={['100%', '80%']}
      >
        <Bullet src={BulletImg} />
        <t.Text fontSize={[mobileSizes.h3, fontSizes.h3]} width="100%">
          Free 30 min introductory classes for any program - view available
          timeslots!
        </t.Text>
      </l.FlexCentered>
      <l.FlexCentered
        mb={[spacing.ml, spacing.xxxl]}
        mx="auto"
        width={['100%', '80%']}
      >
        <Bullet src={BulletImg} />
        <t.Text fontSize={[mobileSizes.h3, fontSizes.h3]} width="100%">
          All ages training from 8+
        </t.Text>
      </l.FlexCentered>
      <l.FlexCentered
        mb={[spacing.xxxl, spacing.xxxxxl]}
        mx="auto"
        width={['100%', '80%']}
      >
        <Bullet src={BulletImg} />
        <t.Text fontSize={[mobileSizes.h3, fontSizes.h3]} width="100%">
          No martial arts or fitness experience necessary
        </t.Text>
      </l.FlexCentered>
      <l.FlexCentered columnOnMobile mx="auto" spaceBetween width="100%">
        <ButtonPrimary to="/about" width={['100%', 'auto']}>
          More about our philosophy
        </ButtonPrimary>
        <l.Space
          height={[spacing.xl, 0]}
          width={[0, spacing.xxl, spacing.xxxxxl]}
        />
        <ButtonPrimary to="/programs" width={['100%', 'auto']}>
          Check out our programs
        </ButtonPrimary>
      </l.FlexCentered>
    </Page>
    <Newsletter />
    <l.Space height={[100, 200, 300]} />
  </div>
);

export default Home;
