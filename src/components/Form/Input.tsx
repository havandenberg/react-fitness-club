import styled from 'react-emotion';
import { space, textAlign } from 'styled-system';
import {
  borders,
  breakpoints,
  colors,
  fonts,
  fontSizes,
  inputHeight,
  inputWidth,
  shadows,
  spacing,
  transitions,
} from '../../styles/theme';

const inputStyles = {
  ':hover': {
    opacity: 1,
  },
  ':placeholder': {
    color: colors.black,
    fontFamily: fonts.poppinsMedium,
    fontSize: fontSizes.largeText,
  },
  background: colors.lightGray,
  border: borders.black,
  borderRadius: borders.borderRadius,
  boxShadow: shadows.box,
  color: colors.black,
  flex: 1,
  font: fonts.poppinsSemiBold,
  fontSize: fontSizes.largeText,
  opacity: 0.8,
  padding: spacing.sm,
  transition: transitions.default,
  width: inputWidth,
  [breakpoints.mobile]: {
    padding: spacing.s,
    width: '100%',
  },
};

const withError = ({ error }: { error?: boolean }) => ({
  border: error ? borders.redThick : borders.blackThick,
});

export const SelectInput = styled('select')(
  {
    ...inputStyles,
    height: inputHeight,
  },
  space,
  textAlign,
  withError,
);

export const TextInput = styled('input')(
  {
    ...inputStyles,
  },
  space,
  textAlign,
  withError,
);

export const TextArea = styled('textarea')(
  {
    ...inputStyles,
    height: 200,
  },
  space,
  textAlign,
  withError,
);
