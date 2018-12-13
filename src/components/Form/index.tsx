import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { PulseLoader } from 'react-spinners';
import { width } from 'styled-system';
import l from '../../styles/layout';
import { colors, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { scrollToId } from '../../utils/scroll';
import { ButtonPrimary, ButtonSecondary } from './Button';

const FormWrapper = styled('form')(width);

export type OnChangeHandler<FormFields> = <K extends keyof FormFields>(
  s: K,
  a: any,
  callback?: () => void,
) => void;

interface Handlers<FormFields> {
  onChange: OnChangeHandler<FormFields>;
}

export type FormSubmit<FormFields> = (
  onSuccess: () => void,
  onFail: (error: Error) => void,
  fields: FormFields,
) => void;

export interface FormFieldValidations {
  [index: string]: (value: string) => boolean;
}

type FormComponentProps<FormFields> = {
  errors: string[];
  fields: FormFields;
} & Handlers<FormFields>;

interface Props<FormFields> {
  errorMessage: string;
  fieldValidations: FormFieldValidations;
  fieldChangeValidations: FormFieldValidations;
  FormComponent: React.ComponentType<FormComponentProps<FormFields>>;
  handleSubmit: FormSubmit<FormFields>;
  initialValues: FormFields;
  id: string;
  resetText?: string;
  submitText?: string;
  successMessage: string;
}

interface State<FormFields> {
  completed: boolean;
  errors: string[];
  failed: boolean;
  fields: FormFields;
  loading: boolean;
}

const initialState = {
  completed: false,
  errors: [],
  failed: false,
  loading: false,
};

class Form<FormFields> extends React.Component<
  Props<FormFields>,
  State<FormFields>
> {
  constructor(props: Props<FormFields>) {
    super(props);
    this.state = {
      ...initialState,
      fields: props.initialValues,
    };
  }

  componentWillReceiveProps(nextProps: Props<FormFields>) {
    if (!R.equals(nextProps.initialValues, this.props.initialValues)) {
      this.setState({ fields: nextProps.initialValues });
    }
    if (this.props.id !== nextProps.id) {
      this.setState({ fields: nextProps.initialValues });
    }
  }

  handleFail = (error: Error) => {
    this.setState({ failed: true, loading: false });
    console.log(error);
  };

  handleSuccess = () =>
    this.setState(
      R.merge(this.props.initialValues, {
        completed: true,
        loading: false,
      }),
    );

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { handleSubmit } = this.props;
    const { fields, loading } = this.state;
    this.setState({ completed: false, failed: false });

    const isValid = this.validate();

    if (!isValid) {
      scrollToId(this.props.id);
      return;
    }

    if (!loading && isValid) {
      this.setState({ loading: true }, () =>
        handleSubmit(this.handleSuccess, this.handleFail, fields),
      );
    }
  };

  hasErrors = () => {
    return !R.isEmpty(this.state.errors);
  };

  resetForm = () => {
    this.setState({ ...initialState, fields: this.props.initialValues });
  };

  validate = () => {
    const { fields } = this.state;
    const errors: string[] = [];
    Object.keys(fields).map(fieldKey => {
      const validateField = this.props.fieldValidations[fieldKey];
      if (validateField && !validateField(fields[fieldKey])) {
        errors.push(fieldKey);
      }
    });
    this.setState({ errors });
    return R.isEmpty(errors);
  };

  onChange: OnChangeHandler<FormFields> = (
    field,
    value,
    callback = () => ({}),
  ) => {
    const validateChange = this.props.fieldChangeValidations[`${field}`];
    if (!validateChange || validateChange(value)) {
      this.setState(
        { fields: R.merge(this.state.fields, { [field]: value }) },
        callback,
      );
    }
  };

  render() {
    const {
      errorMessage,
      id,
      FormComponent,
      resetText,
      submitText,
      successMessage,
    } = this.props;
    const { completed, errors, failed, fields, loading } = this.state;

    return (
      <FormWrapper id={id} onSubmit={this.handleSubmit} width="100%">
        {completed && !failed && (
          <t.Text
            center
            color={colors.green}
            large
            mb={[spacing.ml, spacing.xl]}
          >
            {successMessage}
          </t.Text>
        )}
        {!completed && failed && (
          <t.Text center color={colors.red} large mb={[spacing.ml, spacing.xl]}>
            {errorMessage}
          </t.Text>
        )}
        <div>
          {this.hasErrors() && (
            <t.Text center color={colors.red} mb={[spacing.ml, spacing.xl]}>
              Please correct the fields highlighted below and try again.
            </t.Text>
          )}
          <FormComponent
            errors={errors}
            onChange={this.onChange}
            fields={fields}
          />
        </div>
        <l.FlexCentered mt={spacing.xl}>
          {loading ? (
            <PulseLoader sizeUnit="px" size={30} color={colors.red} />
          ) : (
            <l.FlexCentered columnRevOnMobile>
              {(failed || this.hasErrors()) && (
                <ButtonSecondary mr={[0, spacing.xl]} onClick={this.resetForm}>
                  {resetText || 'Reset'}
                </ButtonSecondary>
              )}
              <ButtonPrimary mb={[spacing.ml, 0]} type="submit">
                {submitText || 'Submit'}
              </ButtonPrimary>
            </l.FlexCentered>
          )}
        </l.FlexCentered>
      </FormWrapper>
    );
  }
}
export default Form;
