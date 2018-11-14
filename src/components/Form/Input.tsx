import styled from 'react-emotion';
import { textAlign } from 'styled-system';
import {
  borders,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  inputWidth,
  shadows,
  spacing,
} from '../../styles/theme';

export const TextInput = styled('input')(
  {
    ':hover': {
      opacity: 1,
    },
    background: colors.lightGray,
    border: borders.gray,
    borderRadius: borders.borderRadius,
    borderWidth: 2,
    boxShadow: shadows.box,
    color: colors.black,
    font: fonts.poppinsSemiBold,
    fontSize: fontSizes.largeText,
    padding: spacing.sm,
    width: inputWidth,
    [breakpoints.mobile]: {
      padding: spacing.s,
      width: '100%',
    },
  },
  textAlign,
);
