import * as R from 'ramda';
import * as React from 'react';
import { Member } from '../../types/user';
import { daysCountInMonths } from '../../utils/constants';
import {
  isValidDOBField,
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidZipCode,
  isValidZipCodeField,
} from '../../utils/validation';
import Form, { FormFieldValidations, FormStep } from '../Form';
import EmergencyInfoStep, {
  EMERGENCY_INFO,
  emergencyInfoStep,
} from './EmergencyInfoStep';
import PersonalInfoStep, {
  PERSONAL_INFO,
  personalInfoStep,
} from './PersonalInfoStep';

export interface EditProfileFields {
  allergies: string;
  city: string;
  confirmPassword: string;
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
  lastName: string;
  medicalConditions: string;
  nickname: string;
  password: string;
  profilePhotoUrl: string;
  phone: string;
  state: string;
  streetAddress1: string;
  streetAddress2: string;
  zip: string;
}

export const editProfileValidations: FormFieldValidations<EditProfileFields> = {
  allergies: (value: string) => !R.isEmpty(value),
  city: (value: string) => !R.isEmpty(value),
  confirmPassword: (value: string, fields: EditProfileFields) =>
    R.isEmpty(fields.password) ||
    (!R.isEmpty(value) && R.equals(value, fields.password)),
  dobDay: (value: string, fields: EditProfileFields) =>
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
  lastName: (value: string) => !R.isEmpty(value),
  medicalConditions: (value: string) => !R.isEmpty(value),
  password: (value: string) => R.isEmpty(value) || isValidPassword(value),
  phone: (value: string) => isValidPhone(value),
  profilePhotoUrl: (value: string) => !R.isEmpty(value),
  state: (value: string) => !R.isEmpty(value) && value !== '-',
  streetAddress1: (value: string) => !R.isEmpty(value),
  zip: (value: string) => isValidZipCode(value),
};

export const editProfileChangeValidations: FormFieldValidations<
  EditProfileFields
> = {
  dobDay: (value: string) => isValidDOBField(value, 'day'),
  dobMonth: (value: string) => isValidDOBField(value, 'month'),
  dobYear: (value: string) => isValidDOBField(value, 'year'),
  zip: (value: string) => isValidZipCodeField(value),
};

const formData: Array<FormStep<EditProfileFields>> = [
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
];

class EditProfileForm extends Form<EditProfileFields> {}

export const processFormValues = (user: EditProfileFields) => ({
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
    user,
  ),
  dateOfBirth: {
    day: user.dobDay,
    month: user.dobMonth,
    year: user.dobYear,
  },
  emergencyContact: {
    email: user.eEmail,
    firstName: user.eFirstName,
    lastName: user.eLastName,
    phone: user.ePhone,
    relationship: user.eRelationship,
  },
});

interface Props {
  setView: () => void;
  user: Member;
}

class EditProfileComponent extends React.Component<Props> {
  getInitialFormValues: () => EditProfileFields = () => {
    const { user } = this.props;
    const { dateOfBirth, emergencyContact } = user;
    return {
      confirmPassword: '',
      nickname: '',
      password: '',
      streetAddress2: '',
      ...R.omit(['dateOfBirth', 'emergencyContact', 'state'], user),
      dobDay: dateOfBirth.day,
      dobMonth: dateOfBirth.month,
      dobYear: dateOfBirth.year,
      eEmail: emergencyContact.email,
      eFirstName: emergencyContact.firstName,
      eLastName: emergencyContact.lastName,
      ePhone: emergencyContact.phone,
      eRelationship: emergencyContact.relationship,
      state: R.isEmpty(user.state) ? '-' : user.state,
    };
  };

  render() {
    const { setView } = this.props;
    return (
      <EditProfileForm
        enableDirectStepNav
        errorMessage="Please try again."
        id="setup-form"
        initialValues={this.getInitialFormValues()}
        isEditing
        fieldChangeValidations={editProfileChangeValidations}
        fieldValidations={editProfileValidations}
        steps={formData}
        stepProps={{ setView }}
        successMessage="Success!"
      />
    );
  }
}

export default EditProfileComponent;
