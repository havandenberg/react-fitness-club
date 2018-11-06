import {
  DESKTOP,
  MOBILE,
  SMALL,
  TABLET,
  TABLET_DOWN,
  TABLET_UP,
} from '../utils/constants';
import { isMobile } from '../utils/screensize';

export const colors = {
  background: '#F2F3F4',
  background90: '#F2F3F4E6',
  black: '#242424',
  red: '#F14042',
  white: '#FFFFFF',
};

export const gradients = {
  black: `linear-gradient(to bottom, #4A4A4A, ${colors.black});`,
};

export const borders = {
  black: `solid 1px ${colors.black}`,
  borderRadius: 6,
  red: `solid 1px ${colors.red}`,
  transparent: `solid 1px transparent`,
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
  h1: '40px',
  h2: '24px',
  h3: '24px',
  largeText: '20px',
  subtitle: '48px',
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
  largeText: '16px',
  subtitle: '20px',
  text: '12px',
  title: '36px',
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

export const headerHeight = '650px';
export const maxContentWidth = '750px';
export const maxWidth = '1400px';

export const waypointOffset = 400;
export const scrollOffset = isMobile() ? -100 : -60;
export const scrollOptions = {
  duration: 300,
  offset: scrollOffset,
  smooth: true,
};
