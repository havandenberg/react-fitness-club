import * as React from 'react';
import { Member } from '../../types/member';
import withScroll from '../hoc/withScroll';

interface Props {
  user: Member;
}

class Programs extends React.Component<Props> {
  render() {
    const { user } = this.props;
    return <div>{user.firstName}</div>;
  }
}

export default withScroll(Programs);
