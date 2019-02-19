import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import LogoImg from '../assets/images/logo.png';
import l from '../styles/layout';
import { borders, breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import {
  isMobile,
  isMobileOnly,
  isSmall,
  isTabletUp,
} from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import SocialIcons from './SocialIcons';

const HeroWrapper = styled('div')({
  background: colors.background,
  position: 'relative',
});

const Logo = styled('img')(({ secondary }: { secondary?: boolean }) => ({
  height: isMobile() ? (!isMobileOnly() ? 150 : secondary ? 100 : 150) : 200,
}));

const LogoWrapper = styled(l.Flex)(
  ({ secondary }: { secondary?: boolean }) => ({
    justifyContent: secondary
      ? isMobileOnly()
        ? 'center'
        : 'flex-start'
      : 'center',
    marginLeft: secondary
      ? isMobile()
        ? isMobileOnly()
          ? 0
          : spacing.xxxl
        : spacing.xxxxxl
      : 0,
  }),
);

const PosterLink = styled(l.FlexCentered)({
  position: 'absolute',
  right: 150,
  top: spacing.xl,
  [breakpoints.mobile]: {
    right: spacing.sm,
    top: spacing.xxxxl,
  },
});

const QuickLinks = styled(l.Flex)({
  color: colors.red,
  flexDirection: isTabletUp() ? 'column' : 'row',
  position: 'absolute',
  right: spacing.ml,
  top: spacing.xl,
  [breakpoints.mobile]: {
    justifyContent: 'space-between',
    margin: `0 auto ${spacing.ml}`,
    position: 'static',
    width: '90%',
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

// const QuickAnchor = styled(t.Anchor)({ ...quickItemStyles });
const QuickLink = styled(t.Link)({ ...quickItemStyles });

const SocialIconsWrapper = styled('div')({
  marginTop: spacing.s,
  [breakpoints.mobile]: {
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
  },
});

const Hero = ({
  location,
  member,
}: { member?: Member } & RouteComponentProps) => {
  const secondary = !R.equals(location.pathname, '/');
  return (
    <HeroWrapper>
      <LogoWrapper
        pb={secondary ? [spacing.ml, 0, 0] : [spacing.ml, spacing.xl]}
        pt={[spacing.ml, spacing.xl]}
        secondary={secondary}>
        <Link to="/">
          <Logo secondary={secondary} src={LogoImg} />
        </Link>
      </LogoWrapper>
      {!secondary && (
        <l.FlexCentered mb={[spacing.ml, spacing.xl]} mt={[0, spacing.ml, 0]}>
          <t.Subtitle center>
            Multi-Style Martial Arts Training & Fitness Club
          </t.Subtitle>
        </l.FlexCentered>
      )}
      <QuickLinks alignBottom>
        <QuickLink border={borders.red} color={colors.red} to="/schedule">
          Schedule
        </QuickLink>
        <QuickLink
          bold="true"
          border={borders.red}
          color={colors.red}
          to="/events">
          Events (1)
        </QuickLink>
        <QuickLink border={borders.red} color={colors.red} to="/?id=newsletter">
          <div onClick={() => scrollToId('newsletter')}>Newsletter</div>
        </QuickLink>
        {/* <QuickAnchor
          border={borders.red}
          color={colors.red}
          href="https://www.gofundme.com/react-fitness-club-alumni-floor"
          target="_blank">
          Donate
        </QuickAnchor> */}
        <SocialIconsWrapper>
          <SocialIcons small />
        </SocialIconsWrapper>
      </QuickLinks>
      <PosterLink mb={[spacing.ml, 0]}>
        <t.Link to="/events">
          <l.Img
            height={[secondary ? 75 : isSmall() ? 65 : 75, 100, 150]}
            src="https://s3.amazonaws.com/react-fitness-club/programs/Aikido/events/NV-Worcester-2019.png"
          />
        </t.Link>
      </PosterLink>
    </HeroWrapper>
  );
};

export default withRouter(Hero);
