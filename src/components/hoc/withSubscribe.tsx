import * as React from 'react';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

export interface SubscribeProps {
  status: 'success' | 'error' | 'sending' | null;
  subscribe: (data: object) => void;
}

const withSubscribe = <P extends object>(
  Component: React.ComponentType<P & SubscribeProps>,
) =>
  class WithSubscribe extends React.Component<P & object> {
    render() {
      return (
        <MailchimpSubscribe
          render={({ subscribe, status }) => (
            <Component {...this.props} subscribe={subscribe} status={status} />
          )}
          url={process.env.REACT_APP_MAILCHIMP_URI || ''}
        />
      );
    }
  };

export default withSubscribe;
