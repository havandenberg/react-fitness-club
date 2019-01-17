import * as React from 'react';
import { Redirect } from 'react-router';
import { Member } from '../../types/member';

interface AuthProps {
  member: Member | null;
}

interface AuthInnerProps {
  member: Member;
}

const withAuth = <P extends AuthProps>(Component: React.ComponentType<P>) =>
  class WithAuth extends React.Component<P & AuthInnerProps> {
    render() {
      const { member } = this.props;
      return member !== null ? (
        <Component {...this.props} member={member} />
      ) : (
        <Redirect to="/" />
      );
    }
  };

export default withAuth;
