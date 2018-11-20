const TABLET_WIDTH = 768;
const MOBILE_WIDTH = 699;
const SMALL_WIDTH = 321;

export const DESKTOP = 'desktop';
export const MOBILE = 'mobile';
export const SMALL = 'small';
export const TABLET = 'tablet';
export const TABLET_UP = 'tabletUp';
export const TABLET_DOWN = 'tabletDown';

export const isDesktop = () =>
  typeof window !== 'undefined' && window.innerWidth > TABLET_WIDTH;

export const isMobile = () => {
  return typeof window !== 'undefined' && window.innerWidth <= TABLET_WIDTH;
};

export const isTabletUp = () =>
  typeof window !== 'undefined' && window.innerWidth >= MOBILE_WIDTH;

export const isSmall = () =>
  typeof window !== 'undefined' && window.innerWidth < SMALL_WIDTH;
