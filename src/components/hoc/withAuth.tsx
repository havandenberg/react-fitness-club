import * as React from 'react';
import { Redirect } from 'react-router';
import { Member } from '../../types/user';

interface AuthProps {
  user: Member | null;
}

interface AuthInnerProps {
  user: Member;
}

const withAuth = <P extends AuthProps>(Component: React.ComponentType<P>) =>
  class WithAuth extends React.Component<P & AuthInnerProps> {
    render() {
      const { user } = this.props;
      return user !== null ? (
        <Component {...this.props} user={user} />
      ) : (
        <Redirect to="/" />
      );
    }
  };

export default withAuth;
