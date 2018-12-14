import * as R from 'ramda';
import * as React from 'react';
import { auth } from '../firebase';
import l from '../styles/layout';
import { spacing } from '../styles/theme';
import { isValidEmail } from '../utils/validation';
import Form, { FormFieldValidations } from './Form';
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
        flex: '50%',
        inputType: 'text',
        valueName: 'email',
      },
    ],
    label: 'Email',
  },
  {
    items: [
      {
        flex: '50%',
        inputType: 'password',
        valueName: 'password',
      },
    ],
    label: 'Password',
  },
];

class LoginForm extends Form<LoginFields> {}

class LoginFormComponent extends React.Component {
  handleSubmit = (
    onSuccess: () => void,
    onFail: (error: Error) => void,
    resetForm: () => void,
    data: any,
  ) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(onSuccess)
      .catch((error: Error) => {
        onFail(error);
      });
  };

  render() {
    return (
      <l.Flex mx="auto" width={['100%', '85%', '60%']}>
        <LoginForm
          errorMessage="Invalid credentials, please try again."
          id="login-form"
          initialValues={initialValues}
          handleSubmit={this.handleSubmit}
          fieldValidations={loginFieldValidations}
          FormComponent={({ errors, failed, fields, onChange }) => (
            <div>
              {formRowData.map(
                (rowItem: FormRowData<LoginFields>, index: number) => (
                  <React.Fragment key={`row-${index}`}>
                    <FormRow<LoginFields>
                      {...rowItem}
                      errors={failed ? ['email', 'password'] : errors}
                      fields={fields}
                      fieldValidations={loginFieldValidations}
                      onChange={onChange}
                    />
                    {index + 1 < formRowData.length && (
                      <l.Space height={[spacing.ml, spacing.xl]} />
                    )}
                  </React.Fragment>
                ),
              )}
            </div>
          )}
          submitText="Login"
        />
      </l.Flex>
    );
  }
}

export default LoginFormComponent;
