import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { Redirect } from 'react-router-dom';
import l from '../../styles/layout';
import { borders, colors, spacing, transitions } from '../../styles/theme';
import t from '../../styles/typography';
import { Member } from '../../types/user';
import { logout } from '../../utils/auth';
import { isMobile } from '../../utils/screensize';
import { Page } from '../App';
import Divider from '../Divider';
import EditProfile from '../EditProfileForm';
import Hero from '../Hero';
import withScroll from '../hoc/withScroll';
import SetupForm from '../SetupForm';
import Profile from './Profile';

const NavItem = styled(t.Text)(
  ({ active, disabled }: { active?: boolean; disabled?: boolean }) => ({
    ':hover': {
      color: disabled ? `${colors.red}80` : colors.red,
    },
    borderBottom: !disabled && active ? borders.red : borders.transparent,
    color: !disabled && active ? colors.red : `${colors.red}80`,
    cursor: disabled ? 'default' : 'pointer',
    transition: transitions.default,
  }),
);

export type DashboardView = 'profile' | 'edit-profile' | 'programs';

interface Props {
  user?: Member;
}

interface State {
  view: DashboardView;
}

class Dashboard extends React.Component<Props, State> {
  state: State = {
    view: 'profile',
  };

  setView = (view: DashboardView) => {
    return () => this.setState({ view });
  };

  render() {
    const { user } = this.props;
    const { view } = this.state;
    return user ? (
      <div>
        <Hero secondary />
        <t.Title center mb={spacing.ml}>
          Dashboard
        </t.Title>
        <Divider white />
        <Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
          {user.isAccountSetupComplete && (
            <l.Flex
              alignTop
              mb={spacing.xxxl}
              justifyContent={isMobile() ? 'space-around' : 'center'}
            >
              <NavItem
                active={R.contains(view, ['profile', 'edit-profile'])}
                large
                onClick={this.setView('profile')}
              >
                Profile
              </NavItem>
              <l.Space width={[0, spacing.xxxxxl]} />
              <div>
                <NavItem
                  active={view === 'programs'}
                  disabled
                  large
                  // onClick={this.setView('programs')}
                >
                  My Programs
                </NavItem>
                <t.Text
                  center
                  color={`${colors.red}80`}
                  fontSize={10}
                  position="absolute"
                >
                  coming soon
                </t.Text>
              </div>
              <l.Space width={[0, spacing.xxxxxl]} />
              <t.TextButton
                color={`${colors.red}80`}
                hoverStyle="opacity"
                large
                onClick={logout}
              >
                Logout
              </t.TextButton>
            </l.Flex>
          )}
          {user.isAccountSetupComplete ? (
            <>
              {view === 'profile' && (
                <Profile setView={this.setView('edit-profile')} user={user} />
              )}
              {view === 'edit-profile' && (
                <EditProfile setView={this.setView('profile')} user={user} />
              )}
            </>
          ) : (
            <SetupForm user={user} />
          )}
        </Page>
        <l.Space height={100} />
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default withScroll(Dashboard);
