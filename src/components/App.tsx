import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { colors, maxWidth } from '../styles/theme';
import { Member, parseUserData } from '../types/member';
import { parsePrograms, Program } from '../types/program';
import {
  checkAuthed,
  listenForProgramChanges,
  listenForUserChanges,
  listenForUsersChanges,
} from '../utils/auth';
import {
  CalendarEvent,
  expandRecurringEvents,
  getEvents,
} from '../utils/events';
import About from './About';
import ClassManager from './ClassManager';
import Contact from './Contact';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Gallery from './Gallery';
import Hero from './Hero';
import withSubscribe, { SubscribeProps } from './hoc/withSubscribe';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import Programs from './Programs';
import Schedule from './Schedule';

const Main = styled('div')({
  background: colors.background,
  margin: '0 auto',
  maxWidth,
});

interface State {
  events: CalendarEvent[];
  loading: boolean;
  loadingEvents: boolean;
  loadingPrograms: boolean;
  loadingUser: boolean;
  loadingUsers: boolean;
  programs: Program[];
  user?: Member;
  users?: Member[];
}

class App extends React.Component<SubscribeProps, State> {
  state = {
    events: [],
    loading: true,
    loadingEvents: true,
    loadingPrograms: true,
    loadingUser: true,
    loadingUsers: true,
    programs: [],
    user: undefined,
    users: undefined,
  };

  componentDidMount() {
    checkAuthed(
      this.props.subscribe,
      this.authedCallback,
      this.unauthedCallback,
    );
  }

  authedCallback = (user: Member) => {
    this.setState({ user }, () => {
      listenForProgramChanges((programs: Program[]) =>
        this.setState(
          { programs: parsePrograms(programs), loadingPrograms: false },
          this.checkFinishedLoading,
        ),
      );
      listenForUserChanges(user.uid, (userData: Member) => {
        this.setState(
          { user: parseUserData(userData), loadingUser: false },
          this.checkFinishedLoading,
        );
      });
      listenForUsersChanges((usersData: { [key: string]: Member }) => {
        this.setState(
          {
            loadingUsers: false,
            users: R.values(usersData).map((member: Member) =>
              parseUserData(member),
            ),
          },
          this.checkFinishedLoading,
        );
      });
      getEvents().then(data => {
        this.setState(
          {
            events: expandRecurringEvents(data.items),
            loadingEvents: false,
          },
          this.checkFinishedLoading,
        );
      });
    });
  };

  checkFinishedLoading = () => {
    const {
      loadingPrograms,
      loadingEvents,
      loadingUser,
      loadingUsers,
    } = this.state;
    if (!loadingPrograms && !loadingEvents && !loadingUser && !loadingUsers) {
      this.setState({ loading: false });
    }
  };

  unauthedCallback = () => {
    this.setState({ loadingUser: false, user: undefined });
  };

  render() {
    const { events, loading, loadingUser, programs, user, users } = this.state;

    return (
      <Router>
        <Main id="top">
          <Nav user={user} />
          <Hero />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route exact path="/programs" component={Programs} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/contact" component={Contact} />
            <Route
              path="/schedule"
              render={props => (
                <Schedule
                  {...props}
                  events={events}
                  loading={loading}
                  programs={programs}
                  user={user}
                />
              )}
            />
            <Route
              path="/dashboard"
              render={props => (
                <Dashboard
                  {...props}
                  events={events}
                  loading={loading}
                  programs={programs}
                  user={user}
                />
              )}
            />
            <Route
              path="/programs/:programId/:classId"
              render={props => (
                <ClassManager
                  {...props}
                  events={events}
                  loading={loading}
                  programs={programs}
                  user={user}
                  users={users}
                />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login {...props} loading={loadingUser} user={user} />
              )}
            />
            <Redirect to="/" />
          </Switch>
          <Footer user={user} />
        </Main>
      </Router>
    );
  }
}

export default withSubscribe(App);
