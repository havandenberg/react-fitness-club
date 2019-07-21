import * as React from 'react';
import styled from 'react-emotion';
import {
  borders,
  colors,
  fontSizes,
  spacing,
  transitions,
} from '../../styles/theme';
import { CheckboxRadioInputType, Scale } from '../../types/styles';

const getColor = (
  disabled?: boolean,
  hover?: boolean,
  type?: CheckboxRadioInputType,
  error?: boolean,
) => {
  if (error) {
    return colors.red;
  }
  if (type === 'checkbox') {
    return 'inherit';
  }
  if (disabled) {
    return colors.lightGray;
  }
  return hover ? colors.black : colors.gray;
};

const CheckboxRadioInputContainer = styled('div')(
  {
    alignItems: 'center',
    background: colors.lightGray,
    border: `solid 2px ${colors.gray}`,
    borderRadius: borders.radius,
    display: 'inline-flex',
    position: 'relative',
    transition: transitions.default,
  },
  ({
    disabled,
    error,
    scale,
    type,
  }: {
    disabled: boolean | undefined;
    error?: boolean;
    scale: Scale;
    type: CheckboxRadioInputType;
  }) => ({
    '& .checkmark-radio': {
      background: getColor(disabled, false, type),
      borderColor: getColor(disabled, false, type),
    },
    '& .checkmark-radio-outer': {
      borderColor: getColor(disabled, false, type, error),
    },
    ':hover': {
      '& .checkmark-radio': {
        background: getColor(disabled, true),
        borderColor: getColor(disabled, true, type),
      },
      '& .checkmark-radio-outer': {
        borderColor: getColor(disabled, true, type, error),
      },
      borderColor: getColor(disabled, true, type, error),
    },
    borderColor: getColor(disabled, false, type, error),
    borderRadius: type === 'radio' ? '50%' : 4,
    height: scale === 'big' ? 35 : 23,
    width: scale === 'big' ? 35 : 23,
  }),
);

const Input = styled('input')({
  ':disabled': {
    cursor: 'auto',
  },
  cursor: 'pointer',
  height: '100%',
  left: 0,
  margin: 0,
  opacity: 0,
  position: 'absolute',
  top: 0,
  width: '100%',
});

const CheckmarkRadioContainer = styled('div')(
  {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    textAlign: 'center',
    top: 0,
  },
  ({ type }: { type: CheckboxRadioInputType }) => ({
    borderRadius: type === 'radio' ? '50%' : 'inherit',
  }),
);

const Checkmark = styled('div')(
  {
    borderBottom: `solid 3px ${colors.gray}`,
    borderRight: `solid 3px ${colors.gray}`,
    transform: 'scaleX(0.85) translateY(-15%) translateX(-5%) rotate(45deg)',
    transition: transitions.default,
    verticalAlign: 'middle',
  },
  ({ scale }: { scale: Scale }) => ({
    borderWidth: scale === 'big' ? 3 : 2,
    height: scale === 'big' ? spacing.ml : 10,
    width: scale === 'big' ? 12 : 6,
  }),
);

const RadioCenter = styled('div')({
  background: colors.gray,
  borderRadius: '50%',
  height: 13,
  transition: transitions.default,
  verticalAlign: 'middle',
  width: 13,
});

interface CheckboxRadioInnerProps {
  checked: boolean;
  type: CheckboxRadioInputType;
  size: Scale;
}

const CheckmarkRadioInner = (props: CheckboxRadioInnerProps) => (
  <CheckmarkRadioContainer type={props.type}>
    {props.checked &&
      (props.type === 'checkbox' ? (
        <Checkmark className="checkmark-radio" scale={props.size} />
      ) : (
        <RadioCenter className="checkmark-radio" />
      ))}
  </CheckmarkRadioContainer>
);

