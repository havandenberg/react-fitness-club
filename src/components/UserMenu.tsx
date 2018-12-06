import * as React from 'react';
import styled from 'react-emotion';
import l from '../styles/layout';
import { colors, gradients, spacing, transitions, z } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/user';

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

const LogoutButton = styled('div')({
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
  return (
    <UserMenuWrapper alignBottom>
      <t.Text color={colors.white} mb={spacing.s} nowrap>
        {user.nickname || `${user.firstName} ${user.lastName}`}
      </t.Text>
      <LogoutButton onClick={logout}>
        <t.Text className="logout">Logout</t.Text>
      </LogoutButton>
    </UserMenuWrapper>
  );
};

export default UserMenu;
