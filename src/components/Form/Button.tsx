import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { space, width } from 'styled-system';
import {
  borders,
  breakpoints,
  colors,
  fontSizes,
  gradients,
  shadows,
  spacing,
  transitions,
  z,
} from '../../styles/theme';
import { Scale } from '../../types/styles';

export const getButtonProps: (
  background: string,
  gradient: string,
  size?: Scale,
) => any = (background, gradient, size = 'big') => ({
  ':before': {
    backgroundImage: gradient,
    borderRadius: 'inherit',
    content: '""',
    display: 'block',
    height: '100%',
    left: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    transition: transitions.default,
    width: '100%',
    zIndex: z.neg,
  },
  ':hover': {
    ':before': {
      opacity: 1,
    },
  },
  ':last-child': {
    marginRight: 0,
  },
  alignItems: 'center',
  background,
  borderRadius: borders.radius,
  boxShadow: shadows.box,
  color: colors.white,
  cursor: 'pointer',
  display: 'flex',
  fontSize: size === 'big' ? fontSizes.largeText : fontSizes.text,
  fontWeight: 500,
  justifyContent: 'center',
  padding: size === 'big' ? spacing.m : spacing.s,
  position: 'relative',
  textAlign: 'center',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  zIndex: 1,
  [breakpoints.mobile]: {
    padding: size === 'big' ? spacing.sm : spacing.s,
  },
});

export const ButtonPrimary = styled('button')(
  ({ background = colors.red, gradient = gradients.red, size = 'big' }) => ({
    ...getButtonProps(background, gradient, size),
  }),
  space,
  width,
);

export const LinkPrimary = styled(Link)(
  getButtonProps(colors.red, gradients.red),
  space,
  width,
);

export const ButtonSecondary = styled('button')(
  getButtonProps(colors.black, gradients.black),
  space,
  width,
);

export const LinkSecondary = styled(Link)(
  getButtonProps(colors.black, gradients.black),
  space,
  width,
);

export const ButtonTertiary = styled('div')({
  ':hover': {
    borderBottom: borders.red,
  },
  borderBottom: borders.transparent,
  color: colors.red,
  cursor: 'pointer',
  fontSize: fontSizes.largeText,
  transition: transitions.default,
});
