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
  // isMobile,
  isSmall,
  isTabletUp,
  SMALL,
  TABLET,
} from '../utils/screensize';
// import { scrollToId } from '../utils/scroll';
import Divider from './Divider';
import SocialIcons from './SocialIcons';

const DividerWrapper = styled(l.Space)({
  transform: `translateY(${spacing.s})`,
  width: '100%',
  zIndex: z.neg,
});

const FooterBottom = styled(l.Flex)({
  background: gradients.black,
  borderTop: borders.white,
});

const FooterLinkText = styled(t.Text)(
  ({ color, disabled }: { color?: string; disabled?: boolean }) => ({
    ':hover': {
      color: disabled ? colors.white : colors.red,
    },
    color: color ? color : colors.white,
    fontSize: fontSizes.largeText,
    transition: transitions.default,
  }),
);

const FooterLink = ({
  disabled,
  color,
  text,
  to,
}: {
  disabled?: boolean;
  color?: string;
  text: string;
  to: string;
}) => (
  <Link to={disabled ? '' : to}>
    <FooterLinkText disabled={disabled} color={color}>
      {text}
    </FooterLinkText>
  </Link>
);

const FooterTop = styled(l.Flex)({
  background: gradients.blackReverse,
  zIndex: z.low,
  [breakpoints.mobile]: {
    width: '100%',
  },
});

// const PhoneAnchor = styled(t.Text)({
//   ':hover': {
//     color: colors.red,
//   },
//   transition: transitions.default,
// });

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
      <l.Flex
        alignTop
        grow={1}
        spaceBetween={!isTabletUp()}
        width={['100%', 'auto']}
      >
        <l.Space mr={[spacing.xl, spacing.huge]}>
          <FooterLink text="Mission" to="/mission" />
          <l.Space height={spacing.l} />
          <FooterLink text="Programs" to="/programs" />
          <l.Space height={spacing.l} />
          <FooterLink text="Events" to="/events" />
          <l.Space height={spacing.l} />
          <FooterLink text="Gallery" to="/gallery" />
        </l.Space>
        <l.Space mr={[spacing.xl, spacing.xxxl]}>
          <FooterLink text="Schedule" to="/schedule" />
          <l.Space height={spacing.l} />
          <FooterLink text="FAQs" to="/faqs" />
          <l.Space height={spacing.l} />
          <FooterLink text="Pro Shop" to="/shop" />
          <l.Space height={spacing.l} />
          <FooterLink text="Contact" to="/contact" />
        </l.Space>
      </l.Flex>
      <l.FlexColumn
        alignBottom={isTabletUp()}
        mb={[spacing.xxl, 0]}
        width={['100%', 'auto']}
      >
        {/* <t.Link
          to="/contact?id=studio-location"
          mb={spacing.l}
          onClick={() => scrollToId('studio-location')}
        >
          <PhoneAnchor
            color={colors.white}
            large
            textAlign={isMobile() ? 'center' : 'right'}
          >
            173 Grove St, Ste 3
            <l.Break />
            Worcester, MA 01605
          </PhoneAnchor>
        </t.Link>
        <t.Anchor href="tel:17743171269" mb={spacing.l}>
          <PhoneAnchor color={colors.white} large textAlign="right">
            774-317-1267
          </PhoneAnchor>
        </t.Anchor> */}
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
          <l.Break breakpoint={TABLET} /> React Fitness Club
          <l.Break /> All Rights Reserved
        </t.Text>
        <t.Text
          color={colors.white}
          textAlign={isTabletUp() ? 'right' : 'center'}
          width="100%"
        >
          Developed by
          <l.Break breakpoint={TABLET} /> Halsey Vandenberg
        </t.Text>
      </l.FlexColumn>
    </FooterBottom>
  </div>
);

export default Footer;
