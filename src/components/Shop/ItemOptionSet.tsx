import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { isSmall } from 'src/utils/screensize';
import { background } from 'styled-system';
import l from '../../styles/layout';
import { borders, colors, spacing, transitions } from '../../styles/theme';
import t from '../../styles/typography';
import {
  ItemOption,
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
    ':hover': {
      borderColor: onClick ? colors.red : colors.medGray,
    },
    borderColor: selected ? colors.red : colors.medGray,
    cursor: onClick ? 'pointer' : 'default',
  }),
);

export const ColorOption = styled(l.Space)(
  {
    border: borders.transparentThick,
    borderRadius: '50%',
    height: spacing.l,
    transition: transitions.default,
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
    ':hover': {
      borderColor: onClick ? colors.red : colors.medGray,
    },
    borderColor: selected ? colors.red : colors.medGray,
    cursor: onClick ? 'pointer' : 'default',
  }),
);

export const ImageOption = styled(l.Img)(
  {
    height: spacing.xxxl,
    marginRight: spacing.s,
    width: spacing.xxxl,
  },
  ({
    onClick,
  }: {
    onClick?: (optionType: string, optValue: string) => void;
  }) => ({
    cursor: onClick ? 'pointer' : 'default',
  }),
);

export const getOptionComponent = (
  optionType: string,
  option: ItemOption,
  selected: boolean,
  updateOption?: (optionType: string, newOption: ItemOption) => void,
  setHoverOptionSrc?: (hoverOptionSrc: string | null) => void,
) => {
  const commonProps = {
    onClick: updateOption ? () => updateOption(optionType, option) : undefined,
    onMouseEnter: () =>
      setHoverOptionSrc &&
      option.imageSrc &&
      setHoverOptionSrc(option.imageSrc),
    onMouseLeave: () => setHoverOptionSrc && setHoverOptionSrc(null),
    selected,
  };

  switch (optionType) {
    case 'color':
      return (
        <ColorOption
          {...commonProps}
          background={option.value}
          mb={spacing.t}
        />
      );
    case 'image':
      return (
        <ImageOption
          {...commonProps}
          background={option.value}
          src={option.value}
        />
      );
    default:
      return (
        <ButtonOption {...commonProps} mb={spacing.t}>
          <l.Span nowrap>{option.name || option.value}</l.Span>
        </ButtonOption>
      );
  }
};

interface Props {
  fullWidth?: boolean;
  option: ItemOptionSetType;
  selectedOption?: OrderItemOption;
  setHoverOptionSrc: (hoverOptionSrc: string | null) => void;
  updateOption: (optionId: string, newOption: ItemOption) => void;
}

const ItemOptionSet = ({
  fullWidth,
  option,
  selectedOption,
  setHoverOptionSrc,
  updateOption,
}: Props) => (
  <l.Space>
    <t.HelpText>{`${option.name}:`}</t.HelpText>
    <l.Space height={spacing.t} />
    <l.ScrollFlex
      width={
        fullWidth
          ? isSmall()
            ? 180
            : [220, 450, 450]
          : isSmall()
          ? 125
          : [150, 200, 280]
      }>
      {option.options.map((opt: ItemOption, index: number) => (
        <React.Fragment key={opt.value}>
          {getOptionComponent(
            option.id,
            opt,
            selectedOption
              ? R.equals(opt.value, selectedOption.selectedOption.value)
              : R.equals(index, 0),
            updateOption,
            setHoverOptionSrc,
          )}
          {index < option.options.length - 1 && (
            <l.Space minWidth={spacing.s} />
          )}
        </React.Fragment>
      ))}
    </l.ScrollFlex>
  </l.Space>
);

export default ItemOptionSet;
