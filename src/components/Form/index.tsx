import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { width } from 'styled-system';
import l from '../../styles/layout';
import { breakpoints, colors, spacing, transitions } from '../../styles/theme';
import t from '../../styles/typography';
import { isMobile, isMobileOnly } from '../../utils/screensize';
import { scrollToId } from '../../utils/scroll';
import { FormRowData } from './Row';

const FormWrapper = styled('form')(width);

const NavItem = styled(t.Text)(
  ({
    active,
    enableDirectStepNav,
  }: {
    active?: boolean;
    enableDirectStepNav?: boolean;
  }) => ({
    ':hover': {
      color: enableDirectStepNav ? colors.red : undefined,
    },
    color: active ? colors.red : `${colors.red}80`,
    cursor: enableDirectStepNav ? 'pointer' : 'default',
    transition: transitions.default,
  }),
);

const NavSeparator = styled('div')({
  background: colors.red,
  borderRadius: '50%',
  height: spacing.s,
  margin: `0 ${spacing.xl}`,
  width: spacing.s,
  [breakpoints.mobile]: {
    margin: `0 ${spacing.s}`,
  },
});

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

export type FormComponentProps<FormFields> = {
  completed: boolean;
  errors: string[];
  failed: boolean;
  loading: boolean;
  fields: FormFields;
  onBack: (e: React.FormEvent) => void;
  onForward: (e: React.FormEvent) => void;
  onSubmit: (submit: FormSubmit<FormFields>) => void;
  validate: () => boolean;
} & Handlers<FormFields>;

export interface FormStep<FormFields> {
  customStyles?: {
    labelWidth?: string;
  };
  label: string;
  FormComponent: React.ComponentType<FormComponentProps<FormFields>>;
  rowItems: Array<FormRowData<FormFields>>;
}

interface Props<FormFields> {
  enableDirectStepNav?: boolean;
  errorMessage: string | React.ReactNode;
  fieldValidations: FormFieldValidations<FormFields>;
  fieldChangeValidations: FormFieldValidations<FormFields>;
  initialValues: FormFields;
  isEditing: boolean;
  id: string;
  steps: Array<FormStep<FormFields>>;
  stepProps?: object;
  successMessage: string | React.ReactNode;
  validationErrorMessage: string | React.ReactNode;
}

interface State<FormFields> {
  completed: boolean;
  errors: string[];
  failed: boolean;
  fields: FormFields;
  loading: boolean;
  currentStep: string;
  onFailMessage?: string;
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
  stepComponent = React.createRef<
    React.ComponentType<FormComponentProps<FormFields>>
  >();

