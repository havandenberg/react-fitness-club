import * as React from 'react';
import styled from 'react-emotion';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import l from '../styles/layout';
import {
  breakpoints,
  colors,
  maxContentWidth,
  maxWidth,
} from '../styles/theme';
import { Member } from '../types/member';
import { parsePrograms, Program } from '../types/program';
import {
  checkAuthed,
  listenForProgramChanges,
  listenForUserChanges,
} from '../utils/auth';
import {
  CalendarEvent,
  expandRecurringEvents,
  getEvents,
} from '../utils/events';
import About from './About';
import Contact from './Contact';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Gallery from './Gallery';
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

export const Page = styled(l.Space)({
  background: colors.background,
  margin: '0 auto',
  maxWidth: maxContentWidth,
  position: 'relative',
  width: '90%',
  [breakpoints.mobile]: {
    width: '100%',
  },
});

interface State {
  events: CalendarEvent[];
  loading: boolean;
  loadingEvents: boolean;
  loadingPrograms: boolean;
  loadingUser: boolean;
  programs: Program[];
  user?: Member;
}

class App extends React.Component<SubscribeProps, State> {
  state = {
    events: [],
    loading: true,
    loadingEvents: true,
    loadingPrograms: true,
    loadingUser: true,
    programs: [],
    user: undefined,
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
      listenForUserChanges(user.uid, (userData: Member) =>
        this.setState(
          { user: userData, loadingUser: false },
          this.checkFinishedLoading,
        ),
      );
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
    const { loadingPrograms, loadingEvents, loadingUser } = this.state;
    if (!loadingPrograms && !loadingEvents && !loadingUser) {
      this.setState({ loading: false });
    }
  };

  unauthedCallback = () => {
    this.setState({ user: undefined });
  };

  render() {
    const { events, loading, programs, user } = this.state;
    return (
      <Router>
        <Main id="top">
          <Nav user={user} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/programs" component={Programs} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/contact" component={Contact} />
            <Route
              path="/schedule"
              render={props => (
                <Schedule {...props} events={events} loading={loading} programs={programs} user={user} />
              )}
            />
            <Route
              path="/dashboard"
              render={props => <Dashboard {...props} user={user} />}
            />
            <Route
              path="/login"
              render={props => <Login {...props} user={user} />}
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
