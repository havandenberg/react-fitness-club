import styled from 'react-emotion';
import { Link as RouterLink } from 'react-router-dom';
import {
  color as colorFunc,
  display,
  flex,
  fontSize as fontSizeFunc,
  height,
  maxWidth,
  space,
  textAlign,
  width,
} from 'styled-system';
import { scrollStyles } from './layout';
import {
  borders,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  maxTextWidth,
  mobileSizes,
  shadows,
  tabletSizes,
  transitions,
} from './theme';

// Basic typography components

const textOptions = [
  ({ bold }: { bold?: boolean }) => ({
    fontWeight: bold ? 'bold' : undefined,
  }),
  ({ center }: { center?: boolean }) => ({
    textAlign: center ? 'center' : undefined,
  }),
  colorFunc,
  display,
  flex,
  fontSizeFunc,
  height,
  ({ italic }: { italic?: boolean }) => ({
    fontStyle: italic ? 'italic' : undefined,
  }),
  ({ nowrap }: { nowrap?: boolean }) => ({
    whiteSpace: nowrap ? 'nowrap' : undefined,
  }),
  { ...scrollStyles, overflow: 'visible' },
  ({ overflowX }: { overflowX?: boolean }) => ({
    maxWidth: overflowX ? maxTextWidth : undefined,
    overflowX: overflowX ? 'auto' : 'visible',
  }),
  maxWidth,
  textAlign,
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
    fontFamily: fonts.poppinsSemiBold,
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
    letterSpacing: 1,
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
    fontFamily: fonts.poppinsMedium,
    fontSize: fontSizes.text,
    [breakpoints.tablet]: {
      fontSize: tabletSizes.text,
    },
    [breakpoints.mobile]: {
      fontSize: tabletSizes.text,
    },
    [breakpoints.small]: {
      fontSize: mobileSizes.text,
    },
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
    borderBottom: borders.transparent,
  }),
  ...textOptions,
);

const Link = styled(RouterLink)(
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
    borderBottom: borders.transparent,
  }),
  ...textOptions,
);

type HoverStyle = 'opacity' | 'underline';

const TextButton = styled(Text)(
  ({
    color = colors.red,
    hoverStyle = 'opacity',
    large,
  }: {
    border: string;
    color: string;
    hoverStyle: HoverStyle;
    large?: boolean;
  }) => ({
    ':hover': {
      borderBottom: hoverStyle === 'underline' ? borders.red : undefined,
      color: hoverStyle === 'opacity' ? colors.red : undefined,
    },
    borderBottom: hoverStyle === 'underline' ? borders.transparent : undefined,
    color,
    cursor: 'pointer',
    fontSize: large ? fontSizes.largeText : fontSizes.text,
    [breakpoints.tablet]: {
      fontSize: large ? tabletSizes.largeText : tabletSizes.text,
    },
    [breakpoints.mobile]: {
      fontSize: large ? mobileSizes.largeText : mobileSizes.text,
    },
    transition: transitions.default,
  }),
  ...textOptions,
);

// Project-specific typography components

const helpColor = ({ valid }: { valid?: boolean }) => ({
  color: valid ? colors.green : colors.gray,
  transition: transitions.default,
});

const HelpText = styled(Text)(
  {
    fontSize: fontSizes.helpText,
    [breakpoints.tablet]: {
      fontSize: tabletSizes.helpText,
    },
    [breakpoints.mobile]: {
      fontSize: mobileSizes.helpText,
    },
  },
  helpColor,
);

const HelpSpan = styled('span')(helpColor);

export default {
  Anchor,
  H1,
  H2,
  H3,
  HelpSpan,
  HelpText,
  Link,
  Subtitle,
  Text,
  TextButton,
  Title,
};
