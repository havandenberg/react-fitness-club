import styled from 'react-emotion';
import {
  alignItems,
  AlignItemsProps,
  alignSelf,
  AlignSelfProps,
  bottom,
  flex,
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

const FlexCentered = styled(Flex)({
  justifyContent: 'center',
});

const FlexColumn = styled(Flex)({
  flexDirection: 'column',
});

const Img = styled('img')(height, space, width);

export const scrollStyles = {
  '::-webkit-scrollbar': {
    width: 18,
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
    border: '6px solid rgba(0, 0, 0, 0)',
    height: spacing.t,
  },
  overflow: 'scroll',
};

const Space = styled('div')(
  alignItems,
  alignSelf,
  bottom,
  height,
  justifyContent,
  justifySelf,
  left,
  minHeight,
  minWidth,
  position,
  right,
  space,
  top,
  width,
);

const Scroll = styled(Space)({ ...scrollStyles }, overflow);
const ScrollFlex = styled(Flex)({ ...scrollStyles }, overflow);

const Section = styled('div')(
  {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '90%',
  },
  space,
);

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

const Line = styled('div')({
  borderBottom: borders.black,
  color: colors.black,
  margin: '0 auto',
  width: spacing.xxxl,
});

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

const Red = styled('span')({
  color: colors.red,
});

export default {
  BorderLine,
  Break,
  Caption,
  Center,
  Flex,
  FlexCentered,
  FlexColumn,
  Img,
  Line,
  Page,
  Red,
  Scroll,
  ScrollFlex,
  Section,
  Space,
};
