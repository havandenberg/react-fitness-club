import * as emailjs from 'emailjs-com';
import * as R from 'ramda';
import * as React from 'react';
import l from '../styles/layout';
import { borders, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Program } from '../types/program';
import { isValidEmail } from '../utils/validation';
import Form, {
  FormComponentProps,
  FormFieldValidations,
  FormStep,
} from './Form';
import FormActions from './Form/Actions';
import { CheckboxRadioInputWithLabel } from './Form/CheckboxRadio';
import FormRow, { FormRowData } from './Form/Row';

interface ContactFields {
  addToNewsletter: boolean;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  program: string;
}

const contactFieldValidations: FormFieldValidations<ContactFields> = {
  email: (value: string) => isValidEmail(value),
  firstName: (value: string) => !R.isEmpty(value),
  lastName: (value: string) => !R.isEmpty(value),
  message: (value: string) => !R.isEmpty(value),
  program: (value: string) => !R.isEmpty(value),
};

const initialValues = {
  addToNewsletter: true,
  email: '',
  firstName: '',
  lastName: '',
  message: '',
  program: 'General interest',
};

const getPersonalInfoData: (
  programs: Program[],
) => Array<FormRowData<ContactFields>> = programs => [
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
        flex: '100%',
        inputType: 'select',
        selectOptions: [
          'General interest',
          'Private intro or lesson',
          ...programs.map((program: Program) => program.name),
        ],
        valueName: 'program',
      },
    ],
    label: 'Program interest',
    rowWidth: ['100%', '55%'],
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
        flex: '100%',
        inputType: 'textarea',
        valueName: 'message',
      },
    ],
    label: 'Message',
    rowWidth: ['100%', '65%'],
  },
];

interface Props {
  programs: Program[];
}

class Step extends React.Component<Props & FormComponentProps<ContactFields>> {
  handleSubmit = (
    onSuccess: () => void,
    onFail: (error: Error) => void,
    resetForm: () => void,
    data: any,
  ) => {
    const {
      addToNewsletter,
      email,
      firstName,
      lastName,
      message,
      program,
    } = data;
    if (process.env.REACT_APP_EMAILJS_KEY) {
      emailjs
        .send(
          'react_fitness_club',
          'template_rfc',
          {
            from_name: `${firstName} ${lastName}`,
            mailing_list: addToNewsletter
              ? 'This contact was also added to the mailing list.'
              : 'This contact was NOT added to the mailing list.',
            message,
            program,
            reply_to: email,
          },
          process.env.REACT_APP_EMAILJS_KEY,
        )
        .then(onSuccess, onFail);
    } else {
      console.log('Invalid emailjs key');
    }
  };

  render() {
    const {
      errors,
      fields,
      loading,
      onChange,
      onSubmit,
      programs,
    } = this.props;
    const personalInfoData = getPersonalInfoData(programs);
    return (
      <div>
        {personalInfoData.map(
          (rowItem: FormRowData<ContactFields>, index: number) => (
            <React.Fragment key={`row-${index}`}>
              <FormRow<ContactFields>
                {...rowItem}
                customStyles={{
                  labelWidth: ['200px', '200px', '225px'],
                  rowWidth: rowItem.rowWidth,
                }}
                errors={errors}
                fields={fields}
                fieldValidations={contactFieldValidations}
                isEditing
                onChange={onChange}
              />
              {index + 1 < personalInfoData.length && (
                <l.Space height={[spacing.ml, spacing.xl]} />
              )}
            </React.Fragment>
          ),
        )}
        <t.Text bold center large my={spacing.xxxl}>
          Would you like to sign up for the monthly newsletter for updates on
          events, competitions, and similar?
        </t.Text>
        <l.FlexCentered mb={spacing.xxxl}>
          <CheckboxRadioInputWithLabel
            checked={fields.addToNewsletter}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange('addToNewsletter', e.currentTarget.checked);
            }}
            text={fields.addToNewsletter ? 'Yes, please' : 'Not right now'}
            type="checkbox"
          />
        </l.FlexCentered>
        <FormActions
          handleForward={(e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(this.handleSubmit);
          }}
          loading={loading}
        />
      </div>
    );
  }
}

const formData: Array<FormStep<ContactFields>> = [
  {
    FormComponent: Step,
    label: 'Contact Form',
    rowItems: getPersonalInfoData([]),
  },
];

class ContactForm extends Form<ContactFields> {}

class ContactFormComponent extends React.Component<Props> {
  render() {
    const { programs } = this.props;
    return (
      <l.Flex mx="auto" width={['100%', '90%', '80%']}>
        <ContactForm
          errorMessage={
            <t.Text center color={colors.red} large mb={spacing.xl}>
              An error has occurred. Please try again later or email us directly
              at
              <t.Anchor
                border={borders.red}
                color={colors.red}
                href="mailto:reactfitnessclub@gmail.com"
              >
                reactfitnessclub@gmail.com
              </t.Anchor>
            </t.Text>
          }
          id="contact-form"
          initialValues={initialValues}
          isEditing
          fieldValidations={contactFieldValidations}
          steps={formData}
          stepProps={{ programs }}
          successMessage="Success! One of our coaches will contact you as soon as possible with a response."
        />
      </l.Flex>
    );
  }
}

export default ContactFormComponent;
