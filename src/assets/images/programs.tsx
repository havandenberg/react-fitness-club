import * as React from 'react';
import { transitions } from '../../styles/theme';
import { StyleValue } from '../../types/styles';
import { getValueFromBreakpointArray } from '../../utils/screensize';

const ProgramsImg = ({
  color = '#F14042',
  side = '512px',
}: {
  color?: string;
  side?: StyleValue;
}) => (
  <svg
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    width={getValueFromBreakpointArray(side)}
    height={getValueFromBreakpointArray(side)}
    viewBox="0 0 302.412 302.412"
    className="">
    <g>
      <g>
        <g>
          <path
            d="M95.761,302.412h110.88V40.323H95.761V302.412z M105.845,50.4h90.726v241.94h-90.726V50.4z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <rect
            x="120.964"
            y="206.642"
            width="60.48"
            height="55.46"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <path
            d="M211.689,40.323v262.089l90.723-40.316V0L211.689,40.323z M292.34,255.538l-70.573,31.359V46.872l70.573-31.557V255.538z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <path
            d="M0,262.096l90.722,40.316V40.323L0,0V262.096z M10.083,15.314l70.552,31.557v240.038l-70.552-31.371V15.314z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <polygon
            points="20.158,131.508 70.564,155.493 70.564,85.218 20.158,61.229   "
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <polygon
            points="282.244,96.51 231.863,120.505 231.863,155.493 282.244,131.508   "
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <path
            d="M181.444,90.723h-60.48c-2.773,0-5.039,2.259-5.039,5.039c0,2.789,2.259,5.044,5.039,5.044h60.48    c2.783,0,5.055-2.256,5.055-5.044C186.492,92.981,184.228,90.723,181.444,90.723z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <path
            d="M181.444,110.884h-60.48c-2.773,0-5.039,2.256-5.039,5.048c0,2.776,2.259,5.039,5.039,5.039h60.48    c2.783,0,5.055-2.256,5.055-5.039C186.492,113.14,184.228,110.884,181.444,110.884z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <path
            d="M181.444,131.048h-60.48c-2.773,0-5.039,2.256-5.039,5.039c0,2.773,2.259,5.036,5.039,5.036h60.48    c2.783,0,5.055-2.256,5.055-5.036C186.492,133.304,184.228,131.048,181.444,131.048z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <path
            d="M235.364,186.024c0.688,0,1.406-0.171,2.131-0.512l41.991-19.888c2.447-1.157,4.365-4.019,4.365-6.515    c0-2.187-1.442-3.721-3.513-3.721c-0.688,0-1.419,0.176-2.138,0.518l-41.997,19.887c-2.441,1.157-4.354,4.02-4.354,6.516    C231.863,184.495,233.3,186.024,235.364,186.024z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <path
            d="M66.213,175.794l-41.997-19.887c-0.722-0.342-1.44-0.518-2.138-0.518c-2.07,0-3.51,1.534-3.51,3.721    c0,2.496,1.921,5.357,4.366,6.515l41.994,19.888c0.722,0.341,1.434,0.512,2.125,0.512c2.07,0,3.51-1.529,3.51-3.715    C70.564,179.813,68.649,176.951,66.213,175.794z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <path
            d="M235.364,209.4c0.688,0,1.406-0.177,2.131-0.518l41.991-19.888c2.447-1.156,4.365-4.013,4.365-6.503    c0-2.198-1.442-3.727-3.513-3.727c-0.688,0-1.419,0.171-2.138,0.518l-41.997,19.881c-2.441,1.163-4.354,4.025-4.354,6.516    C231.863,207.872,233.3,209.4,235.364,209.4z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
        </g>
      </g>
    </g>{' '}
  </svg>
);

export default ProgramsImg;
