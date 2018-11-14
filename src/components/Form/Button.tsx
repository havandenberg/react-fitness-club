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

export const ButtonPrimary = styled(Link)(
  {
    ':before': {
      backgroundImage: gradients.red,
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
    background: colors.red,
    borderRadius: borders.borderRadius,
    boxShadow: shadows.box,
    color: colors.white,
    fontSize: fontSizes.largeText,
    fontWeight: 500,
    padding: spacing.ml,
    position: 'relative',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    zIndex: 1,
    [breakpoints.mobile]: {
      padding: spacing.m,
    },
  },
  space,
  width,
);
