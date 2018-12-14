import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { width } from 'styled-system';
import l from '../../styles/layout';
import { breakpoints, colors, fontSizes, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { FormFieldValidations, OnChangeHandler } from './index';
import { InputType, SelectInput, TextArea, TextInput } from './Input';

const InputLabel = styled(t.Text)(
  {
    fontSize: fontSizes.largeText,
    fontWeight: 'bold',
    marginRight: spacing.xxl,
    marginTop: spacing.s,
    textAlign: 'right',
    [breakpoints.tablet]: {
      fontSize: fontSizes.text,
    },
    [breakpoints.mobile]: {
      fontSize: fontSizes.text,
      marginBottom: spacing.sm,
    },
  },
  ({ error }: { error?: boolean }) => ({
    color: error ? colors.red : colors.black,
  }),
  width,
);

interface FormItemProps<FormFields, K extends keyof FormFields> {
  flex: string | number;
  helpText?: string | string[];
  helpTextValidations?: Array<(value: string, fields: FormFields) => boolean>;
  inputStyles?: React.CSSProperties;
  inputType: InputType;
  isRequired?: boolean;
  placeholder?: string;
  selectOptions?: string[];
  valueName: K;
}

export interface FormRowData<FormFields> {
  isRequired?: boolean;
  items: Array<FormItemProps<FormFields, keyof FormFields>>;
  label?: string;
}

interface FormRowProps<FormFields> extends FormRowData<FormFields> {
  customStyles: {
    labelsWidth?: string;
  };
  errors: string[];
  fields: FormFields;
  fieldValidations: FormFieldValidations<FormFields>;
  onChange: OnChangeHandler<FormFields>;
}

class FormRow<FormFields> extends React.Component<FormRowProps<FormFields>> {
  static defaultProps = {
    customStyles: {},
    fieldValidations: [],
  };

  getInputComponent = (
    item: FormItemProps<FormFields, keyof FormFields>,
    hasError: boolean,
    onChange: OnChangeHandler<FormFields>,
  ) => {
    const { fields } = this.props;
    const { inputType } = item;
    switch (inputType) {
      case 'password':
      case 'text':
        return (
          <TextInput
            error={hasError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange(item.valueName, e.currentTarget.value);
            }}
            placeholder={item.placeholder}
            customStyles={item.inputStyles}
            type={inputType}
            value={fields[item.valueName]}
            width="100%"
          />
        );
      case 'textarea':
        return (
          <TextArea
            error={hasError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange(item.valueName, e.currentTarget.value);
            }}
            placeholder={item.placeholder}
            customStyles={item.inputStyles}
            value={fields[item.valueName]}
            width="100%"
          />
        );
      case 'select':
        return item.selectOptions ? (
          <SelectInput
            error={hasError}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              onChange(item.valueName, e.currentTarget.value);
            }}
            customStyles={item.inputStyles}
            value={fields[item.valueName]}
            width="100%"
          >
            {item.selectOptions.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        ) : (
          <div />
        );
      default:
        return <div />;
    }
  };

  validateHelpText = (
    item: FormItemProps<FormFields, keyof FormFields>,
    index: number,
  ) => {
    const { fields } = this.props;
    const validateHelpTextFunc =
      item.helpTextValidations && item.helpTextValidations[index];
    return validateHelpTextFunc
      ? validateHelpTextFunc(`${fields[item.valueName]}`, fields)
      : true;
  };

  render() {
    const {
      errors,
      fields,
      fieldValidations,
      isRequired,
      items,
      label,
      customStyles,
      onChange,
    } = this.props;
    return (
      <l.Flex alignTop columnOnMobile>
        {label !== undefined && (
          <InputLabel
            nowrap
            width={['auto', customStyles.labelsWidth || '20%']}
          >
            {label}
            {isRequired && <l.Red>*</l.Red>}
            {label && ':'}
          </InputLabel>
        )}
        <l.Flex flex={1} width="100%">
          {items.map(
            (
              item: FormItemProps<FormFields, keyof FormFields>,
              index: number,
            ) => {
              const validateField = fieldValidations[`${item.valueName}`];
              const isValid = validateField
                ? validateField(`${fields[item.valueName]}`, fields)
                : true;
              const hasError =
                R.contains(`${item.valueName}`, errors) &&
                (!validateField || !isValid);
              return (
                <React.Fragment key={`${item.valueName}`}>
                  <l.FlexColumn alignTop flex={item.flex}>
                    {this.getInputComponent(item, hasError, onChange)}
                    <l.Space height={spacing.s} />
                    {item.helpText && Array.isArray(item.helpText) ? (
                      <l.Flex>
                        {item.helpText.map(
                          (helpTextItem: string, helpIndex: number) => (
                            <React.Fragment key={helpTextItem}>
                              <t.HelpText
                                valid={this.validateHelpText(item, helpIndex)}
                              >
                                {helpTextItem}
                              </t.HelpText>
                              {item.helpText &&
                                helpIndex + 1 < item.helpText.length && (
                                  <t.HelpText>,&nbsp;</t.HelpText>
                                )}
                            </React.Fragment>
                          ),
                        )}
                      </l.Flex>
                    ) : (
                      <t.HelpText valid={isValid}>
                        {item.helpText}
                        {item.isRequired && <l.Red>*</l.Red>}
                      </t.HelpText>
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
