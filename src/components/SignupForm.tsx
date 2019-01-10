import * as R from 'ramda';
import * as React from 'react';
import l from '../styles/layout';
import { spacing } from '../styles/theme';
import { signup } from '../utils/auth';
import {
  containsLowercase,
  containsNumber,
  containsUppercase,
  enoughCharacters,
  isValidEmail,
  isValidPassword,
} from '../utils/validation';
import Form, {
  FormComponentProps,
  FormFieldValidations,
  FormStep,
} from './Form';
import FormActions from './Form/Actions';
import FormRow, { FormRowData } from './Form/Row';
import withSubscribe, { SubscribeProps } from './hoc/withSubscribe';

interface SignupFields {
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const signupFieldValidations: FormFieldValidations<SignupFields> = {
  confirmPassword: (value: string, fields: SignupFields) =>
    !R.isEmpty(value) && R.equals(value, fields.password),
  email: (value: string) => isValidEmail(value),
  firstName: (value: string) => !R.isEmpty(value),
  lastName: (value: string) => !R.isEmpty(value),
  password: (value: string) => isValidPassword(value),
};

const initialValues = {
  confirmPassword: '',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

const formRowData: Array<FormRowData<SignupFields>> = [
  {
    isRequired: true,
    items: [
      {
        flex: '50%',
        helpText: 'first',
        inputType: 'text',
        valueName: 'firstName',
      },
      {
        flex: '50%',
        helpText: 'last',
        inputType: 'text',
        valueName: 'lastName',
      },
    ],
    label: 'Name',
    rowWidth: ['100%', '65%'],
  },
  {
    isRequired: true,
    items: [
      {
        flex: '100%',
        helpText: 'username@example.com',
        inputType: 'text',
        valueName: 'email',
      },
    ],
    label: 'Email',
    rowWidth: ['100%', '65%'],
  },
  {
    isRequired: true,
    items: [
      {
        flex: '100%',
        helpText: ['1 lowercase', '1 uppercase', '1 number', '8+ characters'],
        helpTextValidations: [
          containsLowercase,
          containsUppercase,
          containsNumber,
          enoughCharacters,
        ],
        inputType: 'password',
        valueName: 'password',
      },
    ],
    label: 'Password',
    rowWidth: ['100%', '65%'],
  },
  {
    isRequired: true,
    items: [
      {
        flex: '100%',
        helpText: 'must match password',
        inputType: 'password',
        valueName: 'confirmPassword',
      },
    ],
    label: 'Confirm Password',
    rowWidth: ['100%', '65%'],
  },
];

class Step extends React.Component<
  FormComponentProps<SignupFields> & SubscribeProps
> {
  handleSubmit = (
    onSuccess: () => void,
    onFail: (error: Error, msg?: string) => void,
    resetForm: () => void,
    data: any,
  ) => {
    const { subscribe } = this.props;
    const { email, firstName, lastName, password } = data;
    signup(subscribe, email, firstName, lastName, password, onFail);
  };

  render() {
    const { errors, fields, onChange, onSubmit } = this.props;
    return (
      <div>
        {formRowData.map(
          (rowItem: FormRowData<SignupFields>, index: number) => (
            <React.Fragment key={`row-${index}`}>
              <FormRow<SignupFields>
                {...rowItem}
                customStyles={{
                  labelWidth: ['200', '200', '225px'],
                  rowWidth: rowItem.rowWidth,
                }}
                errors={errors}
                fields={fields}
                fieldValidations={signupFieldValidations}
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
          handleForward={(e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(this.handleSubmit);
          }}
          forwardText="Sign up"
        />
      </div>
    );
  }
}

const formData: Array<FormStep<SignupFields>> = [
  { label: '', FormComponent: Step, rowItems: formRowData },
];

class SignupForm extends Form<SignupFields> {}

class SignupFormComponent extends React.Component<SubscribeProps> {
  render() {
    const { subscribe } = this.props;
    return (
      <l.Flex mx="auto" width={['100%', '95%', '80%']}>
        <SignupForm
          errorMessage="Please try again."
          id="signup-form"
          initialValues={initialValues}
          isEditing
          fieldValidations={signupFieldValidations}
          steps={formData}
          stepProps={{ subscribe }}
          successMessage="Success!"
        />
      </l.Flex>
    );
  }
}

export default withSubscribe(SignupFormComponent);
