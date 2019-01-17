import * as firebase from 'firebase';
import * as R from 'ramda';
import * as React from 'react';
import l from '../../styles/layout';
import { spacing } from '../../styles/theme';
import { states } from '../../utils/constants';
import { scrollToId } from '../../utils/scroll';
import {
  containsLowercase,
  containsNumber,
  containsUppercase,
  enoughCharacters,
} from '../../utils/validation';
import { FormComponentProps } from '../Form';
import FormActions from '../Form/Actions';
import FormRow, { FormRowData } from '../Form/Row';
import {
  EditProfileFields,
  editProfileValidations,
  processFormValues,
} from './';

export const PERSONAL_INFO = 'Personal Info';

export const personalInfoStep: (
  authProvider: string,
  fields?: EditProfileFields,
) => Array<FormRowData<EditProfileFields>> = (authProvider, fields) => {
  const data: Array<FormRowData<EditProfileFields>> = [
    {
      isRequired: true,
      items: [
        {
          flex: '100%',
          helpText: 'username@example.com',
          inputType: 'text',
          isViewOnly: !R.equals(authProvider, 'password'),
          valueName: 'email',
          viewOnlyText: `email provided by ${authProvider.replace('.com', '')}`,
        },
      ],
      label: 'Email',
      rowWidth: ['100%', '65%'],
    },
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
      rowWidth: ['100%', '65%'],
    },
    {
      items: [
        {
          flex: '100%',
          inputType: 'text',
          valueName: 'nickname',
        },
      ],
      label: 'Nickname',
      rowWidth: ['100%', '35%'],
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
          flex: '30%',
          helpText: 'MM',
          inputType: 'text',
          valueName: 'dobMonth',
        },
        {
          flex: '30%',
          helpText: 'DD',
          inputType: 'text',
          valueName: 'dobDay',
        },
        {
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
          flex: '40%',
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
  if (R.equals(authProvider, 'password')) {
    const confirmPasswordData: FormRowData<EditProfileFields> = {
      isRequired: true,
      items: [
        {
          flex: '100%',
          helpText: 'must match password',
          inputType: 'password',
          valueName: 'confirmPassword',
        },
      ],
      label: 'Confirm Password',
      rowWidth: ['100%', '45%'],
    };
    const passwordData: FormRowData<EditProfileFields> = {
      isRequired: false,
      items: [
        {
          flex: '100%',
          helpText:
            !fields || !R.isEmpty(fields.password)
              ? ['1 lowercase', '1 uppercase', '1 number', '8+ characters']
              : undefined,
          helpTextValidations: [
            containsLowercase,
            containsUppercase,
            containsNumber,
            enoughCharacters,
          ],
          inputType: 'password',
          isRequired: false,
          valueName: 'password',
        },
      ],
      label: 'New Password',
      rowWidth: ['100%', '45%'],
    };
    data.splice(1, 0, passwordData);
    if (!fields || !R.isEmpty(fields.password)) {
      data.splice(2, 0, confirmPasswordData);
    }
  }
  return data;
};

interface Props {
  setView: () => void;
}

interface State {
  currentUser: firebase.User | null;
}

class PersonalInfoStep extends React.Component<
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
    const { currentUser } = this.state;
    const providerData =
      currentUser &&
      currentUser.providerData.length > 0 &&
      currentUser.providerData[0];
    const personalInfoStepData =
      providerData && personalInfoStep(providerData.providerId, fields);
    return (
      personalInfoStepData && (
        <l.Space position="relative">
          <div>
            {personalInfoStepData.map(
              (rowItem: FormRowData<EditProfileFields>, index: number) => (
                <React.Fragment key={`row-${index}`}>
                  <FormRow<EditProfileFields>
                    {...rowItem}
                    customStyles={{
                      labelWidth: ['150px', '150px', '225px'],
                      rowWidth: rowItem.rowWidth,
                    }}
                    errors={errors}
                    fields={fields}
                    fieldValidations={editProfileValidations}
                    isEditing
                    onChange={onChange}
                  />
                  {index + 1 < personalInfoStepData.length && (
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
      )
    );
  }
}

export default PersonalInfoStep;
