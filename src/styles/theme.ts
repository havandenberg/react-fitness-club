import {
  DESKTOP,
  MOBILE,
  SMALL,
  TABLET,
  TABLET_DOWN,
  TABLET_UP,
} from '../utils/screensize';
import { isMobile } from '../utils/screensize';

// Boilerplate theme constants

export const colors = {
  background: '#F2F3F4',
  background90: '#F2F3F4E6',
  black: '#242424',
  gray: '#4A4A4A',
  green: '#4BB543',
  lightGray: '#DEDEDE',
  lightRed: '#F46767',
  red: '#F14042',
  white: '#FFFFFF',
};

export const gradients = {
  black: `linear-gradient(to bottom, ${colors.gray}, ${colors.black});`,
  blackReverse: `linear-gradient(to top, ${colors.gray} 0, ${
    colors.gray
  } 85%, ${colors.black} 100%);`,
  divider: `linear-gradient(to bottom, ${colors.black} 0, ${
    colors.black
  } 20%, ${colors.gray} 50%, ${colors.black} 80%, ${colors.black} 100%);`,
  red: `linear-gradient(to bottom, ${colors.lightRed}, ${colors.red});`,
};

export const borders = {
  black: `solid 1px ${colors.black}`,
  blackThick: `solid 2px ${colors.black}`,
  borderRadius: 6,
  gray: `solid 1px ${colors.gray}`,
  red: `solid 1px ${colors.red}`,
  redThick: `solid 2px ${colors.red}`,
  transparent: `solid 1px transparent`,
  transparentThick: `solid 2px transparent`,
  white: `solid 1px ${colors.white}`,
};

export const breakpoints = {
  [DESKTOP]: '@media (min-width: 1000px)',
  [MOBILE]: '@media (max-width: 699px)',
  [SMALL]: '@media (max-width: 320px)',
  [TABLET]: '@media (min-width: 700px) and (max-width: 999px)',
  [TABLET_DOWN]: '@media (max-width: 999px)',
  [TABLET_UP]: '@media (min-width: 700px)',
};

export const fonts = {
  poppinsBold: 'Poppins-Bold, sans-serif',
  poppinsMedium: 'Poppins-Medium, sans-serif',
  poppinsSemiBold: 'Poppins-SemiBold, sans-serif',
};

export const fontSizes = {
  h1: '28px',
  h2: '24px',
  h3: '24px',
  helpText: '12px',
  largeText: '20px',
  small: '12px',
  subtitle: '28px',
  text: '16px',
  title: '52px',
};

export const tabletSizes = {
  ...fontSizes,
  subtitle: '28px',
  text: '16px',
  title: '42px',
};

export const mobileSizes = {
  h1: '28px',
  h2: '20px',
  h3: '20px',
  helpText: '10px',
  largeText: '16px',
  subtitle: '20px',
  text: '16px',
  title: '32px',
};

export const shadows = {
  box: '0 10px 6px -6px #777',
  text: '1px 2px 3px rgba(0,0,0,0.3)',
};

export const spacing = {
  huge: '128px',
  l: '24px',
  m: '16px',
  ml: '20px',
  s: '8px',
  sm: '12px',
  t: '4px',
  xl: '32px',
  xxl: '40px',
  xxxl: '48px',
  xxxxl: '64px',
  xxxxxl: '76px',
};

export const transitions = {
  default: 'all 0.3s ease',
};

export const z = {
  high: 3,
  low: 1,
  max: 100,
  mid: 2,
};

// Single variables

export const headerHeight = '650px';
export const inputHeight = '51px';
export const navHeight = '32px';
export const navHeightMobile = '56px';

export const inputWidth = '350px';
export const maxContentWidth = '1024px';
export const maxWidth = '1400px';

export const waypointOffset = 400;
export const scrollOffset = isMobile() ? -100 : -60;
export const scrollOptions = {
  duration: 300,
  offset: scrollOffset,
  smooth: true,
};
