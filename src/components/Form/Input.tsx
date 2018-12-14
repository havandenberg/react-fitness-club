import styled from 'react-emotion';
import { flex, space, textAlign, width } from 'styled-system';
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

export type InputType = 'text' | 'password' | 'select' | 'textarea';

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
  height: inputHeight,
  opacity: 0.8,
  padding: spacing.s,
  transition: transitions.default,
  width: inputWidth,
  [breakpoints.mobile]: {
    padding: spacing.t,
    width: '100%',
  },
};

const withError = ({ error }: { error?: boolean }) => ({
  border: error ? borders.redThick : borders.blackThick,
});

const withCustomStyles = ({
  customStyles,
}: {
  customStyles?: React.CSSProperties;
}) => ({ ...customStyles });

export const SelectInput = styled('select')(
  {
    ...inputStyles,
  },
  flex,
  space,
  textAlign,
  withCustomStyles,
  withError,
  width,
);

export const TextInput = styled('input')(
  {
    ...inputStyles,
  },
  flex,
  space,
  textAlign,
  withCustomStyles,
  withError,
  width,
);

export const TextArea = styled('textarea')(
  {
    ...inputStyles,
    height: 200,
  },
  flex,
  space,
  textAlign,
  withCustomStyles,
  withError,
  width,
);
