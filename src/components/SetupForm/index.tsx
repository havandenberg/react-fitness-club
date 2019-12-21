import * as R from 'ramda';
import * as React from 'react';
import l from '../../styles/layout';
import { fontSizes, mobileSizes, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { Member } from '../../types/member';
import { daysCountInMonths } from '../../utils/constants';
import { isMobile } from '../../utils/screensize';
import {
  isUnderEighteen,
  isValidDOBField,
  isValidEmail,
  isValidPhone,
  isValidZipCode,
  isValidZipCodeField,
} from '../../utils/validation';
import Form, { FormFieldValidations, FormStep } from '../Form';
import EmergencyInfoStep, {
  EMERGENCY_INFO,
  emergencyInfoStep,
} from './EmergencyInfoStep';
import LiabilityWaiverStep, { LIABILITY_WAIVER } from './LiabilityStep';
import PersonalInfoStep, {
  PERSONAL_INFO,
  personalInfoStep,
} from './PersonalInfoStep';

export interface SetupFields {
  allergies: string;
  city: string;
  email: string;
  eEmail: string;
  eFirstName: string;
  eLastName: string;
  ePhone: string;
  eRelationship: string;
  dobMonth: string;
  dobDay: string;
  dobYear: string;
  firstName: string;
  initialFive: string;
  initialFour: string;
  initialOne: string;
  initialSix: string;
  initialThree: string;
  initialTwo: string;
  lastName: string;
  medicalConditions: string;
  memberParentSignature: string;
  memberSignature: string;
  nickname: string;
  profilePhotoUrl: string;
  phone: string;
  sendLiabilityCopy: boolean;
  state: string;
  streetAddress1: string;
  streetAddress2: string;
  zip: string;
}

export const setupFieldValidations: FormFieldValidations<SetupFields> = {
  allergies: (value: string) => !R.isEmpty(value),
  city: (value: string) => !R.isEmpty(value),
  dobDay: (value: string, fields: SetupFields) =>
    parseInt(value, 10) > 0 &&
    parseInt(value, 10) <= daysCountInMonths[parseInt(fields.dobMonth, 10) - 1],
  dobMonth: (value: string) =>
    parseInt(value, 10) > 0 && parseInt(value, 10) <= 12,
  dobYear: (value: string) =>
    parseInt(value, 10) > 1900 &&
    parseInt(value, 10) <= new Date().getFullYear() - 8,
  eEmail: (value: string) => isValidEmail(value),
  eFirstName: (value: string) => !R.isEmpty(value),
  eLastName: (value: string) => !R.isEmpty(value),
  ePhone: (value: string) => isValidPhone(value),
  eRelationship: (value: string) => !R.isEmpty(value),
  email: (value: string) => isValidEmail(value),
  firstName: (value: string) => !R.isEmpty(value),
  initialFive: (value: string) => value.length > 1,
  initialFour: (value: string) => value.length > 1,
  initialOne: (value: string) => value.length > 1,
  initialSix: (value: string) => value.length > 1,
  initialThree: (value: string) => value.length > 1,
  initialTwo: (value: string) => value.length > 1,
  lastName: (value: string) => !R.isEmpty(value),
  medicalConditions: (value: string) => !R.isEmpty(value),
  memberParentSignature: (value: string, fields: SetupFields) =>
    isUnderEighteen(`${fields.dobYear}${fields.dobMonth}${fields.dobDay}`)
      ? !R.isEmpty(value)
      : true,
  memberSignature: (value: string) => !R.isEmpty(value),
  phone: (value: string) => isValidPhone(value),
  state: (value: string) => !R.isEmpty(value) && value !== '-',
  streetAddress1: (value: string) => !R.isEmpty(value),
  zip: (value: string) => isValidZipCode(value),
};

export const setupFieldChangeValidations: FormFieldValidations<SetupFields> = {
  dobDay: (value: string) => isValidDOBField(value, 'day'),
  dobMonth: (value: string) => isValidDOBField(value, 'month'),
  dobYear: (value: string) => isValidDOBField(value, 'year'),
  initialFive: (value: string) => value.length < 4,
  initialFour: (value: string) => value.length < 4,
  initialOne: (value: string) => value.length < 4,
  initialSix: (value: string) => value.length < 4,
  initialThree: (value: string) => value.length < 4,
  initialTwo: (value: string) => value.length < 4,
  zip: (value: string) => isValidZipCodeField(value),
};

const formData: Array<FormStep<SetupFields>> = [
  {
    FormComponent: PersonalInfoStep,
    label: PERSONAL_INFO,
    rowItems: personalInfoStep(''),
  },
  {
    FormComponent: EmergencyInfoStep,
    customStyles: { labelWidth: '225px' },
    label: EMERGENCY_INFO,
    rowItems: emergencyInfoStep,
  },
  {
    FormComponent: LiabilityWaiverStep,
    label: LIABILITY_WAIVER,
    rowItems: [
      {
        items: [
          { flex: 1, inputType: 'text', valueName: 'initialOne' },
          { flex: 1, inputType: 'text', valueName: 'initialTwo' },
          { flex: 1, inputType: 'text', valueName: 'initialThree' },
          { flex: 1, inputType: 'text', valueName: 'initialFour' },
          { flex: 1, inputType: 'text', valueName: 'initialFive' },
          { flex: 1, inputType: 'text', valueName: 'initialSix' },
          { flex: 1, inputType: 'text', valueName: 'memberParentSignature' },
          { flex: 1, inputType: 'text', valueName: 'memberSignature' },
        ],
      },
    ],
  },
];

class SetupForm extends Form<SetupFields> {}

export const processFormValues = (member: SetupFields) => ({
  ...R.pick(
    [
      'allergies',
      'city',
      'email',
      'firstName',
      'lastName',
      'medicalConditions',
      'nickname',
      'profilePhotoUrl',
      'phone',
      'state',
      'streetAddress1',
      'streetAddress2',
      'zip',
    ],
    member,
  ),
  dateOfBirth: {
    day: member.dobDay,
    month: member.dobMonth,
    year: member.dobYear,
  },
  emergencyContact: {
    email: member.eEmail,
    firstName: member.eFirstName,
    lastName: member.eLastName,
    phone: member.ePhone,
    relationship: member.eRelationship,
  },
  isAccountSetupComplete: true,
  isLiabilityWaiverSigned: true,
});

interface Props {
  member: Member;
}

class SetupFormComponent extends React.Component<Props> {
  getInitialFormValues: () => SetupFields = () => {
    const { member } = this.props;
    const { dateOfBirth, emergencyContact } = member;
    return {
      initialFive: '',
      initialFour: '',
      initialOne: '',
      initialSix: '',
      initialThree: '',
      initialTwo: '',
      memberParentSignature: '',
      memberSignature: '',
      nickname: '',
      sendLiabilityCopy: true,
      streetAddress2: '',
      ...R.omit(['dateOfBirth', 'emergencyContact', 'state'], member),
      dobDay: dateOfBirth.day,
      dobMonth: dateOfBirth.month,
      dobYear: dateOfBirth.year,
      eEmail: emergencyContact.email,
      eFirstName: emergencyContact.firstName,
      eLastName: emergencyContact.lastName,
      ePhone: emergencyContact.phone,
      eRelationship: emergencyContact.relationship,
      state: R.isEmpty(member.state) ? '-' : member.state,
    };
  };

  render() {
    const { member } = this.props;
    return (
      <div>
        <l.FlexCentered mb={[spacing.ml, spacing.xl]}>
          <t.Text
            center={isMobile()}
            fontSize={[mobileSizes.h3, fontSizes.h3]}
            italic
          >
            Welcome to React Fitness Club, {member.firstName}!
          </t.Text>
        </l.FlexCentered>
        <l.FlexCentered mb={[spacing.xl, spacing.xxxl]}>
          <t.Text center={isMobile()}>
            Complete the account setup form below to proceed to your member
            portal.
          </t.Text>
        </l.FlexCentered>
        <SetupForm
          errorMessage="Please try again."
          id="setup-form"
          initialValues={this.getInitialFormValues()}
          isEditing
          fieldChangeValidations={setupFieldChangeValidations}
          fieldValidations={setupFieldValidations}
          steps={formData}
          successMessage="Success!"
        />
      </div>
    );
  }
}

export default SetupFormComponent;
