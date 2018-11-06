import styled from 'react-emotion';
import {
  height,
  HeightProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  width,
  WidthProps,
} from 'styled-system';
import { Breakpoint } from '../types/styles';
import { borders, breakpoints, colors, gradients, spacing } from './theme';

interface RowProps {
  alignBottom?: boolean;
  alignTop?: boolean;
  columnOnMobile?: boolean;
  columnRevOnMobile?: boolean;
  inline?: boolean;
  itemClassName?: string;
  margins?: string;
  spaceBetween?: boolean;
  isWrap?: boolean;
}

const Row = styled('div')<
  HeightProps & PositionProps & RowProps & SpaceProps & WidthProps
>(
  {
    alignItems: 'center',
  },
  height,
  position,
  space,
  width,
  ({
    alignBottom,
    alignTop,
    columnOnMobile,
    columnRevOnMobile,
    inline,
    itemClassName = '',
    margins = '0',
    spaceBetween,
    isWrap,
  }: {
    alignBottom?: boolean;
    alignTop?: boolean;
    columnOnMobile?: boolean;
    columnRevOnMobile?: boolean;
    inline?: boolean;
    itemClassName?: string;
    margins?: string;
    spaceBetween?: boolean;
    isWrap?: boolean;
  }) => {
    const marginKey = `& .${itemClassName} + .${itemClassName}`;
    return {
      alignItems: alignTop ? 'flex-start' : alignBottom ? 'flex-end' : 'center',
      display: inline ? 'inline-flex' : 'flex',
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
);

const Center = styled('div')(
  {
    margin: '0 auto',
  },
  space,
);

const CenteredRow = styled(Row)({
  justifyContent: 'center',
});

const Space = styled('div')(height, space, width);

const Section = styled('div')(
  {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '90%',
  },
  space,
);

const BorderLine = styled('div')({
  background: gradients.black,
  height: spacing.s,
  width: '100%',
});

const Line = styled('div')({
  borderBottom: borders.black,
  color: colors.black,
  margin: '0 auto',
  width: spacing.xxxl,
});

const Caption = styled('div')({
  color: colors.black,
  fontSize: '1rem',
});

const scrollStyles = {
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

const Scroll = styled(Space)({ ...scrollStyles });
const ScrollRow = styled(Row)({ ...scrollStyles });

export default {
  BorderLine,
  Break,
  Caption,
  Center,
  CenteredRow,
  Line,
  Row,
  Scroll,
  ScrollRow,
  Section,
  Space,
};
