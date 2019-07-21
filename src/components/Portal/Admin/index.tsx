import * as R from 'ramda';
import * as React from 'react';
import { NavItem } from '..';
import l from '../../../styles/layout';
import { colors, spacing } from '../../../styles/theme';
import t from '../../../styles/typography';
import { Member } from '../../../types/member';
import { Program } from '../../../types/program';
import { getMemberFullName } from '../../../utils/member';
import { isMobile, isMobileOnly } from '../../../utils/screensize';
import Profile from '../Profile';
import MemberList from './MemberList';
import MembershipInfo from './MembershipInfo';

type MembershipView = 'profile' | 'membership';

interface Props {
  isAdmin: boolean;
  member: Member;
  members: Member[];
  programs: Program[];
}

interface State {
  selectedMember: Member;
  view: MembershipView;
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

  setView = (view: MembershipView) => {
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
            flexDirection={isMobile() ? 'column' : 'row'}
            mb={spacing.xxxl}
            spaceBetween
            width="100%">
            <t.Text bold color={colors.red} mb={[spacing.sm, spacing.sm, 0]}>
              {getMemberFullName(selectedMember)}
            </t.Text>
            <l.Flex>
              <NavItem
                active={R.contains(view, ['profile', 'edit-profile'])}
                onClick={this.setView('profile')}>
                Profile
              </NavItem>
              <l.Space width={[spacing.xl, spacing.xl, spacing.xxxxxl]} />
              <NavItem
                active={view === 'membership'}
                onClick={this.setView('membership')}>
                Membership
              </NavItem>
            </l.Flex>
          </l.Flex>
          {view === 'profile' && <Profile isAdmin member={selectedMember} />}
          {view === 'membership' && (
            <MembershipInfo member={selectedMember} programs={programs} />
          )}
        </l.FlexColumn>
      </l.Flex>
    );
  }
}

export default Admin;
