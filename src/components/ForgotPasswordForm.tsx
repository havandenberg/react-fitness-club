import * as React from 'react';
import l from '../styles/layout';
import { spacing } from '../styles/theme';
import { sendForgotPasswordEmail } from '../utils/auth';
import { isValidEmail } from '../utils/validation';
import Form, {
  FormComponentProps,
  FormFieldValidations,
  FormStep,
} from './Form';
import FormActions from './Form/Actions';
import FormRow, { FormRowData } from './Form/Row';

interface ForgotPasswordFields {
  email: string;
}

const forgotPasswordValidations: FormFieldValidations<ForgotPasswordFields> = {
  email: (value: string) => isValidEmail(value),
};

const initialValues = {
  email: '',
};

const formRowData: Array<FormRowData<ForgotPasswordFields>> = [
  {
    items: [
      {
        autoComplete: 'email',
        flex: '100%',
        inputType: 'text',
        valueName: 'email',
      },
    ],
    label: 'Email',
  },
];
interface StepProps {
  onBack: () => void;
}

class Step extends React.Component<
  StepProps & FormComponentProps<ForgotPasswordFields>
> {
  handleSubmit = (
    onSuccess: () => void,
    onFail: (error: Error, msg?: string) => void,
    resetForm: () => void,
    data: any,
  ) => {
    sendForgotPasswordEmail(data.email);
    if (this.props.validateAll()) {
      resetForm();
    }
  };

  render() {
    const { errors, failed, fields, onBack, onChange, onSubmit } = this.props;
    return (
      <div>
        {formRowData.map(
          (rowItem: FormRowData<ForgotPasswordFields>, index: number) => (
            <React.Fragment key={`row-${index}`}>
              <FormRow<ForgotPasswordFields>
                {...rowItem}
                errors={failed ? ['email'] : errors}
                fields={fields}
                fieldValidations={forgotPasswordValidations}
                isEditing
                onChange={onChange}
              />
              {index + 1 < formRowData.length && (
                <l.Space height={[spacing.ml, spacing.xl]} />
              )}
            </React.Fragment>
          ),
        )}
        <FormActions
          handleBack={onBack}
          handleForward={(e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(this.handleSubmit);
          }}
          forwardText="Send"
        />
      </div>
    );
  }
}

const formData: Array<FormStep<ForgotPasswordFields>> = [
  { label: '', FormComponent: Step, rowItems: formRowData },
];

class ForgotPasswordForm extends Form<ForgotPasswordFields> {}

class ForgotPasswordFormComponent extends React.Component<StepProps> {
  render() {
    const { onBack } = this.props;
    return (
      <l.Flex mx="auto" width={['100%', '85%', '60%']}>
        <ForgotPasswordForm
          errorMessage="Invalid email, please try again."
          id="forgot-password-form"
          initialValues={initialValues}
          isEditing
          fieldValidations={forgotPasswordValidations}
          steps={formData}
          stepProps={{ onBack }}
        />
      </l.Flex>
    );
  }
}

export default ForgotPasswordFormComponent;