  constructor(props: Props<FormFields>) {
    super(props);

    const { initialValues, steps } = props;

    this.state = {
      ...initialState,
      currentStep: steps && !R.isEmpty(steps) ? steps[0].label : '',
      fields: initialValues,
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

  getStepData = (step: string) => {
    return R.find(R.propEq('label', step), this.props.steps);
  };

  handleBack = (e: React.FormEvent) => {
    e.preventDefault();
    const { steps } = this.props;
    const { currentStep } = this.state;
    const lastStep =
      steps[R.findIndex(R.propEq('label', currentStep), steps) - 1];

    this.setState({
      ...initialState,
      currentStep: lastStep ? lastStep.label : currentStep,
    });

    this.resetScroll();
  };

  handleForward = (e: React.FormEvent) => {
    e.preventDefault();
    const { steps } = this.props;
    const { currentStep } = this.state;

    if (this.validate()) {
      this.setState({
        currentStep:
          steps[R.findIndex(R.propEq('label', currentStep), steps) + 1].label,
      });
    }

    this.resetScroll();
  };

  handleFail = (error: Error, onFailMessage?: string) => {
    this.setState({
      ...initialState,
      failed: true,
      fields: this.props.initialValues,
      onFailMessage,
    });
    console.log(error);
  };

  handleSuccess = () =>
    this.setState({
      ...initialState,
      completed: true,
      fields: this.props.initialValues,
    });

  handleSubmit = (
    submit: (
      onSuccess: () => void,
      onFail: (error: Error) => void,
      resetForm: () => void,
      fields: FormFields,
    ) => void,
  ) => {
    const { fields, loading } = this.state;

    this.setState({ completed: false, failed: false });

    const isValid = this.validateAll();

    if (!isValid) {
      this.resetScroll();
      return;
    }

    if (!loading && isValid) {
      this.setState({ loading: true }, () => {
        submit(this.handleSuccess, this.handleFail, this.resetForm, fields);
      });
    }
  };

  hasErrors = () => {
    return !R.isEmpty(this.state.errors);
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

  resetForm = () => {
    this.setState({ ...initialState, fields: this.props.initialValues });
  };

  resetScroll = () => scrollToId(this.props.id, { offset: -200 });

  setStep = (currentStep: string) => this.setState({ currentStep });

  validate = () => {
    const { fields, currentStep } = this.state;
    const errors: string[] = [];

    const items: any = R.flatten(
      R.pluck('items', this.getStepData(currentStep).rowItems),
    );
    const fieldsToValidate: string[] = R.isEmpty(currentStep)
      ? Object.keys(fields)
      : R.pluck('valueName', items);

    fieldsToValidate.map(fieldKey => {
      const validateField = this.props.fieldValidations[fieldKey];
      if (validateField && !validateField(fields[fieldKey], fields)) {
        errors.push(fieldKey);
      }
    });

    this.setState({ errors });

    const isValid = R.isEmpty(errors);

    if (!isValid) {
      this.resetScroll();
    }

    return isValid;
  };

  validateAll = () => {
    const { fields } = this.state;
    const errors: string[] = [];

    Object.keys(fields).map(fieldKey => {
      const validateField = this.props.fieldValidations[fieldKey];
      if (validateField && !validateField(fields[fieldKey], fields)) {
        errors.push(fieldKey);
      }
    });

    this.setState({ errors });

    const isValid = R.isEmpty(errors);

    if (!isValid) {
      this.resetScroll();
    }

    return isValid;
  };

  render() {
    const {
      enableDirectStepNav,
      errorMessage,
      id,
      steps,
      stepProps,
      successMessage,
      validationErrorMessage,
    } = this.props;
    const {
      completed,
      currentStep,
      errors,
      failed,
      fields,
      loading,
      onFailMessage,
    } = this.state;

    const currentStepData = this.getStepData(currentStep);

    return (
      <FormWrapper width="100%">
        {steps.length > 1 && (
          <l.FlexCentered
            mb={spacing.xxxl}
            width={['100%', '80%', '100%']}
            mx="auto"
          >
            {steps.map((s, index: number) => (
              <React.Fragment key={s.label}>
                <NavItem
                  active={s.label === currentStep}
                  center={isMobile()}
                  enableDirectStepNav={enableDirectStepNav}
                  large
                  onClick={() => enableDirectStepNav && this.setStep(s.label)}
                  width={
                    isMobile() ? `${Math.floor(100 / steps.length)}%` : 'auto'
                  }
                >
                  {s.label}
                </NavItem>
                {index + 1 < steps.length && !isMobileOnly() && (
                  <NavSeparator />
                )}
              </React.Fragment>
            ))}
          </l.FlexCentered>
        )}
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
          <t.Text
            center
            color={colors.red}
            large
            mb={[spacing.ml, spacing.xl]}
            mx="auto"
            width="75%"
          >
            {onFailMessage || errorMessage}
          </t.Text>
        )}
        <div id={id}>
          {this.hasErrors() && (
            <t.Text center color={colors.red} mb={[spacing.ml, spacing.xl]}>
              {validationErrorMessage}
            </t.Text>
          )}
          {currentStepData.FormComponent && (
            <currentStepData.FormComponent
              completed={completed}
              errors={errors}
              failed={failed}
              fields={fields}
              loading={loading}
              onChange={this.onChange}
              onBack={this.handleBack}
              onForward={this.handleForward}
              onSubmit={this.handleSubmit}
              validate={this.validate}
              ref={(
                ref: React.RefObject<
                  React.ComponentType<FormComponentProps<FormFields>>
                >,
              ) => (this.stepComponent = ref)}
              {...stepProps}
            />
          )}
        </div>
      </FormWrapper>
    );
  }
}

export default Form;
