import * as R from 'ramda';
import * as React from 'react';
import firebase from '../../firebase';
import l from '../../styles/layout';
import { fontSizes, mobileSizes, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { Member } from '../../types/user';
import { isMobile } from '../../utils/screensize';
import { scrollToId } from '../../utils/scroll';
import {
  isNumberOrHyphen,
  isValidDOBField,
  isValidEmail,
  isValidPhone,
  isValidZipCode,
  isValidZipCodeField,
} from '../../utils/validation';
import Form, { FormFieldValidations } from '../Form';
import FormRow, { FormRowData } from '../Form/Row';

export interface SetupFields {
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

const setupFieldValidations: FormFieldValidations = {
  city: (value: string) => !R.isEmpty(value),
  dobDay: (value: string) => !R.isEmpty(value),
  dobMonth: (value: string) => !R.isEmpty(value),
  dobYear: (value: string) => !R.isEmpty(value),
  email: (value: string) => isValidEmail(value),
  firstName: (value: string) => !R.isEmpty(value),
  lastName: (value: string) => !R.isEmpty(value),
  phone: (value: string) => isValidPhone(value),
  state: (value: string) => !R.isEmpty(value),
  streetAddress1: (value: string) => !R.isEmpty(value),
  zip: (value: string) => isValidZipCode(value),
};

const setupFieldChangeValidations: FormFieldValidations = {
  dobDay: (value: string) => isValidDOBField(value, 'day'),
  dobMonth: (value: string) => isValidDOBField(value, 'month'),
  dobYear: (value: string) => isValidDOBField(value, 'year'),
  phone: (value: string) => isNumberOrHyphen(value),
  zip: (value: string) => isValidZipCodeField(value),
};

const formRowData: Array<FormRowData<SetupFields>> = [
  {
    isRequired: true,
    items: [
      {
        flex: '50%',
        helpText: 'first',
        valueName: 'firstName',
      },
      {
        flex: '50%',
        helpText: 'last',
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
        valueName: 'dobMonth',
      },
      {
        flex: '25%',
        helpText: 'DD',
        valueName: 'dobDay',
      },
      {
        flex: '50%',
        helpText: 'YYYY',
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
        helpText: 'XXX-XXX-XXXX',
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
        isRequired: true,
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
        isRequired: true,
        valueName: 'city',
      },
      {
        flex: '20%',
        helpText: 'state',
        isRequired: true,
        valueName: 'state',
      },
      {
        flex: '30%',
        helpText: 'zip',
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

class UserSetup extends React.Component<Props> {
  getInitialFormValues: () => SetupFields = () => {
    const { user } = this.props;
    return {
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
          'state',
          'zip',
        ],
        user,
      ),
      dobDay: user.dateOfBirth.day,
      dobMonth: user.dateOfBirth.month,
      dobYear: user.dateOfBirth.year,
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
        'streetAddress2',
        'phone',
        'state',
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
        <l.FlexCentered mb={[spacing.xxxl, spacing.xxxxxl]}>
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
                        <l.Space height={[spacing.sm, spacing.ml]} />
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

export default UserSetup;
