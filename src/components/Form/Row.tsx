import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { width } from 'styled-system';
import l from '../../styles/layout';
import { breakpoints, colors, fontSizes, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { isMobile, isMobileOnly } from '../../utils/screensize';
import FileInput from './FileInput';
import { FormFieldValidations, OnChangeHandler } from './index';
import { InputType, SelectInput, TextArea, TextInput } from './Input';

export const InputLabel = styled(t.Text)(
  {
    fontSize: fontSizes.largeText,
    fontWeight: 'bold',
    marginRight: spacing.xxl,
    marginTop: spacing.s,
    textAlign: isMobileOnly() ? 'left' : 'right',
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

export interface FormItemProps<FormFields, K extends keyof FormFields> {
  autoComplete?: string;
  flex: string | number | Array<string | number>;
  helpText?: string | string[];
  helpTextValidations?: Array<(value: string, fields: FormFields) => boolean>;
  inputStyles?: React.CSSProperties;
  inputType: InputType;
  isViewOnly?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  selectOptions?: string[];
  valueName: K;
  viewOnlyText?: string;
}

export interface FormRowData<FormFields> {
  isRequired?: boolean;
  items: Array<FormItemProps<FormFields, keyof FormFields>>;
  label?: string;
  rowWidth?: string | number | Array<string | number>;
}

interface FormRowProps<FormFields> extends FormRowData<FormFields> {
  customStyles: {
    labelWidth?: string | number | Array<string | number>;
    rowWidth?: string | number | Array<string | number>;
  };
  errors: string[];
  fields: FormFields;
  fieldValidations: FormFieldValidations<FormFields>;
  isEditing: boolean;
  onChange: OnChangeHandler<FormFields>;
}

class FormRow<FormFields> extends React.Component<FormRowProps<FormFields>> {
  static defaultProps = {
    customStyles: { labelWidth: '20%', rowWidth: '100%' },
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
      case 'file':
        return (
          <FileInput
            error={hasError}
            fileUrl={`${fields[item.valueName]}`}
            onChange={(fileUrl: string) => {
              onChange(item.valueName, fileUrl);
            }}
          />
        );
      case 'password':
      case 'text':
        return (
          <TextInput
            autoComplete={item.autoComplete}
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
            autoComplete={item.autoComplete}
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
            autoComplete={item.autoComplete}
            error={hasError}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              onChange(item.valueName, e.currentTarget.value);
            }}
            customStyles={item.inputStyles}
            value={fields[item.valueName]}
            width="100%">
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
      isEditing,
      isRequired,
      items,
      label,
      customStyles,
      onChange,
    } = this.props;
    return (
      <l.Flex
        alignTop
        columnOnMobile
        mt={R.isEmpty(items) ? spacing.ml : undefined}>
        {label !== undefined && (
          <InputLabel nowrap={!isMobile()} width={customStyles.labelWidth}>
            {label}
            {isRequired && <l.Red>*</l.Red>}
            {label && !R.isEmpty(items) && ':'}
          </InputLabel>
        )}
        <l.Flex
          flex={1}
          maxWidth={customStyles.rowWidth}
          width={customStyles.rowWidth}>
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
              const editing = isEditing && !item.isViewOnly;
              return (
                <React.Fragment key={`${item.valueName}`}>
                  <l.FlexColumn alignTop width={item.flex}>
                    {editing ? (
                      this.getInputComponent(item, hasError, onChange)
                    ) : (
                      <t.Text large mt={spacing.s}>{`${
                        fields[item.valueName]
                      }`}</t.Text>
                    )}
                    <l.Space height={spacing.s} />
                    {item.helpText && Array.isArray(item.helpText) ? (
                      <l.Flex>
                        {item.helpText.map(
                          (helpTextItem: string, helpIndex: number) => (
                            <React.Fragment key={helpTextItem}>
                              <t.HelpText
                                valid={this.validateHelpText(item, helpIndex)}>
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
                    ) : editing ? (
                      <t.HelpText valid={isValid}>
                        {item.helpText}
                        {item.isRequired && <l.Red>*</l.Red>}
                      </t.HelpText>
                    ) : (
                      <>
                        <t.HelpText>{item.viewOnlyText}</t.HelpText>
                        <l.Space height={spacing.s} />
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
