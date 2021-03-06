import styled from 'react-emotion';
import { flex, height, space, textAlign, width } from 'styled-system';
import { scrollStyles } from '../../styles/layout';
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

export type InputType = 'text' | 'password' | 'select' | 'textarea' | 'file';

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
  borderRadius: borders.radius,
  boxShadow: shadows.box,
  color: colors.black,
  flex: 1,
  fontFamily: fonts.poppinsRegular,
  fontSize: fontSizes.largeText,
  height: inputHeight,
  opacity: 0.8,
  padding: spacing.s,
  transition: transitions.default,
  width: inputWidth,
  [breakpoints.mobile]: {
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
    ...scrollStyles,
  },
  flex,
  space,
  textAlign,
  withError,
  width,
  withCustomStyles,
);

export const TextInput = styled('input')(
  {
    ...inputStyles,
    ...scrollStyles,
    overflowX: 'visible',
  },
  flex,
  space,
  textAlign,
  withError,
  width,
  withCustomStyles,
);

export const TextArea = styled('textarea')(
  {
    ...inputStyles,
    ...scrollStyles,
    height: 200,
    overflowX: 'visible',
  },
  flex,
  height,
  space,
  textAlign,
  withError,
  width,
  withCustomStyles,
);
