import * as React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import l from '../styles/layout';
import {
  borders,
  breakpoints,
  colors,
  fontSizes,
  gradients,
  spacing,
  transitions,
  z,
} from '../styles/theme';
import t from '../styles/typography';
import {
  isDesktop,
  isMobile,
  isSmall,
  isTabletUp,
  SMALL,
  TABLET,
} from '../utils/screensize';
import Divider from './Divider';
import SocialIcons from './SocialIcons';

const DividerWrapper = styled(l.Space)({
  transform: `translateY(${spacing.s})`,
  width: '100%',
  zIndex: -1,
});

const FooterBottom = styled(l.Flex)({
  background: gradients.black,
  borderTop: borders.white,
});

const FooterLinkText = styled(t.Text)({
  ':hover': {
    color: colors.red,
  },
  color: colors.white,
  fontSize: fontSizes.largeText,
  transition: transitions.default,
});

const FooterAnchor = ({ text, href }: { text: string; href: string }) => (
  <t.Anchor href={href} target="_blank">
    <FooterLinkText>{text}</FooterLinkText>
  </t.Anchor>
);

const FooterLink = ({ text, to }: { text: string; to: string }) => (
  <Link to={to}>
    <FooterLinkText>{text}</FooterLinkText>
  </Link>
);

const FooterTop = styled(l.Flex)({
  background: gradients.blackReverse,
  zIndex: z.low,
  [breakpoints.mobile]: {
    width: '100%',
  },
});

const PhoneAnchor = styled(t.Text)({
  ':hover': {
    color: colors.red,
  },
  transition: transitions.default,
});

const Footer = () => (
  <div>
    <DividerWrapper>
      <Divider white />
    </DividerWrapper>
    <FooterTop
      alignTop
      columnRevOnMobile
      px={[spacing.xl, spacing.xxxl, spacing.huge]}
      py={[spacing.xl, spacing.xxxl, spacing.xxxxxl]}
      spaceBetween
    >
      <l.Flex grow={1} spaceBetween={!isTabletUp()} width={['100%', 'auto']}>
        <l.Space mr={[spacing.xl, spacing.huge]}>
          <FooterLink text="About" to="/about" />
          <l.Space height={spacing.l} />
          <FooterLink text="Programs" to="/programs" />
          <l.Space height={spacing.l} />
          <FooterLink text="Gallery" to="/gallery" />
          <l.Space height={spacing.l} />
          <FooterLink text="Contact" to="/contact" />
        </l.Space>
        <l.Space mr={[spacing.xl, spacing.xxxl]}>
          <FooterLink text="Schedule" to="/schedule" />
          <l.Space height={spacing.l} />
          <FooterLink text="Events" to="#" />
          <l.Space height={spacing.l} />
          <FooterAnchor
            href="https://www.gofundme.com/react-fitness-club-alumni-floor"
            text="Donate"
          />
          <l.Space height={spacing.l} />
          <FooterLink text="Login" to="#" />
        </l.Space>
      </l.Flex>
      <l.FlexColumn
        alignBottom={!isMobile()}
        mb={[spacing.xxl, 0]}
        width={['100%', 'auto']}
      >
        <t.Link to="/contact?id=studio-location" mb={spacing.l}>
          <PhoneAnchor
            color={colors.white}
            large
            textAlign={isMobile() ? 'center' : 'right'}
          >
            173 Grove St, 2nd Floor
            <l.Break />
            Worcester, MA 01605
          </PhoneAnchor>
        </t.Link>
        <t.Anchor href="tel:17743171269" mb={spacing.l}>
          <PhoneAnchor color={colors.white} large textAlign="right">
            774-317-1267
          </PhoneAnchor>
        </t.Anchor>
        <SocialIcons />
      </l.FlexColumn>
    </FooterTop>
    <FooterBottom
      columnRevOnMobile
      px={[spacing.sm, spacing.xl]}
      py={spacing.xl}
      spaceBetween
    >
      <t.Title center={isSmall()} color={colors.white} nowrap={!isSmall()}>
        REACT FITNESS CLUB
      </t.Title>
      <l.FlexColumn alignBottom={isDesktop()} mb={[spacing.xxl, 0]}>
        <t.Text
          color={colors.white}
          mb={[spacing.m]}
          textAlign={isTabletUp() ? 'right' : 'center'}
          width="100%"
        >
          Copyright © {new Date().getFullYear()}
          <l.Break breakpoint={SMALL} />
          <l.Break breakpoint={TABLET} /> React Fitness Club.
          <l.Break /> All Rights Reserved.
        </t.Text>
        <t.Text
          color={colors.white}
          textAlign={isTabletUp() ? 'right' : 'center'}
          width="100%"
        >
          Site developed by
          <l.Break breakpoint={TABLET} /> Halsey Vandenberg
        </t.Text>
      </l.FlexColumn>
    </FooterBottom>
  </div>
);

export default Footer;
