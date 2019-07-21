import * as React from 'react';
import { Member } from '../../types/member';
import { Program } from '../../types/program';
import MembershipForm from './MembershipForm';

export interface Props {
  member: Member;
  programs: Program[];
  cancelSwitchMembership: () => void;
}

const SwitchMembership = ({
  cancelSwitchMembership,
  member,
  programs,
}: Props) => (
  <div>
    <MembershipForm
      events={[]}
      cancelSwitchMembership={cancelSwitchMembership}
      member={member}
      programs={programs}
    />
  </div>
);

export default SwitchMembership;
