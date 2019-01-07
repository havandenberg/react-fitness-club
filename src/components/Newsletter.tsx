import * as React from 'react';
import l from '../styles/layout';
import { colors, inputWidth, spacing } from '../styles/theme';
import t from '../styles/typography';
import Divider from './Divider';
import Form, { FormComponentProps, FormStep } from './Form';
import FormActions from './Form/Actions';
import FormRow, { FormItemProps } from './Form/Row';
import withSubscribe, { SubscribeProps } from './hoc/withSubscribe';

interface NewsletterFields {
  email: string;
}

const initialValues = {
  email: '',
};

const formItems: Array<
  FormItemProps<NewsletterFields, keyof NewsletterFields>
> = [
  {
    flex: 1,
    inputStyles: { textAlign: 'center' },
    inputType: 'text',
    placeholder: 'username@example.com',
    valueName: 'email',
  },
];

class Step extends React.Component<
  FormComponentProps<NewsletterFields> & SubscribeProps
> {
  handleSubmit = (
    onSuccess: () => void,
    onFail: (error: Error) => void,
    resetForm: () => void,
    data: any,
  ) => {
    this.props.subscribe({
      EMAIL: data.email,
      SOURCE: 'web-newsletter-signup',
    });
    resetForm();
  };

  render() {
    const { errors, fields, loading, onBack, onChange, onSubmit } = this.props;
    return (
      <>
        <FormRow<NewsletterFields>
          errors={errors}
          fields={fields}
          items={formItems}
          isEditing
          onChange={onChange}
        />
        <FormActions
          handleBack={onBack}
          handleForward={(e: React.FormEvent) => {
            e.preventDefault();
            onSubmit(this.handleSubmit);
          }}
          forwardText="Submit"
          loading={loading}
        />
      </>
    );
  }
}

const formData: Array<FormStep<NewsletterFields>> = [
  { label: '', FormComponent: Step, rowItems: [{ items: formItems }] },
];

class NewsletterForm extends Form<NewsletterFields> {}

class Newsletter extends React.Component<SubscribeProps> {
  render() {
    const { status, subscribe } = this.props;
    return (
      <l.Space id="newsletter" position="relative">
        <Divider white showHeavyBags />
        <t.Text
          bold
          center
          italic
          large
          mb={spacing.xl}
          mt={[spacing.xxl, spacing.xxxxl]}
          mx="auto"
          width={['100%', '60%']}
        >
          Enter your email here to sign up for our monthly newsletter!
        </t.Text>
        {status === 'success' && (
          <t.Text center color={colors.green} large mb={spacing.ml}>
            Success!
          </t.Text>
        )}
        {status === 'error' && (
          <t.Text center color={colors.red} mb={spacing.ml}>
            Invalid email or already subscribed, please try again.
          </t.Text>
        )}
        <l.Flex mx="auto" width={['100%', '75%', inputWidth]}>
          <NewsletterForm
            id="newsletter-form"
            initialValues={initialValues}
            isEditing
            steps={formData}
            stepProps={{ status, subscribe }}
            validationErrorMessage="Please enter a valid email."
          />
        </l.Flex>
      </l.Space>
    );
  }
}

export default withSubscribe(Newsletter);
