import * as React from 'react';
import l from '../../styles/layout';
import { spacing } from '../../styles/theme';
import { FormComponentProps } from '../Form';
import FormActions from '../Form/Actions';
import FormRow, { FormRowData } from '../Form/Row';
import { SetupFields, setupFieldValidations } from './';

export const EMERGENCY_INFO = 'Emergency Info';

export const emergencyInfoStep: Array<FormRowData<SetupFields>> = [
  {
    isRequired: true,
    items: [
      {
        flex: '100%',
        helpText: '\'none\' if no allergies',
        inputStyles: { height: 100 },
        inputType: 'textarea',
        valueName: 'allergies',
      },
    ],
    label: 'Allergies',
    rowWidth: ['100%', '65%'],
  },
  {
    isRequired: true,
    items: [
      {
        flex: '100%',
        helpText: '\'none\' if no medical conditions',
        inputStyles: { height: 100 },
        inputType: 'textarea',
        valueName: 'medicalConditions',
      },
    ],
    label: 'Medical Conditions',
    rowWidth: ['100%', '65%'],
  },
  { items: [], label: 'Emergency Contact:' },
  {
    isRequired: true,
    items: [
      {
        flex: '50%',
        helpText: 'first',
        inputType: 'text',
        valueName: 'eFirstName',
      },
      {
        flex: '50%',
        helpText: 'last',
        inputType: 'text',
        valueName: 'eLastName',
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
        valueName: 'eEmail',
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
        helpText: 'valid phone number',
        inputType: 'text',
        valueName: 'ePhone',
      },
    ],
    label: 'Mobile Phone',
    rowWidth: ['100%', '35%'],
  },
  {
    isRequired: true,
    items: [
      {
        flex: '100%',
        inputType: 'text',
        valueName: 'eRelationship',
      },
    ],
    label: 'Relationship',
    rowWidth: ['100%', '35%'],
  },
];

class EmergencyInfoStep extends React.Component<
  FormComponentProps<SetupFields>
> {
  render() {
    const { errors, fields, onBack, onChange, onForward } = this.props;
    return (
      <div>
        {emergencyInfoStep.map(
          (rowItem: FormRowData<SetupFields>, index: number) => (
            <React.Fragment key={`row-${index}`}>
              <FormRow<SetupFields>
                {...rowItem}
                customStyles={{
                  labelWidth: ['200px', '200px', '225px'],
                  rowWidth: rowItem.rowWidth,
                }}
                errors={errors}
                fields={fields}
                fieldValidations={setupFieldValidations}
                isEditing
                onChange={onChange}
              />
              {index + 1 < emergencyInfoStep.length && (
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

export default EmergencyInfoStep;
