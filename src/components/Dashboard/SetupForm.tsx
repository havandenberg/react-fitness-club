import * as R from 'ramda';
import * as React from 'react';
import firebase from '../../firebase';
import l from '../../styles/layout';
import { fontSizes, mobileSizes, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { Member } from '../../types/user';
import { daysCountInMonths, states } from '../../utils/constants';
import { isMobile } from '../../utils/screensize';
import { scrollToId } from '../../utils/scroll';
import {
  isValidDOBField,
  isValidEmail,
  isValidPhone,
  isValidZipCode,
  isValidZipCodeField,
} from '../../utils/validation';
import Form, { FormFieldValidations } from '../Form';
import FormRow, { FormRowData } from '../Form/Row';

interface SetupFields {
  city: string;
  email: string;
  dobMonth: string;
  dobDay: string;
  dobYear: string;
  firstName: string;
  lastName: string;
  phone: string;
  state: string;
  streetAddress1: string;
  streetAddress2: string;
  zip: string;
}

const setupFieldValidations: FormFieldValidations<SetupFields> = {
  city: (value: string) => !R.isEmpty(value),
  dobDay: (value: string, fields: SetupFields) =>
    parseInt(value, 10) > 0 &&
    parseInt(value, 10) <= daysCountInMonths[parseInt(fields.dobMonth, 10) - 1],
  dobMonth: (value: string) =>
    parseInt(value, 10) > 0 && parseInt(value, 10) <= 12,
  dobYear: (value: string) =>
    parseInt(value, 10) > 1900 &&
    parseInt(value, 10) <= new Date().getFullYear() - 8,
  email: (value: string) => isValidEmail(value),
  firstName: (value: string) => !R.isEmpty(value),
  lastName: (value: string) => !R.isEmpty(value),
  phone: (value: string) => isValidPhone(value),
  state: (value: string) => value !== '-',
  streetAddress1: (value: string) => !R.isEmpty(value),
  zip: (value: string) => isValidZipCode(value),
};

const setupFieldChangeValidations: FormFieldValidations<SetupFields> = {
  dobDay: (value: string) => isValidDOBField(value, 'day'),
  dobMonth: (value: string) => isValidDOBField(value, 'month'),
  dobYear: (value: string) => isValidDOBField(value, 'year'),
  zip: (value: string) => isValidZipCodeField(value),
};

const formRowData: Array<FormRowData<SetupFields>> = [
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
  },
  {
    isRequired: true,
    items: [
      {
        flex: '25%',
        helpText: 'MM',
        inputType: 'text',
        valueName: 'dobMonth',
      },
      {
        flex: '25%',
        helpText: 'DD',
        inputType: 'text',
        valueName: 'dobDay',
      },
      {
        flex: '50%',
        helpText: 'YYYY',
        inputType: 'text',
        valueName: 'dobYear',
      },
    ],
    label: 'Date of Birth',
  },
  {
    isRequired: true,
    items: [
      {
        flex: '100%',
        helpText: 'me@awesome.com',
        inputType: 'text',
        valueName: 'email',
      },
    ],
    label: 'Email',
  },
  {
    isRequired: true,
    items: [
      {
        flex: '100%',
        helpText: 'valid phone number',
        inputType: 'text',
        valueName: 'phone',
      },
    ],
    label: 'Phone',
  },
  {
    isRequired: true,
    items: [
      {
        flex: '100%',
        helpText: 'address line 1',
        inputType: 'text',
        isRequired: true,
        valueName: 'streetAddress1',
      },
    ],
    label: 'Address',
  },
  {
    isRequired: false,
    items: [
      {
        flex: '100%',
        helpText: 'address line 2',
        inputType: 'text',
        valueName: 'streetAddress2',
      },
    ],
    label: '',
  },
  {
    isRequired: false,
    items: [
      {
        flex: '50%',
        helpText: 'city',
        inputType: 'text',
        isRequired: true,
        valueName: 'city',
      },
      {
        flex: '20%',
        helpText: 'state',
        inputType: 'select',
        isRequired: true,
        selectOptions: ['-', ...states],
        valueName: 'state',
      },
      {
        flex: '30%',
        helpText: 'zip',
        inputType: 'text',
        isRequired: true,
        valueName: 'zip',
      },
    ],
    label: '',
  },
];

class SetupForm extends Form<SetupFields> {}

interface Props {
  user: Member;
}

class SetupFormComponent extends React.Component<Props> {
  getInitialFormValues: () => SetupFields = () => {
    const { user } = this.props;
    const { dateOfBirth } = user;
    const dob = {
      dobDay: dateOfBirth ? dateOfBirth.day : '',
      dobMonth: dateOfBirth ? dateOfBirth.month : '',
      dobYear: dateOfBirth ? dateOfBirth.year : '',
    };
    return {
      state: R.isEmpty(user.state) ? '-' : user.state,
      streetAddress2: '',
      ...R.pick(
        [
          'firstName',
          'lastName',
          'city',
          'streetAddress1',
          'email',
          'streetAddress2',
          'phone',
          'zip',
        ],
        user,
      ),
      ...dob,
    };
  };

  processFormValues = (user: any) => ({
    ...R.pick(
      [
        'firstName',
        'lastName',
        'city',
        'streetAddress1',
        'email',
        'state',
        'streetAddress2',
        'phone',
        'zip',
      ],
      user,
    ),
    dateOfBirth: {
      day: user.dobDay,
      month: user.dobMonth,
      year: user.dobYear,
    },
    isAccountSetupComplete: true,
  });

  handleSubmit = (
    onSuccess: () => void,
    onFail: (error: Error) => void,
    resetForm: () => void,
    data: any,
  ) => {
    const { user } = this.props;
    const userRef = firebase.database().ref(`members/${user.uid}`);
    userRef
      .update(this.processFormValues(data))
      .then(() => {
        onSuccess();
        scrollToId('top');
      })
      .catch((error: Error) => {
        onFail(error);
      });
  };

  render() {
    const { user } = this.props;
    return (
      <div>
        <l.FlexCentered mb={[spacing.ml, spacing.xl]}>
          <t.Text
            center={isMobile()}
            fontSize={[mobileSizes.h2, fontSizes.h2]}
            italic
          >
            Welcome to React Fitness Club, {user.firstName}!
          </t.Text>
        </l.FlexCentered>
        <l.FlexCentered mb={[spacing.xl, spacing.xxxl]}>
          <t.Text center={isMobile()}>
            Please complete the account setup form below before proceeding to
            your personal dashboard.
          </t.Text>
        </l.FlexCentered>
        <l.Flex mx="auto" width={['100%', '85%', '80%']}>
          <SetupForm
            errorMessage="Please try again."
            id="setup-form"
            initialValues={this.getInitialFormValues()}
            handleSubmit={this.handleSubmit}
            fieldChangeValidations={setupFieldChangeValidations}
            fieldValidations={setupFieldValidations}
            FormComponent={({ errors, fields, onChange }) => (
              <div>
                {formRowData.map(
                  (rowItem: FormRowData<SetupFields>, index: number) => (
                    <React.Fragment key={`row-${index}`}>
                      <FormRow<SetupFields>
                        {...rowItem}
                        errors={errors}
                        fields={fields}
                        fieldValidations={setupFieldValidations}
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
            submitText="Next"
            successMessage="Success!"
          />
        </l.Flex>
      </div>
    );
  }
}

export default SetupFormComponent;
