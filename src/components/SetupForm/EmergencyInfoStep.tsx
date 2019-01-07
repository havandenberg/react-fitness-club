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
        flex: '70%',
        helpText: '\'none\' if no allergies',
        inputStyles: { height: 100 },
        inputType: 'textarea',
        valueName: 'allergies',
      },
    ],
    label: 'Allergies',
  },
  {
    isRequired: true,
    items: [
      {
        flex: '70%',
        helpText: '\'none\' if no medical conditions',
        inputStyles: { height: 100 },
        inputType: 'textarea',
        valueName: 'medicalConditions',
      },
    ],
    label: 'Medical Conditions',
  },
  { items: [], label: 'Emergency Contact' },
  {
    isRequired: true,
    items: [
      {
        flex: '40%',
        helpText: 'first',
        inputType: 'text',
        valueName: 'eFirstName',
      },
      {
        flex: '40%',
        helpText: 'last',
        inputType: 'text',
        valueName: 'eLastName',
      },
    ],
    label: 'Name',
  },
  {
    isRequired: true,
    items: [
      {
        flex: '60%',
        helpText: 'username@example.com',
        inputType: 'text',
        valueName: 'eEmail',
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
        valueName: 'ePhone',
      },
    ],
    label: 'Mobile Phone',
  },
  {
    isRequired: true,
    items: [
      {
        flex: '40%',
        inputType: 'text',
        valueName: 'eRelationship',
      },
    ],
    label: 'Relationship',
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
                customStyles={{ labelWidth: '225px' }}
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
        <FormActions
          handleBack={onBack}
          handleForward={onForward}
          showBackButton
        />
      </div>
    );
  }
}

export default EmergencyInfoStep;
