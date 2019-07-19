import { StyleValue } from '../types/styles';

const TABLET_WIDTH = 768;
const MOBILE_WIDTH = 699;
const SMALL_WIDTH = 325;

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

export const isMobileOnly = () => {
  return typeof window !== 'undefined' && window.innerWidth <= MOBILE_WIDTH;
};

export const isTabletOnly = () => {
  return (
    typeof window !== 'undefined' &&
    window.innerWidth <= TABLET_WIDTH &&
    window.innerWidth > MOBILE_WIDTH
  );
};

export const isTabletUp = () =>
  typeof window !== 'undefined' && window.innerWidth >= MOBILE_WIDTH;

export const isSmall = () =>
  typeof window !== 'undefined' && window.innerWidth < SMALL_WIDTH;

export const getValueFromBreakpointArray = (array: StyleValue) => {
  if (Array.isArray(array)) {
    switch (array.length) {
      case 0:
        return '';
      case 1:
        return array[0];
      case 2:
        return isMobileOnly() ? array[0] : array[1];
      case 3:
        return isMobileOnly() ? array[0] : isTabletOnly() ? array[1] : array[2];
      case 4:
        return isSmall()
          ? array[0]
          : isMobileOnly()
          ? array[1]
          : isTabletOnly()
          ? array[2]
          : array[3];
      default:
        return array[0];
    }
  }
  return array;
};
