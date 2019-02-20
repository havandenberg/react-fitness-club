import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { Redirect } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import * as Sticky from 'react-stickynode';
import l from '../../styles/layout';
import { borders, colors, spacing, transitions, z } from '../../styles/theme';
import t from '../../styles/typography';
import { CalendarEvent } from '../../types/calendar-event';
import { Member } from '../../types/member';
import { Program } from '../../types/program';
import { logout } from '../../utils/auth';
import { isMobileOnly, isTabletUp } from '../../utils/screensize';
import { scrollToId } from '../../utils/scroll';
import Divider from '../Divider';
import EditProfile from '../EditProfileForm';
import withScroll from '../hoc/withScroll';
import SetupForm from '../SetupForm';
import Admin from './Admin';
import Membership from './Membership';
import Profile from './Profile';
import Programs from './Programs';

export const NavItem = styled(t.Text)(
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

export type DashboardView =
  | 'profile'
  | 'edit-profile'
  | 'programs'
  | 'admin'
  | 'membership';

interface Props {
  events: CalendarEvent[];
  isAdmin: boolean;
  loading: boolean;
  programs: Program[];
  member?: Member;
  members?: Member[];
}

interface State {
  view: DashboardView;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      view:
        props.member && R.isEmpty(props.member.membership.type)
          ? 'membership'
          : 'programs',
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { member } = this.props;
    if (!prevProps.member && !!member) {
      this.setState({
        view:
          member && R.isEmpty(member.membership.type)
            ? 'membership'
            : 'programs',
      });
    }
  }

  setView = (view: DashboardView) => {
    return () => {
      this.setState({ view });
      scrollToId('dashboard-top');
    };
  };

  render() {
    const { events, isAdmin, loading, programs, member, members } = this.props;
    const { view } = this.state;
    return loading ? (
      <l.FlexCentered my={spacing.xxxxxl}>
        <PulseLoader sizeUnit="px" size={30} color={colors.black} />
      </l.FlexCentered>
    ) : member ? (
      <l.Space id="dashboard-top" position="relative">
        <t.Title center mb={spacing.ml}>
          Dashboard
        </t.Title>
        <Divider white />
        <l.Page
          px={[spacing.sm, 0]}
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
          {member.isAccountSetupComplete && (
            <>
              <Sticky
                enabled={isTabletUp()}
                innerZ={z.high}
                top="#nav-end"
                bottomBoundary="#dashboard-end">
                <l.FlexCentered
                  background={colors.background}
                  columnOnMobile
                  py={spacing.s}>
                  <l.Flex alignTop mb={[spacing.ml, 0, 0]}>
                    {!R.isEmpty(member.membership.type) && (
                      <>
                        <NavItem
                          active={view === 'programs'}
                          large
                          onClick={this.setView('programs')}>
                          Programs
                        </NavItem>
                        <l.Space width={spacing.xxxxxl} />
                      </>
                    )}
                    <NavItem
                      active={R.contains(view, ['profile', 'edit-profile'])}
                      large
                      onClick={this.setView('profile')}>
                      Profile
                    </NavItem>
                    {!isMobileOnly() && <l.Space width={[0, spacing.xxxxxl]} />}
                  </l.Flex>
                  <l.Flex alignTop>
                    {members ? (
                      <NavItem
                        active={view === 'admin'}
                        large
                        onClick={this.setView('admin')}>
                        Admin
                      </NavItem>
                    ) : (
                      <NavItem
                        active={R.contains(view, ['membership'])}
                        large
                        onClick={this.setView('membership')}>
                        Membership
                      </NavItem>
                    )}
                    <l.Space width={spacing.xxxxxl} />
                    <t.TextButton
                      color={colors.red}
                      hoverStyle="opacity"
                      large
                      onClick={logout}>
                      Logout
                    </t.TextButton>
                  </l.Flex>
                </l.FlexCentered>
              </Sticky>
              <l.Space height={spacing.xxxl} />
            </>
          )}
          {member.isAccountSetupComplete ? (
            <>
              {view === 'profile' && (
                <Profile
                  setView={this.setView('edit-profile')}
                  member={member}
                />
              )}
              {view === 'edit-profile' && (
                <EditProfile
                  setView={this.setView('profile')}
                  member={member}
                />
              )}
              {view === 'programs' && (
                <Programs
                  events={events}
                  isAdmin={isAdmin}
                  programs={programs}
                  member={member}
                />
              )}
              {view === 'admin' && members && (
                <Admin
                  isAdmin={isAdmin}
                  member={member}
                  members={members}
                  programs={programs}
                />
              )}
              {view === 'membership' && (
                <Membership
                  events={events}
                  member={member}
                  programs={programs}
                  setProgramView={this.setView('programs')}
                />
              )}
            </>
          ) : (
            <SetupForm member={member} />
          )}
        </l.Page>
        <l.Space id="dashboard-end" height={100} />
      </l.Space>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default withScroll(Dashboard);
