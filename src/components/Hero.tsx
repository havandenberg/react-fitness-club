import * as React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import LogoImg from '../assets/images/logo.png';
import l from '../styles/layout';
import { borders, breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { isMobile } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import SocialIcons from './SocialIcons';

const HeroWrapper = styled('div')({
  background: colors.background,
  position: 'relative',
});

const Logo = styled('img')(({ secondary }: { secondary?: boolean }) => ({
  height: isMobile() ? (secondary ? 100 : 150) : 200,
}));

const LogoWrapper = styled(l.Flex)(
  ({ secondary }: { secondary?: boolean }) => ({
    justifyContent: secondary
      ? isMobile()
        ? 'center'
        : 'flex-start'
      : 'center',
    marginLeft: secondary ? (isMobile() ? 0 : spacing.xxxxxl) : 0,
  }),
);

const QuickLinks = styled(l.Flex)({
  color: colors.red,
  flexDirection: isMobile() ? 'row' : 'column',
  position: 'absolute',
  right: spacing.ml,
  top: spacing.xl,
  [breakpoints.mobile]: {
    justifyContent: 'space-between',
    margin: `0 auto ${spacing.sm}`,
    position: 'static',
    width: '50%',
  },
});

const quickItemStyles = {
  ':last-child': {
    marginBottom: 0,
  },
  colors: colors.red,
  marginBottom: spacing.t,
  [breakpoints.mobile]: {
    marginBottom: 0,
  },
};

const QuickAnchor = styled(t.Anchor)({ ...quickItemStyles });
const QuickLink = styled(t.Link)({ ...quickItemStyles });

const SocialIconsWrapper = styled('div')({
  marginTop: spacing.s,
  [breakpoints.mobile]: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
  },
});

const Hero = ({ secondary }: { secondary?: boolean }) => (
  <HeroWrapper>
    <LogoWrapper py={[spacing.ml, spacing.xl]} secondary={secondary}>
      <Link to="/">
        <Logo secondary={secondary} src={LogoImg} />
      </Link>
    </LogoWrapper>
    {!secondary && (
      <l.FlexCentered mb={[spacing.ml, spacing.xxxl]}>
        <t.Subtitle center>
          Multi-Style Martial Arts Training & Fitness Club
        </t.Subtitle>
      </l.FlexCentered>
    )}
    <QuickLinks alignBottom>
      {!isMobile() && (
        <t.Text color={colors.black} mb={[0, spacing.sm]}>
          Quick Links:
        </t.Text>
      )}
      {/* <QuickAnchor border={borders.red} to="/schedule">
        Schedule
      </QuickAnchor>
      <QuickAnchor border={borders.red} to="/events">
        Events
      </QuickAnchor> */}
      <QuickLink border={borders.red} color={colors.red} to="/?id=newsletter">
        <div onClick={() => scrollToId('newsletter')}>Newsletter</div>
      </QuickLink>
      <QuickAnchor
        border={borders.red}
        color={colors.red}
        href="https://www.gofundme.com/react-fitness-club-alumni-floor"
        target="_blank"
      >
        Donate
      </QuickAnchor>
      <SocialIconsWrapper>
        <SocialIcons small />
      </SocialIconsWrapper>
    </QuickLinks>
  </HeroWrapper>
);

export default Hero;
