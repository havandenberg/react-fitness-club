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
  resetForm: () => void,
  fields: FormFields,
) => void;

export interface FormFieldValidations<FormFields> {
  [index: string]: (value: string, fields: FormFields) => boolean;
}

type FormComponentProps<FormFields> = {
  completed: boolean;
  errors: string[];
  failed: boolean;
  loading: boolean;
  fields: FormFields;
} & Handlers<FormFields>;

interface Props<FormFields> {
  errorMessage: string | React.ReactNode;
  fieldValidations: FormFieldValidations<FormFields>;
  fieldChangeValidations: FormFieldValidations<FormFields>;
  FormComponent: React.ComponentType<FormComponentProps<FormFields>>;
  handleSubmit: FormSubmit<FormFields>;
  initialValues: FormFields;
  id: string;
  resetText?: string;
  submitText?: string;
  successMessage: string | React.ReactNode;
  validationErrorMessage: string | React.ReactNode;
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
  static defaultProps = {
    errorMessage: 'Please try again.',
    fieldChangeValidations: [],
    fieldValidations: [],
    successMessage: 'Success!',
    validationErrorMessage:
      'Please correct the fields highlighted below and try again.',
  };

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
    this.setState({
      ...initialState,
      failed: true,
      fields: this.props.initialValues,
    });
    console.log(error);
  };

  handleSuccess = () =>
    this.setState({
      ...initialState,
      completed: true,
      fields: this.props.initialValues,
    });

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
        handleSubmit(
          this.handleSuccess,
          this.handleFail,
          this.resetForm,
          fields,
        ),
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
      if (validateField && !validateField(fields[fieldKey], fields)) {
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
    const { fields } = this.state;
    const validateChange = this.props.fieldChangeValidations[`${field}`];
    if (!validateChange || validateChange(value, fields)) {
      this.setState({ fields: R.merge(fields, { [field]: value }) }, callback);
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
      validationErrorMessage,
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
              {validationErrorMessage}
            </t.Text>
          )}
          <FormComponent
            completed={completed}
            errors={errors}
            failed={failed}
            loading={loading}
            onChange={this.onChange}
            fields={fields}
          />
        </div>
        <l.FlexCentered mt={spacing.xl}>
          {loading ? (
            <PulseLoader sizeUnit="px" size={30} color={colors.red} />
          ) : (
            <l.FlexCentered>
              {(failed || this.hasErrors()) && (
                <ButtonSecondary mr={spacing.xl} onClick={this.resetForm}>
                  {resetText || 'Reset'}
                </ButtonSecondary>
              )}
              <ButtonPrimary type="submit">
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
