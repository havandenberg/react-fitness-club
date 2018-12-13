import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import l from '../../styles/layout';
import { breakpoints, colors, fontSizes, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { isTabletUp } from '../../utils/screensize';
import { FormFieldValidations, OnChangeHandler } from './index';
import { TextInput } from './Input';

const InputLabel = styled(t.Text)(
  {
    fontSize: fontSizes.largeText,
    fontWeight: 'bold',
    marginRight: spacing.xxl,
    marginTop: spacing.s,
    textAlign: 'right',
    width: '30%',
    [breakpoints.tablet]: {
      fontSize: fontSizes.text,
      width: '20%',
    },
    [breakpoints.mobile]: {
      fontSize: fontSizes.text,
      marginBottom: spacing.sm,
      width: 'auto',
    },
  },
  ({ error }: { error?: boolean }) => ({
    color: error ? colors.red : colors.black,
  }),
);

interface FormItemProps<FormFields, K extends keyof FormFields> {
  flex: string | number;
  helpText?: string;
  valueName: K;
  isRequired?: boolean;
}

export interface FormRowData<FormFields> {
  isRequired?: boolean;
  items: Array<FormItemProps<FormFields, keyof FormFields>>;
  label: string;
}

interface FormRowProps<FormFields> extends FormRowData<FormFields> {
  errors: string[];
  fields: FormFields;
  fieldValidations: FormFieldValidations;
  onChange: OnChangeHandler<FormFields>;
}

class FormRow<FormFields> extends React.Component<FormRowProps<FormFields>> {
  render() {
    const {
      errors,
      fields,
      fieldValidations,
      isRequired,
      items,
      label,
      onChange,
    } = this.props;
    return (
      <l.Flex alignTop columnOnMobile>
        {(label || isTabletUp()) && (
          <InputLabel nowrap>
            {label}
            {isRequired && <l.Red>*</l.Red>}
            {label && ':'}
          </InputLabel>
        )}
        <l.Flex flex="80%" width="100%">
          {items.map(
            (
              item: FormItemProps<FormFields, keyof FormFields>,
              index: number,
            ) => {
              const hasError = R.contains(`${item.valueName}`, errors);
              const validateField = fieldValidations[`${item.valueName}`];
              const value = fields[item.valueName];
              const isValid = validateField ? validateField(`${value}`) : true;
              return (
                <React.Fragment key={`${item.valueName}`}>
                  <l.FlexColumn alignTop flex={item.flex}>
                    <TextInput
                      error={hasError && !isValid}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(item.valueName, e.currentTarget.value);
                      }}
                      value={value}
                      width="100%"
                    />
                    {item.helpText && (
                      <>
                        <l.Space height={spacing.s} />
                        <t.HelpText valid={isValid}>{item.helpText}</t.HelpText>
                      </>
                    )}
                  </l.FlexColumn>
                  {index + 1 < items.length && (
                    <l.Space width={[spacing.ml, spacing.xl]} />
                  )}
                </React.Fragment>
              );
            },
          )}
        </l.Flex>
      </l.Flex>
    );
  }
}

export default FormRow;
