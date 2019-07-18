import * as R from 'ramda';
import * as React from 'react';
import l from '../../../styles/layout';
import { spacing } from '../../../styles/theme';
import { Member } from '../../../types/member';
import { Program } from '../../../types/program';
import { isMobile, isMobileOnly } from '../../../utils/screensize';
import { NavItem } from '../../Dashboard';
import Profile from '../Profile';
import MemberList from './MemberList';
import ProgramInfo from './ProgramInfo';

type AdminView = 'programs' | 'profile';

interface Props {
  isAdmin: boolean;
  member: Member;
  members: Member[];
  programs: Program[];
}

interface State {
  selectedMember: Member;
  view: AdminView;
}

class Admin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedMember: props.member,
      view: 'profile',
    };
  }

  handleSelectMember = (selectedMember: Member) => {
    this.setState({ selectedMember });
  };

  setView = (view: AdminView) => {
    return () => this.setState({ view });
  };

  render() {
    const { isAdmin, member, members, programs } = this.props;
    const { selectedMember, view } = this.state;
    return (
      <l.Flex alignTop columnOnMobile>
        <MemberList
          isAdmin={isAdmin}
          memberId={member.uid}
          members={members}
          onMemberSelect={this.handleSelectMember}
          programs={programs}
          selectedMemberId={selectedMember ? selectedMember.uid : undefined}
        />
        <l.Space height={spacing.ml} />
        <l.FlexColumn
          flex={1}
          ml={[0, spacing.xxxl, spacing.xxxxxl]}
          width={isMobileOnly() ? '100%' : undefined}>
          <l.Flex
            alignTop
            mb={spacing.xxxl}
            justifyContent={isMobile() ? 'space-around' : 'center'}
            width={['100%', 'auto', 'auto']}>
            <NavItem
              active={R.contains(view, ['profile', 'edit-profile'])}
              large
              onClick={this.setView('profile')}>
              Profile
            </NavItem>
            <l.Space width={[0, spacing.xxxxxl]} />
            <NavItem
              active={view === 'programs'}
              large
              onClick={this.setView('programs')}>
              Program Info
            </NavItem>
          </l.Flex>
          {view === 'profile' && <Profile isAdmin member={selectedMember} />}
          {view === 'programs' && (
            <ProgramInfo member={selectedMember} programs={programs} />
          )}
        </l.FlexColumn>
      </l.Flex>
    );
  }
}

export default Admin;
