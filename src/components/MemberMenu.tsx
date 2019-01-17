import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import l from '../styles/layout';
import { colors, gradients, spacing, transitions, z } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import ProfilePhoto from './ProfilePhoto';

const MemberMenuWrapper = styled(l.FlexColumn)({
  ':hover': {
    background: gradients.blackReverse,
  },
  background: gradients.blackReverse,
  bottom: `calc(-100% - ${spacing.sm})`,
  cursor: 'default',
  padding: spacing.ml,
  position: 'absolute',
  right: 0,
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
}

const MemberMenu = (props: Props) => {
  const { logout, member } = props;
  const hasProfilePhoto = !R.isEmpty(member.profilePhotoUrl);
  return (
    <MemberMenuWrapper alignBottom>
      <t.Link to="/dashboard" color={colors.white} mb={spacing.s}>
        <Item>
          <l.Flex alignTop pl={hasProfilePhoto ? spacing.xxxl : undefined}>
            {hasProfilePhoto && (
              <>
                <ProfilePhoto
                  customStyles={{ left: spacing.ml, position: 'absolute' }}
                  imageSrc={member.profilePhotoUrl}
                  sideLength={52}
                />
                <l.Space width={spacing.xxxl} />
              </>
            )}
            <t.Text className="logout" nowrap>
              {member.nickname || `${member.firstName} ${member.lastName}`}
            </t.Text>
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
