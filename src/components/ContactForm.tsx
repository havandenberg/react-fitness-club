import * as emailjs from 'emailjs-com';
import * as R from 'ramda';
import * as React from 'react';
import l from '../styles/layout';
import { borders, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { programsList } from '../utils/constants';
import { isValidEmail } from '../utils/validation';
import Form, { FormFieldValidations } from './Form';
import { CheckboxRadioInputWithLabel } from './Form/CheckboxRadio';
import FormRow, { FormRowData } from './Form/Row';
import withSubscribe, { SubscribeProps } from './hoc/withSubscribe';

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

const formRowData: Array<FormRowData<ContactFields>> = [
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
  },
  {
    items: [
      {
        flex: '100%',
        inputType: 'select',
        selectOptions: ['General interest', ...programsList],
        valueName: 'program',
      },
    ],
    label: 'Program interest',
  },
  {
    isRequired: true,
    items: [
      {
        flex: '100%',
        helpText: 'me@awesome.com',
        inputType: 'text',
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
        inputType: 'textarea',
        valueName: 'message',
      },
    ],
    label: 'Message',
  },
];

class ContactForm extends Form<ContactFields> {}

class ContactFormComponent extends React.Component<SubscribeProps> {
  handleSubmit = (
    onSuccess: () => void,
    onFail: (error: Error) => void,
    resetForm: () => void,
    data: any,
  ) => {
    const { subscribe } = this.props;
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
        .then(() => {
          onSuccess();
          if (addToNewsletter) {
            subscribe({
              EMAIL: email,
              FNAME: firstName,
              LNAME: lastName,
              SOURCE: 'web-contact-form',
            });
          }
        }, onFail);
    } else {
      console.log('Invalid emailjs key');
    }
  };

  render() {
    return (
      <l.Flex mx="auto" width={['100%', '85%', '80%']}>
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
          handleSubmit={this.handleSubmit}
          fieldValidations={contactFieldValidations}
          FormComponent={({ errors, fields, onChange }) => (
            <div>
              {formRowData.map(
                (rowItem: FormRowData<ContactFields>, index: number) => (
                  <React.Fragment key={`row-${index}`}>
                    <FormRow<ContactFields>
                      {...rowItem}
                      customStyles={{ labelsWidth: '225px' }}
                      errors={errors}
                      fields={fields}
                      fieldValidations={contactFieldValidations}
                      onChange={onChange}
                    />
                    {index + 1 < formRowData.length && (
                      <l.Space height={[spacing.ml, spacing.xl]} />
                    )}
                  </React.Fragment>
                ),
              )}
              <t.Text bold center large my={spacing.xl}>
                Would you like to sign up for the monthly newsletter for updates
                on events, competitions, and similar?
              </t.Text>
              <l.FlexCentered>
                <CheckboxRadioInputWithLabel
                  checked={fields.addToNewsletter}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange('addToNewsletter', e.currentTarget.checked);
                  }}
                  text={
                    fields.addToNewsletter ? 'Yes, please' : 'Not right now'
                  }
                  type="checkbox"
                />
              </l.FlexCentered>
            </div>
          )}
          submitText="Submit"
          successMessage="Success! One of our coaches will contact you as soon as possible with a response."
        />
      </l.Flex>
    );
  }
}

export default withSubscribe(ContactFormComponent);
