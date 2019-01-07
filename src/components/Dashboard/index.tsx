import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { Redirect } from 'react-router-dom';
import l from '../../styles/layout';
import { borders, colors, spacing, transitions } from '../../styles/theme';
import t from '../../styles/typography';
import { Member } from '../../types/user';
import { Page } from '../App';
import Divider from '../Divider';
import Hero from '../Hero';
import withScroll from '../hoc/withScroll';
import SetupForm from '../SetupForm';

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

type DashboardView = 'profile' | 'profile-editing' | 'programs';

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
            <l.FlexCentered mb={spacing.xxxl}>
              <NavItem
                active={view === 'programs'}
                disabled
                large
                // onClick={this.setView('programs')}
              >
                My Programs
              </NavItem>
              <l.Space width={spacing.xxxxxl} />
              <NavItem
                active={R.contains(view, ['profile', 'profile-editing'])}
                large
                onClick={this.setView('profile')}
              >
                Profile
              </NavItem>
            </l.FlexCentered>
          )}
          {!user.isAccountSetupComplete && <SetupForm user={user} />}
        </Page>
        <l.Space height={100} />
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default withScroll(Dashboard);
