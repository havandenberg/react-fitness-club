import * as firebase from 'firebase';
import * as R from 'ramda';
import * as React from 'react';
import l from '../../styles/layout';
import { spacing } from '../../styles/theme';
import { scrollToId } from '../../utils/scroll';
import { FormComponentProps } from '../Form';
import FormActions from '../Form/Actions';
import FormRow, { FormRowData } from '../Form/Row';
import {
  EditProfileFields,
  editProfileValidations,
  processFormValues,
} from './';

export const EMERGENCY_INFO = 'Emergency Info';

export const emergencyInfoStep: Array<FormRowData<EditProfileFields>> = [
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
    rowWidth: ['100%', '55%'],
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
    rowWidth: ['100%', '55%'],
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
    rowWidth: ['100%', '55%'],
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
    rowWidth: ['100%', '55%'],
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

interface Props {
  setView: () => void;
}

interface State {
  currentUser: firebase.User | null;
}

class EmergencyInfoStep extends React.Component<
  FormComponentProps<EditProfileFields> & Props,
  State
> {
  constructor(props: FormComponentProps<EditProfileFields> & Props) {
    super(props);

    this.state = {
      currentUser: firebase.auth().currentUser,
    };
  }

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fields, onSubmit, setView } = this.props;
    const { currentUser } = this.state;
    if (currentUser) {
      onSubmit(
        (
          onSuccess: () => void,
          onFail: (error: Error, msg?: string) => void,
          resetForm: () => void,
          data: any,
        ) => {
          if (currentUser) {
            const memberRef = firebase
              .database()
              .ref(`members/${currentUser.uid}`);
            if (!R.isEmpty(fields.password)) {
              currentUser
                .updatePassword(fields.password)
                .then(() => {
                  if (!R.equals(fields.email, currentUser.email)) {
                    currentUser
                      .updateEmail(fields.email)
                      .then(() => {
                        memberRef
                          .update(processFormValues(data))
                          .then(() => {
                            onSuccess();
                            setView();
                            scrollToId('top');
                          })
                          .catch((error: Error) => {
                            onFail(error);
                          });
                      })
                      .catch((error: Error) => {
                        onFail(error, error.message);
                      });
                  } else {
                    memberRef
                      .update(processFormValues(data))
                      .then(() => {
                        onSuccess();
                        setView();
                        scrollToId('top');
                      })
                      .catch((error: Error) => {
                        onFail(error);
                      });
                  }
                })
                .catch((error: Error) => {
                  onFail(
                    error,
                    'Updating your email or password requires a recent log in. Please log out then back in and try again.',
                  );
                });
            } else if (!R.equals(fields.email, currentUser.email)) {
              currentUser
                .updateEmail(fields.email)
                .then(() => {
                  memberRef
                    .update(processFormValues(data))
                    .then(() => {
                      onSuccess();
                      setView();
                      scrollToId('top');
                    })
                    .catch((error: Error) => {
                      onFail(error);
                    });
                })
                .catch((error: Error) => {
                  onFail(error, error.message);
                });
            } else {
              memberRef
                .update(processFormValues(data))
                .then(() => {
                  onSuccess();
                  setView();
                  scrollToId('top');
                })
                .catch((error: Error) => {
                  onFail(error);
                });
            }
          }
        },
      );
    }
  };

  render() {
    const { errors, fields, loading, onChange } = this.props;
    return (
      <l.Space position="relative">
        <div>
          {emergencyInfoStep.map(
            (rowItem: FormRowData<EditProfileFields>, index: number) => (
              <React.Fragment key={`row-${index}`}>
                <FormRow<EditProfileFields>
                  {...rowItem}
                  customStyles={{
                    labelWidth: ['100%', '200px', '225px'],
                    rowWidth: rowItem.rowWidth,
                  }}
                  errors={errors}
                  fields={fields}
                  fieldValidations={editProfileValidations}
                  isEditing
                  onChange={onChange}
                />
                {index + 1 < emergencyInfoStep.length && (
                  <l.Space height={[spacing.ml, spacing.ml]} />
                )}
              </React.Fragment>
            ),
          )}
        </div>
        <l.Space
          position={['static', 'static', 'absolute']}
          right={0}
          top={-110}
        >
          <FormActions
            forwardText="Save"
            handleForward={this.handleSubmit}
            loading={loading}
          />
        </l.Space>
      </l.Space>
    );
  }
}

export default EmergencyInfoStep;
