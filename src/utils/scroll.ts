import * as Scroll from 'react-scroll';
import { scrollOptions } from '../styles/theme';

export const scrollToId = (id: string, customOptions?: object) =>
  Scroll.scroller.scrollTo(id, {
    ...scrollOptions,
    ...customOptions,
  });
