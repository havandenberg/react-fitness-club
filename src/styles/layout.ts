import styled from 'react-emotion';
import {
  alignItems,
  AlignItemsProps,
  alignSelf,
  AlignSelfProps,
  background,
  BackgroundProps,
  borderColor,
  bottom,
  boxShadow,
  BoxShadowProps,
  color,
  flex,
  flexBasis,
  flexDirection,
  FlexDirectionProps,
  FlexProps,
  height,
  HeightProps,
  justifyContent,
  JustifyContentProps,
  justifySelf,
  JustifySelfProps,
  left,
  maxHeight,
  maxWidth,
  MaxWidthProps,
  minHeight,
  minWidth,
  overflow,
  position,
  PositionProps,
  right,
  space,
  SpaceProps,
  top,
  width,
  WidthProps,
  zIndex,
  ZIndexProps,
} from 'styled-system';
import { Breakpoint } from '../types/styles';
import {
  borders,
  breakpoints,
  colors,
  gradients,
  maxContentWidth,
  spacing,
} from './theme';
import { textOptions } from './typography';

// Flex is the basis for other layout components
interface FlexDivProps {
  alignBottom?: boolean;
  alignTop?: boolean;
  columnOnMobile?: boolean;
  columnRevOnMobile?: boolean;
  grow?: number;
  inline?: boolean;
  itemClassName?: string;
  margins?: string;
  pointer?: boolean;
  spaceBetween?: boolean;
  isWrap?: boolean;
}

const Flex = styled('div')<
  AlignItemsProps &
    AlignSelfProps &
    BackgroundProps &
    BoxShadowProps &
    HeightProps &
    JustifyContentProps &
    JustifySelfProps &
    PositionProps &
    FlexDirectionProps &
    FlexProps &
    FlexDivProps &
    MaxWidthProps &
    SpaceProps &
    WidthProps &
    ZIndexProps
>(
  alignItems,
  {
    alignItems: 'center',
  },
  alignSelf,
  background,
  borderColor,
  boxShadow,
  flex,
  flexDirection,
  height,
  justifyContent,
  justifySelf,
  maxWidth,
  minWidth,
  position,
  space,
  width,
  zIndex,
  ({
    alignBottom,
    alignTop,
    columnOnMobile,
    columnRevOnMobile,
    grow,
    inline,
    itemClassName = '',
    margins = '0',
    pointer,
    spaceBetween,
    isWrap,
  }: FlexDivProps) => {
    const marginKey = `& .${itemClassName} + .${itemClassName}`;
    return {
      alignItems: alignTop ? 'flex-start' : alignBottom ? 'flex-end' : 'center',
      cursor: pointer ? 'pointer' : undefined,
      display: inline ? 'inline-flex' : 'flex',
      flexGrow: grow,
      flexWrap: isWrap ? 'wrap' : undefined,
      justifyContent: spaceBetween ? 'space-between' : undefined,
      [marginKey]: {
        marginLeft: margins !== '0' ? margins : undefined,
      },
      [breakpoints.mobile]:
        columnOnMobile || columnRevOnMobile
          ? { flexDirection: columnRevOnMobile ? 'column-reverse' : 'column' }
          : {},
    };
  },
);

// Boilerplate layout components

const Break = styled('br')(
  {
    display: 'none',
    flexBasis: '100%',
    height: '0',
    overflow: 'hidden',
    width: '0',
  },
  ({ breakpoint = 'all' }: { breakpoint?: Breakpoint }) =>
    breakpoint === 'all'
      ? {
          display: 'block',
        }
      : {
          [breakpoints[breakpoint]]: {
            display: 'block',
          },
        },
  height,
  width,
);

const Caption = styled('div')({
  color: colors.black,
  fontSize: '1rem',
});

const Center = styled('div')(
  {
    margin: '0 auto',
  },
  space,
);

const CursorPointerWrapper = styled('div')(
  ({ showPointer }: { showPointer?: boolean }) => ({
    cursor: showPointer ? 'default' : 'pointer',
  }),
);

const FlexCentered = styled(Flex)({
  justifyContent: 'center',
});

const FlexColumn = styled(Flex)({
  flexDirection: 'column',
});

const FlexColumnCentered = styled(Flex)({
  flexDirection: 'column',
  justifyContent: 'center',
});

const Img = styled('img')(height, maxHeight, maxWidth, space, width);

export const scrollStyles = (showScrollBar: boolean) => ({
  '::-webkit-scrollbar': {
    height: showScrollBar ? 14 : 0,
    width: showScrollBar ? 14 : 0,
  },
  '::-webkit-scrollbar-button': {
    display: 'none',
    height: 0,
    width: 0,
  },
  '::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    '-webkit-border-radius': 20,
    '-webkit-box-shadow':
      'inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05)',
    backgroundClip: 'padding-box',
    backgroundColor: colors.black,
    border: showScrollBar ? '6px solid rgba(0, 0, 0, 0)' : 0,
    height: showScrollBar ? spacing.t : 0,
  },
  overflow: 'auto',
});

const Span = styled('span')(
  alignItems,
  alignSelf,
  background,
  bottom,
  boxShadow,
  flex,
  flexBasis,
  height,
  justifyContent,
  justifySelf,
  left,
  maxHeight,
  minHeight,
  minWidth,
  position,
  right,
  space,
  top,
  width,
  zIndex,
  ...textOptions,
);

const Space = styled('div')(
  alignItems,
  alignSelf,
  background,
  bottom,
  boxShadow,
  flex,
  flexBasis,
  height,
  justifyContent,
  justifySelf,
  left,
  maxHeight,
  minHeight,
  minWidth,
  position,
  right,
  space,
  top,
  width,
  zIndex,
);

const Scroll = styled(Space)(
  ({ showScrollBar = true }: { showScrollBar: boolean }) => ({
    ...scrollStyles(showScrollBar),
  }),
  overflow,
);
const ScrollFlex = styled(Flex)(
  ({ showScrollBar = true }: { showScrollBar: boolean }) => ({
    ...scrollStyles(showScrollBar),
  }),
  overflow,
);

const Section = styled('div')(
  {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '90%',
  },
  space,
);

const GalleryWrapper = styled(Space)({
  display: 'block',
  minHeight: '1px',
  overflow: 'auto',
  width: '100%',
});

// Project specific layout components

const BorderLine = styled('div')(
  {
    background: gradients.black,
    height: spacing.s,
    margin: '0 auto',
    width: '100%',
  },
  height,
  space,
  width,
);

const Line = styled('div')(
  {
    borderBottom: borders.black,
    color: colors.black,
    margin: '0 auto',
    width: spacing.xxxl,
  },
  borderColor,
  color,
  height,
  space,
  width,
);

const Page = styled(Space)({
  background: colors.background,
  margin: '0 auto',
  maxWidth: maxContentWidth,
  position: 'relative',
  width: '90%',
  [breakpoints.mobile]: {
    width: '100%',
  },
});

const Blue = styled('span')({
  color: colors.darkBlue,
  fontWeight: 'bold',
});

const Bold = styled('span')({
  fontWeight: 'bold',
});

const Red = styled('span')({
  color: colors.red,
});

export default {
  Blue,
  Bold,
  BorderLine,
  Break,
  Caption,
  Center,
  CursorPointerWrapper,
  Flex,
  FlexCentered,
  FlexColumn,
  FlexColumnCentered,
  GalleryWrapper,
  Img,
  Line,
  Page,
  Red,
  Scroll,
  ScrollFlex,
  Section,
  Space,
  Span,
};
