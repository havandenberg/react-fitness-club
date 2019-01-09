import * as R from 'ramda';
import * as React from 'react';
import { auth } from '../firebase';
import l from '../styles/layout';
import { spacing } from '../styles/theme';
import { isValidEmail } from '../utils/validation';
import Form, {
  FormComponentProps,
  FormFieldValidations,
  FormStep,
} from './Form';
import FormActions from './Form/Actions';
import FormRow, { FormRowData } from './Form/Row';

interface LoginFields {
  email: string;
  password: string;
}
const loginFieldValidations: FormFieldValidations<LoginFields> = {
  email: (value: string) => isValidEmail(value),
  password: (value: string) => !R.isEmpty(value),
};

const initialValues = {
  email: '',
  password: '',
};

const formRowData: Array<FormRowData<LoginFields>> = [
  {
    items: [
      {
        flex: '100%',
        inputType: 'text',
        valueName: 'email',
      },
    ],
    label: 'Email',
  },
  {
    items: [
      {
        flex: '100%',
        inputType: 'password',
        valueName: 'password',
      },
    ],
    label: 'Password',
  },
];

class Step extends React.Component<FormComponentProps<LoginFields>> {
  handleSubmit = (
    onSuccess: () => void,
    onFail: (error: Error, msg?: string) => void,
    resetForm: () => void,
    data: any,
  ) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(onSuccess)
      .catch((error: Error) => {
        onFail(error, error.message);
      });
  };

  render() {
    const { errors, failed, fields, onChange, onSubmit } = this.props;
    return (
      <div>
        {formRowData.map((rowItem: FormRowData<LoginFields>, index: number) => (
          <React.Fragment key={`row-${index}`}>
            <FormRow<LoginFields>
              {...rowItem}
              errors={failed ? ['email', 'password'] : errors}
              fields={fields}
              fieldValidations={loginFieldValidations}
              isEditing
              onChange={onChange}
            />
            {index + 1 < formRowData.length && (
              <l.Space height={[spacing.ml, spacing.xl]} />
            )}
          </React.Fragment>
        ))}
        <FormActions
          handleForward={(e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(this.handleSubmit);
          }}
          forwardText="Login"
        />
      </div>
    );
  }
}

const formData: Array<FormStep<LoginFields>> = [
  { label: '', FormComponent: Step, rowItems: formRowData },
];

class LoginForm extends Form<LoginFields> {}

class LoginFormComponent extends React.Component {
  render() {
    return (
      <l.Flex mx="auto" width={['100%', '85%', '60%']}>
        <LoginForm
          errorMessage="Invalid credentials, please try again."
          id="login-form"
          initialValues={initialValues}
          isEditing
          fieldValidations={loginFieldValidations}
          steps={formData}
        />
      </l.Flex>
    );
  }
}

export default LoginFormComponent;
