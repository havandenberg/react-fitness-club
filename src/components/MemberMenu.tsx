import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import l from '../styles/layout';
import {
  colors,
  gradients,
  navHeight,
  spacing,
  transitions,
  z,
} from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { Program } from '../types/program';
import { getMembershipProgram } from '../utils/program';
import { TinyMembershipBadge } from './MembershipBadge';
import ProfilePhoto from './ProfilePhoto';

const MemberMenuWrapper = styled(l.FlexColumn)({
  ':hover': {
    background: gradients.blackReverse,
  },
  background: gradients.blackReverse,
  cursor: 'default',
  padding: spacing.ml,
  position: 'absolute',
  right: 0,
  top: `calc(${navHeight} + ${spacing.ml})`,
  zIndex: z.max,
});

const Item = styled('div')({
  '& .logout': { color: colors.white, transition: transitions.default },
  ':hover': {
    '& .logout': { color: colors.red },
  },
  cursor: 'pointer',
});

interface Props {
  logout: () => void;
  member: Member;
  programs: Program[];
}

const MemberMenu = (props: Props) => {
  const { logout, member, programs } = props;
  const hasProfilePhoto = !R.isEmpty(member.profilePhotoUrl);
  const hasMembership = !R.isEmpty(member.membership.type);
  const program = getMembershipProgram(member.membership, programs);
  return (
    <MemberMenuWrapper alignBottom>
      <t.Link
        to="/dashboard"
        color={colors.white}
        mb={hasMembership ? spacing.m : spacing.s}
      >
        <Item>
          <l.Flex alignTop pl={hasProfilePhoto ? spacing.xxxl : undefined}>
            {hasProfilePhoto && (
              <>
                <ProfilePhoto
                  customStyles={{ left: spacing.ml, position: 'absolute' }}
                  imageSrc={member.profilePhotoUrl}
                  sideLength={hasMembership ? 85 : 68}
                />
                <l.Space width={spacing.xxxxl} />
              </>
            )}
            <l.FlexColumn alignBottom>
              <t.Text className="logout" nowrap>
                {member.nickname || `${member.firstName} ${member.lastName}`}
              </t.Text>
              {hasMembership && (
                <>
                  <l.Space height={spacing.s} />
                  <l.Flex>
                    <TinyMembershipBadge
                      membership={member.membership}
                      program={program}
                      showText
                    />
                  </l.Flex>
                </>
              )}
            </l.FlexColumn>
          </l.Flex>
        </Item>
      </t.Link>
      <Item onClick={logout}>
        <t.Text className="logout">Logout</t.Text>
      </Item>
    </MemberMenuWrapper>
  );
};

export default MemberMenu;
