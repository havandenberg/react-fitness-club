import * as React from 'react';
import l from '../../styles/layout';
import { spacing } from '../../styles/theme';
import { states } from '../../utils/constants';
import { FormComponentProps } from '../Form';
import FormActions from '../Form/Actions';
import FormRow, { FormRowData } from '../Form/Row';
import { SetupFields, setupFieldValidations } from './';

export const PERSONAL_INFO = 'Personal Info';

export const personalInfoStepData: Array<FormRowData<SetupFields>> = [
  // {
  //   items: [
  //     {
  //       flex: '100%',
  //       helpText: 'png or jpg',
  //       inputType: 'file',
  //       valueName: 'profilePhotoUrl',
  //     },
  //   ],
  //   label: 'Profile Photo',
  // },
  {
    isRequired: true,
    items: [
      {
        autoComplete: 'given-name',
        flex: '50%',
        helpText: 'first',
        inputType: 'text',
        valueName: 'firstName',
      },
      {
        autoComplete: 'family-name',
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
    items: [
      {
        autoComplete: 'nickname',
        flex: '100%',
        inputType: 'text',
        valueName: 'nickname',
      },
    ],
    label: 'Nickname',
    rowWidth: ['100%', '35%'],
  },
  {
    isRequired: true,
    items: [
      {
        autoComplete: 'email',
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
        autoComplete: 'bday-month',
        flex: '30%',
        helpText: 'MM',
        inputType: 'text',
        valueName: 'dobMonth',
      },
      {
        autoComplete: 'bday-day',
        flex: '30%',
        helpText: 'DD',
        inputType: 'text',
        valueName: 'dobDay',
      },
      {
        autoComplete: 'bday-year',
        flex: '40%',
        helpText: 'YYYY',
        inputType: 'text',
        valueName: 'dobYear',
      },
    ],
    label: 'Date of Birth',
    rowWidth: ['100%', '35%'],
  },
  {
    isRequired: true,
    items: [
      {
        autoComplete: 'tel-national',
        flex: '100%',
        helpText: 'valid phone number',
        inputType: 'text',
        valueName: 'phone',
      },
    ],
    label: 'Phone',
    rowWidth: ['100%', '35%'],
  },
  {
    isRequired: true,
    items: [
      {
        autoComplete: 'address-line1',
        flex: '100%',
        helpText: 'address line 1',
        inputType: 'text',
        isRequired: true,
        valueName: 'streetAddress1',
      },
    ],
    label: 'Address',
    rowWidth: ['100%', '55%'],
  },
  {
    items: [
      {
        autoComplete: 'address-line2',
        flex: '100%',
        helpText: 'address line 2',
        inputType: 'text',
        valueName: 'streetAddress2',
      },
    ],
    label: '',
    rowWidth: ['100%', '55%'],
  },
  {
    items: [
      {
        autoComplete: 'address-level2',
        flex: '40%',
        helpText: 'city',
        inputType: 'text',
        isRequired: true,
        valueName: 'city',
      },
      {
        autoComplete: 'address-level1',
        flex: '20%',
        helpText: 'state',
        inputType: 'select',
        isRequired: true,
        selectOptions: ['-', ...states],
        valueName: 'state',
      },
      {
        autoComplete: 'postal-code',
        flex: '25%',
        helpText: 'zip',
        inputType: 'text',
        isRequired: true,
        valueName: 'zip',
      },
    ],
    label: '',
    rowWidth: ['100%', '55%'],
  },
];

class PersonalInfoStep extends React.Component<
  FormComponentProps<SetupFields>
> {
  render() {
    const { errors, fields, onChange, onForward } = this.props;
    console.log(fields);
    return (
      <div>
        {personalInfoStepData.map(
          (rowItem: FormRowData<SetupFields>, index: number) => (
            <React.Fragment key={`row-${index}`}>
              <FormRow<SetupFields>
                {...rowItem}
                customStyles={{
                  labelWidth: ['150px', '150px', '225px'],
                  rowWidth: rowItem.rowWidth,
                }}
                errors={errors}
                fields={fields}
                fieldValidations={setupFieldValidations}
                isEditing
                onChange={onChange}
              />
              {index + 1 < personalInfoStepData.length && (
                <l.Space height={[spacing.ml, spacing.ml]} />
              )}
            </React.Fragment>
          ),
        )}
        <FormActions handleForward={onForward} />
      </div>
    );
  }
}

export default PersonalInfoStep;
