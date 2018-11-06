import styled from 'react-emotion';
import {
  color as colorFunc,
  display,
  fontSize as fontSizeFunc,
  height,
  maxWidth,
  space,
  width,
} from 'styled-system';
import {
  borders,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  mobileSizes,
  shadows,
  tabletSizes,
  transitions,
} from './theme';

const textOptions = [
  ({ bold }: { bold?: boolean }) => ({
    fontWeight: bold ? 'bold' : undefined,
  }),
  ({ center }: { center?: boolean }) => ({
    textAlign: center ? 'center' : undefined,
  }),
  colorFunc,
  display,
  fontSizeFunc,
  height,
  ({ nowrap }: { nowrap?: boolean }) => ({
    whiteSpace: nowrap ? 'nowrap' : undefined,
  }),
  maxWidth,
  ({ shadow }: { shadow?: boolean }) => ({
    textShadow: shadow ? shadows.text : undefined,
  }),
  space,
  width,
];

export const Title = styled('div')(
  {
    color: colors.black,
    fontFamily: fonts.poppinsSemiBold,
    fontSize: fontSizes.title,
    fontWeight: 200,
    textShadow: shadows.text,
    [breakpoints.tablet]: {
      fontSize: tabletSizes.title,
    },
    [breakpoints.mobile]: {
      fontSize: mobileSizes.title,
    },
  },
  ...textOptions,
);

export const Subtitle = styled('div')(
  {
    color: colors.black,
    fontFamily: fonts.poppinsSemiBold,
    fontSize: fontSizes.subtitle,
    fontWeight: 200,
    [breakpoints.tablet]: {
      fontSize: tabletSizes.subtitle,
    },
    [breakpoints.mobile]: {
      fontSize: mobileSizes.subtitle,
    },
  },
  ...textOptions,
);

export const H1 = styled('h1')(
  {
    color: colors.black,
    fontFamily: fonts.poppinsSemiBold,
    fontSize: fontSizes.h1,
    margin: 0,
    padding: 0,
    textShadow: shadows.text,
    [breakpoints.tablet]: {
      fontSize: tabletSizes.h1,
    },
    [breakpoints.mobile]: {
      fontSize: mobileSizes.h1,
    },
  },
  ...textOptions,
);

export const H2 = styled('h2')(
  {
    color: colors.black,
    fontFamily: fonts.poppinsMedium,
    fontSize: fontSizes.h2,
    margin: 0,
    padding: 0,
    [breakpoints.tablet]: {
      fontSize: tabletSizes.h2,
    },
    [breakpoints.mobile]: {
      fontSize: mobileSizes.h2,
    },
  },
  ...textOptions,
);

export const H3 = styled('h3')(
  {
    color: colors.black,
    fontFamily: fonts.poppinsMedium,
    fontSize: fontSizes.h3,
    margin: 0,
    padding: 0,
    [breakpoints.tablet]: {
      fontSize: tabletSizes.h3,
    },
    [breakpoints.mobile]: {
      fontSize: mobileSizes.h3,
    },
  },
  ...textOptions,
);

export const Text = styled('div')(
  {
    color: colors.black,
    fontFamily: fonts.poppinsMedium,
    letterSpacing: 0.8,
    lineHeight: 1.4,
  },
  ({ large, fontSize }: { large?: boolean; fontSize: any }) =>
    !fontSize && {
      fontSize: large ? fontSizes.largeText : fontSizes.text,
      [breakpoints.tablet]: {
        fontSize: large ? tabletSizes.largeText : tabletSizes.text,
      },
      [breakpoints.mobile]: {
        fontSize: large ? mobileSizes.largeText : mobileSizes.text,
      },
    },
  ...textOptions,
);

const Anchor = styled('a')(
  {
    alignItems: 'center',
    borderBottom: borders.transparent,
    cursor: 'pointer',
    display: 'inline-flex',
    transition: transitions.default,
  },
  ({ border, color }: { border: string; color: string }) => ({
    ':hover': {
      borderBottom: border,
    },
    ':link': {
      color,
    },
    ':visited': {
      color,
    },
  }),
  ...textOptions,
);

export const ItalicsText = styled(Text)({ fontStyle: 'italic' });

export default {
  Anchor,
  H1,
  H2,
  H3,
  ItalicsText,
  Subtitle,
  Text,
  Title,
};