interface CheckboxRadioInputProps {
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  type: CheckboxRadioInputType;
  size: Scale;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckboxRadioInput = (props: CheckboxRadioInputProps) => (
  <CheckboxRadioInputContainer
    className="checkmark-radio-outer"
    disabled={props.disabled}
    scale={props.size}
    type={props.type}>
    <CheckmarkRadioInner
      size={props.size}
      checked={props.checked}
      type={props.type}
    />
    <Input
      type={props.type}
      disabled={props.disabled}
      onChange={props.onChange}
    />
  </CheckboxRadioInputContainer>
);

const getWithLabelBorderColor = (
  checked?: boolean,
  disabled?: boolean,
  hover?: boolean,
  inner?: boolean,
  error?: boolean,
) => {
  if (error) {
    return colors.red;
  }
  if (disabled) {
    return colors.lightGray;
  }
  if (hover) {
    if (inner) {
      return colors.black;
    }
    return colors.lightGray;
  }
  if (inner) {
    return colors.gray;
  }
  return checked ? colors.gray : colors.lightGray;
};

const CheckboxRadioInputWithLabelContainer = styled('div')(
  {
    alignItems: 'center',
    background: 'transparent',
    borderRadius: borders.radius,
    display: 'inline-flex',
    position: 'relative',
    transition: transitions.default,
  },
  ({
    checked,
    disabled,
    error,
    showBorder,
    type,
  }: {
    checked: boolean;
    disabled?: boolean;
    error?: boolean;
    showBorder?: boolean;
    type: CheckboxRadioInputType;
  }) => ({
    '& .checkmark-radio': {
      background: getColor(disabled, false, type),
      borderColor: getColor(disabled, false, type),
    },
    '& .checkmark-radio-outer': {
      borderColor: getWithLabelBorderColor(
        checked,
        disabled,
        false,
        true,
        error,
      ),
      borderRadius: type === 'radio' ? '50%' : 4,
    },
    ':hover': {
      '& .checkmark-radio': {
        background: getColor(disabled, true, type),
        borderColor: getWithLabelBorderColor(checked, disabled, true, true),
      },
      '& .checkmark-radio-outer': {
        borderColor: getWithLabelBorderColor(
          checked,
          disabled,
          true,
          true,
          error,
        ),
      },
      borderColor: getWithLabelBorderColor(
        checked,
        disabled,
        true,
        false,
        error,
      ),
    },
    border: showBorder ? `solid 2px ${colors.gray}` : 0,
    borderColor: getWithLabelBorderColor(
      checked,
      disabled,
      false,
      false,
      error,
    ),
    color: disabled ? colors.gray : colors.black,
    padding: showBorder ? spacing.m : 0,
  }),
);

const CheckboxRadioInputWithLabelInnerContainer = styled('div')(
  {
    alignItems: 'center',
    background: colors.lightGray,
    borderRadius: borders.radius,
    borderStyle: 'solid',
    borderWidth: 2,
    display: 'inline-flex',
    position: 'relative',
    transition: transitions.default,
  },
  ({ scale = 'big' }: { scale?: Scale }) => ({
    height: scale === 'big' ? 35 : 23,
    width: scale === 'big' ? 35 : 23,
  }),
);

const CheckboxRadioInputText = styled('div')(
  {
    transition: transitions.default,
  },
  ({ error, scale }: { error?: boolean; scale?: Scale }) => ({
    color: error ? colors.red : undefined,
    fontFamily: 'Poppins-Medium',
    fontSize: scale === 'small' ? fontSizes.text : undefined,
    marginLeft: scale === 'big' ? spacing.m : spacing.t,
  }),
);

interface CheckboxRadioInputWithLabelProps {
  checked: boolean;
  disabled?: boolean;
  error?: boolean;
  name?: string;
  showBorder?: boolean;
  text: string;
  type: CheckboxRadioInputType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  scale?: Scale;
}

export const CheckboxRadioInputWithLabel = ({
  checked,
  disabled,
  error,
  showBorder,
  type,
  name,
  text,
  onChange,
  scale = 'big',
}: CheckboxRadioInputWithLabelProps) => (
  <CheckboxRadioInputWithLabelContainer
    checked={checked}
    disabled={disabled}
    error={error}
    showBorder={showBorder}
    type={type}>
    <CheckboxRadioInputWithLabelInnerContainer
      className="checkmark-radio-outer"
      scale={scale}>
      <CheckmarkRadioInner size={scale} checked={checked} type={type} />
    </CheckboxRadioInputWithLabelInnerContainer>
    <CheckboxRadioInputText error={error} scale={scale}>
      {text}
    </CheckboxRadioInputText>
    <Input
      disabled={disabled}
      name={name}
      type={type}
      checked={checked}
      onChange={onChange}
    />
  </CheckboxRadioInputWithLabelContainer>
);
