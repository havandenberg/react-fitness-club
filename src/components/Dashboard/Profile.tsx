import * as React from 'react';
import l from '../../styles/layout';
import { Member } from '../../types/user';
import withScroll from '../hoc/withScroll';
import ProfilePhoto from '../ProfilePhoto';

interface Props {
  user: Member;
}

class Profile extends React.Component<Props> {
  render() {
    const { user } = this.props;
    return (
      <div>
        <l.FlexCentered>
          <ProfilePhoto sideLength={200} imageSrc={user.profilePhotoUrl} />
        </l.FlexCentered>
      </div>
    );
  }
}

export default withScroll(Profile);
