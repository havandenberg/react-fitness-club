import * as React from 'react';
import styled from 'react-emotion';
import LogoImg from '../assets/images/logo.png';
import l from '../styles/layout';
import { borders, breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { isMobile } from '../utils/screensize';
import SocialIcons from './SocialIcons';

const HeroWrapper = styled('div')({
  background: colors.background,
  position: 'relative',
});

const Logo = styled('img')({
  height: isMobile() ? 150 : 200,
});

const QuickLinks = styled(l.Flex)({
  color: colors.red,
  flexDirection: isMobile() ? 'row' : 'column',
  position: 'absolute',
  right: spacing.ml,
  top: spacing.xl,
  [breakpoints.mobile]: {
    justifyContent: 'space-between',
    margin: `0 ${spacing.sm} ${spacing.sm}`,
    position: 'static',
  },
});

const QuickAnchor = styled(t.Anchor)({
  ':last-child': {
    marginBottom: 0,
  },
  colors: colors.red,
  marginBottom: spacing.t,
  [breakpoints.mobile]: {
    marginBottom: 0,
  },
});

const SocialIconsWrapper = styled('div')({
  marginTop: spacing.s,
  [breakpoints.mobile]: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
  },
});

const Hero = () => (
  <HeroWrapper>
    <l.FlexCentered py={[spacing.ml, spacing.xl]}>
      <Logo src={LogoImg} />
    </l.FlexCentered>
    <l.FlexCentered mb={[spacing.ml, spacing.xxxl]}>
      <t.Subtitle center>
        Multi-Style Martial Arts Training & Fitness Club
      </t.Subtitle>
    </l.FlexCentered>
    <QuickLinks alignBottom>
      {!isMobile() && (
        <t.Text color={colors.black} mb={[0, spacing.sm]}>
          Quick Links:
        </t.Text>
      )}
      <QuickAnchor border={borders.red} to="/schedule">
        Schedule
      </QuickAnchor>
      <QuickAnchor border={borders.red} to="/events">
        Events
      </QuickAnchor>
      <QuickAnchor border={borders.red} to="/newsletter">
        Newsletter
      </QuickAnchor>
      <QuickAnchor border={borders.red} to="/donate">
        Donate
      </QuickAnchor>
      <SocialIconsWrapper>
        <SocialIcons small />
      </SocialIconsWrapper>
    </QuickLinks>
  </HeroWrapper>
);

export default Hero;
