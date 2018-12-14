import * as React from 'react';
import l from '../styles/layout';
import { colors, inputWidth, spacing } from '../styles/theme';
import t from '../styles/typography';
import Divider from './Divider';
import Form from './Form';
import FormRow from './Form/Row';
import withSubscribe, { SubscribeProps } from './hoc/withSubscribe';

interface NewsletterFields {
  email: string;
}

const initialValues = {
  email: '',
};

class NewsletterForm extends Form<NewsletterFields> {}

class Newsletter extends React.Component<SubscribeProps> {
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
    const { status } = this.props;
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
            handleSubmit={this.handleSubmit}
            FormComponent={({ errors, fields, onChange }) => (
              <FormRow<NewsletterFields>
                errors={errors}
                fields={fields}
                items={[
                  {
                    flex: 1,
                    inputStyles: { textAlign: 'center' },
                    inputType: 'text',
                    placeholder: 'me@awesome.com',
                    valueName: 'email',
                  },
                ]}
                onChange={onChange}
              />
            )}
            submitText="Submit"
            validationErrorMessage="Please enter a valid email."
          />
        </l.Flex>
      </l.Space>
    );
  }
}

export default withSubscribe(Newsletter);
