import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import l from '../styles/layout';
import { colors, gradients, spacing, transitions, z } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/user';
import ProfilePhoto from './ProfilePhoto';

const UserMenuWrapper = styled(l.FlexColumn)({
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
  user: Member;
}

const UserMenu = (props: Props) => {
  const { logout, user } = props;
  const hasProfilePhoto = !R.isEmpty(user.profilePhotoUrl);
  return (
    <UserMenuWrapper alignBottom>
      <t.Link to="/dashboard" color={colors.white} mb={spacing.s}>
        <Item>
          <l.Flex alignTop pl={hasProfilePhoto ? spacing.xxxl : undefined}>
            {hasProfilePhoto && (
              <>
                <ProfilePhoto
                  customStyles={{ left: spacing.ml, position: 'absolute' }}
                  imageSrc={user.profilePhotoUrl}
                  sideLength={52}
                />
                <l.Space width={spacing.ml} />
              </>
            )}
            <t.Text className="logout" nowrap>
              {user.nickname || `${user.firstName} ${user.lastName}`}
            </t.Text>
          </l.Flex>
        </Item>
      </t.Link>
      <Item onClick={logout}>
        <t.Text className="logout">Logout</t.Text>
      </Item>
    </UserMenuWrapper>
  );
};

export default UserMenu;
