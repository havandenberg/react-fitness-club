import * as React from 'react';
import { transitions } from '../../styles/theme';
import { StyleValue } from '../../types/styles';
import { getValueFromBreakpointArray } from '../../utils/screensize';

const UserImg = ({
  color = '#F14042',
  side = '512px',
}: {
  color?: string;
  side?: StyleValue;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    id="Layer_1"
    x="0px"
    y="0px"
    viewBox="0 0 258.75 258.75"
    enableBackground="new 0 0 258.75 258.75"
    xmlSpace="preserve"
    width={getValueFromBreakpointArray(side)}
    height={getValueFromBreakpointArray(side)}
  >
    <g>
      <circle
        cx="129.375"
        cy="60"
        r="60"
        style={{ fill: color, transition: transitions.default }}
      />
      <path
        d="M129.375,150c-60.061,0-108.75,48.689-108.75,108.75h217.5C238.125,198.689,189.436,150,129.375,150z"
        style={{ fill: color, transition: transitions.default }}
      />
    </g>
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
    <g />
  </svg>
);

export default UserImg;
