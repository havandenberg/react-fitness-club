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
} from '../../styles/theme';

const getButtonProps: (background: string, gradient: string) => any = (
  background,
  gradient,
) => ({
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
    zIndex: -1,
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
  borderRadius: borders.borderRadius,
  boxShadow: shadows.box,
  color: colors.white,
  cursor: 'pointer',
  display: 'flex',
  fontSize: fontSizes.largeText,
  fontWeight: 500,
  justifyContent: 'center',
  padding: spacing.m,
  position: 'relative',
  textAlign: 'center',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  zIndex: 1,
  [breakpoints.mobile]: {
    padding: spacing.sm,
  },
});

export const ButtonPrimary = styled('button')(
  getButtonProps(colors.red, gradients.red),
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
  color: colors.red,
  cursor: 'pointer',
  fontSize: fontSizes.largeText,
  transition: transitions.default,
});
