import * as React from 'react';
import l from '../../styles/layout';
import { spacing } from '../../styles/theme';
import { states } from '../../utils/constants';
import { FormComponentProps } from '../Form';
import FormActions from '../Form/Actions';
import FormRow, { FormRowData } from '../Form/Row';
import { SetupFields, setupFieldValidations } from './';

export const PERSONAL_INFO = 'Personal Info';

export const personalInfoStep: Array<FormRowData<SetupFields>> = [
  {
    isRequired: true,
    items: [
      {
        flex: '40%',
        helpText: 'first',
        inputType: 'text',
        valueName: 'firstName',
      },
      {
        flex: '40%',
        helpText: 'last',
        inputType: 'text',
        valueName: 'lastName',
      },
    ],
    label: 'Name',
  },
  {
    items: [
      {
        flex: '40%',
        inputType: 'text',
        valueName: 'nickname',
      },
    ],
    label: 'Nickname',
  },
  {
    items: [
      {
        flex: '100%',
        helpText: 'png or jpg',
        inputType: 'file',
        valueName: 'profilePhotoUrl',
      },
    ],
    label: 'Profile Photo',
  },
  {
    isRequired: true,
    items: [
      {
        flex: '10%',
        helpText: 'MM',
        inputType: 'text',
        valueName: 'dobMonth',
      },
      {
        flex: '10%',
        helpText: 'DD',
        inputType: 'text',
        valueName: 'dobDay',
      },
      {
        flex: '15%',
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
        helpText: 'username@example.com',
        inputType: 'text',
        isViewOnly: true,
        valueName: 'email',
        viewOnlyText: 'you can change your email after profile setup',
      },
    ],
    label: 'Email',
  },
  {
    isRequired: true,
    items: [
      {
        flex: '40%',
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
        flex: '65%',
        helpText: 'address line 1',
        inputType: 'text',
        isRequired: true,
        valueName: 'streetAddress1',
      },
    ],
    label: 'Address',
  },
  {
    items: [
      {
        flex: '65%',
        helpText: 'address line 2',
        inputType: 'text',
        valueName: 'streetAddress2',
      },
    ],
    label: '',
  },
  {
    items: [
      {
        flex: '40%',
        helpText: 'city',
        inputType: 'text',
        isRequired: true,
        valueName: 'city',
      },
      {
        flex: '10%',
        helpText: 'state',
        inputType: 'select',
        isRequired: true,
        selectOptions: ['-', ...states],
        valueName: 'state',
      },
      {
        flex: '15%',
        helpText: 'zip',
        inputType: 'text',
        isRequired: true,
        valueName: 'zip',
      },
    ],
    label: '',
  },
];

class PersonalInfoStep extends React.Component<
  FormComponentProps<SetupFields>
> {
  render() {
    const { errors, fields, onBack, onChange, onForward } = this.props;
    return (
      <div>
        {personalInfoStep.map(
          (rowItem: FormRowData<SetupFields>, index: number) => (
            <React.Fragment key={`row-${index}`}>
              <FormRow<SetupFields>
                {...rowItem}
                customStyles={{ labelWidth: '225px' }}
                errors={errors}
                fields={fields}
                fieldValidations={setupFieldValidations}
                isEditing
                onChange={onChange}
              />
              {index + 1 < personalInfoStep.length && (
                <l.Space height={[spacing.ml, spacing.ml]} />
              )}
            </React.Fragment>
          ),
        )}
        <FormActions handleBack={onBack} handleForward={onForward} />
      </div>
    );
  }
}

export default PersonalInfoStep;
