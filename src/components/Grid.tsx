import * as R from 'ramda';
import * as React from 'react';
import l from '../styles/layout';
import { StyleSet, StyleValue } from '../types/styles';

interface Props {
  alignBottom?: boolean;
  alignTop?: boolean;
  children: React.ReactNode;
  customStyles?: StyleSet;
  id: string;
  itemWidth: StyleValue;
  itemSpacing?: StyleValue;
  maxColumns: number;
}

const Grid = ({
  alignBottom,
  alignTop,
  children,
  customStyles,
  id,
  itemWidth,
  itemSpacing = 0,
  maxColumns,
}: Props) => (
  <l.Flex
    alignTop={alignTop}
    alignBottom={alignBottom}
    isWrap
    spaceBetween
    mx={`-${itemSpacing}`}
    {...customStyles}>
    {React.Children.map(children, (child, index) => (
      <l.Space key={`${id}-${index}`} mx={itemSpacing} width={itemWidth}>
        {child}
      </l.Space>
    ))}
    {/* generates a spacer for each column up to maxColumns to ensure even spacing */}
    {children &&
      R.times(
        index => <l.Space key={`${id}-space-${index}`} width={itemWidth} />,
        Object.keys(children).length % maxColumns,
      )}
  </l.Flex>
);

export default Grid;
