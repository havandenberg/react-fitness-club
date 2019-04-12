import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { background } from 'styled-system';
import l from '../../styles/layout';
import { borders, colors, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import {
  ItemOptionSet,
  ItemOptionSet as ItemOptionSetType,
  OrderItemOption,
} from '../../types/shop';

export const ButtonOption = styled(t.TextButton)(
  {
    background: colors.lightGray,
    border: borders.blackThick,
    borderRadius: borders.radius,
    padding: spacing.t,
  },
  ({
    selected,
    onClick,
  }: {
    selected?: boolean;
    onClick?: (optionType: string, optValue: string) => void;
  }) => ({
    borderColor: selected ? colors.red : colors.gray,
    cursor: onClick ? 'pointer' : 'default',
  }),
);

export const ColorOption = styled(l.Space)(
  {
    border: borders.transparentThick,
    borderRadius: '50%',
    height: spacing.l,
    width: spacing.l,
  },
  background,
  ({
    selected,
    onClick,
  }: {
    selected?: boolean;
    onClick?: (optionType: string, optValue: string) => void;
  }) => ({
    borderColor: selected ? colors.red : colors.medGray,
    cursor: onClick ? 'pointer' : 'default',
  }),
);

export const getOptionComponent = (
  optionType: string,
  optionValue: string,
  selected: boolean,
  updateOption?: (optionType: string, optValue: string) => void,
) => {
  switch (optionType) {
    case 'color':
      return (
        <ColorOption
          background={optionValue}
          selected={selected}
          onClick={
            updateOption
              ? () => updateOption(optionType, optionValue)
              : undefined
          }
          mb={spacing.t}
        />
      );
    default:
      return (
        <ButtonOption
          selected={selected}
          onClick={
            updateOption
              ? () => updateOption(optionType, optionValue)
              : undefined
          }
          mb={spacing.t}>
          {optionValue}
        </ButtonOption>
      );
  }
};

interface Props {
  option: ItemOptionSetType;
  selectedOption?: OrderItemOption;
  updateOption: (optionId: string, optValue: string) => void;
}

const ItemOptionSet = ({ option, selectedOption, updateOption }: Props) => (
  <l.Space>
    <t.HelpText>{option.name}</t.HelpText>
    <l.Space height={spacing.t} />
    <l.Flex isWrap>
      {option.options.map((opt: string, index: number) => (
        <React.Fragment key={opt}>
          {getOptionComponent(
            option.id,
            opt,
            selectedOption
              ? R.equals(opt, selectedOption.value)
              : R.equals(index, 0),
            updateOption,
          )}
          {index < option.options.length - 1 && <l.Space width={spacing.s} />}
        </React.Fragment>
      ))}
    </l.Flex>
  </l.Space>
);

export default ItemOptionSet;
