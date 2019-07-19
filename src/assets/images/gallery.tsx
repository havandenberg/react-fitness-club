import * as React from 'react';
import { transitions } from '../../styles/theme';
import { StyleValue } from '../../types/styles';
import { getValueFromBreakpointArray } from '../../utils/screensize';

const GalleryImg = ({
  color = '#F14042',
  side = '512px',
}: {
  color?: string;
  side?: StyleValue;
}) => (
  <svg
    version="1.1"
    viewBox="0 0 129 129"
    enableBackground="new 0 0 129 129"
    width={getValueFromBreakpointArray(side)}
    height={getValueFromBreakpointArray(side)}
    className="">
    <g>
      <g>
        <g>
          <path
            d="m10.5,58.9h44.3c2.3,0 4.1-1.8 4.1-4.1v-44.3c0-2.3-1.8-4.1-4.1-4.1h-44.3c-2.3,0-4.1,1.8-4.1,4.1v44.3c0,2.2 1.9,4.1 4.1,4.1zm4.1-44.3h36.1v36.1h-36.1v-36.1z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <path
            d="m122.6,10.5c0-2.3-1.8-4.1-4.1-4.1h-44.3c-2.3,0-4.1,1.8-4.1,4.1v44.3c0,2.3 1.8,4.1 4.1,4.1h44.3c2.3,0 4.1-1.8 4.1-4.1v-44.3zm-8.2,40.2h-36.1v-36.1h36.1v36.1z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <path
            d="m10.5,122.6h44.3c2.3,0 4.1-1.8 4.1-4.1v-44.3c0-2.3-1.8-4.1-4.1-4.1h-44.3c-2.3,0-4.1,1.8-4.1,4.1v44.3c0,2.2 1.9,4.1 4.1,4.1zm4.1-44.3h36.1v36.1h-36.1v-36.1z"
            data-original="#000000"
            className="active-path"
            data-old_color="#000000"
            style={{ fill: color, transition: transitions.default }}
          />
          <path
            d="m118.5,70.1h-44.3c-2.3,0-4.1,1.8-4.1,4.1v44.3c0,2.3 1.8,4.1 4.1,4.1h44.3c2.3,0 4.1-1.8 4.1-4.1v-44.3c0-2.2-1.9-4.1-4.1-4.1zm-4.1,44.3h-36.1v-36.1h36.1v36.1z"
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

export default GalleryImg;
