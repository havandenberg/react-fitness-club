const TABLET_WIDTH = 768;
const SMALL_WIDTH = 320;

export const isMobile = () =>
  typeof window !== 'undefined' && window.innerWidth < TABLET_WIDTH;

export const isSmall = () =>
  typeof window !== 'undefined' && window.innerWidth < SMALL_WIDTH;
