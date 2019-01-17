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
import { Member, parseMemberData } from '../types/member';
import { parsePrograms, Program } from '../types/program';
import {
  checkAuthed,
  listenForMemberChanges,
  listenForMembersChanges,
  listenForProgramChanges,
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
  loadingMember: boolean;
  loadingMembers: boolean;
  loadingPrograms: boolean;
  programs: Program[];
  member?: Member;
  members?: Member[];
}

class App extends React.Component<SubscribeProps, State> {
  state = {
    events: [],
    loading: true,
    loadingEvents: true,
    loadingMember: true,
    loadingMembers: true,
    loadingPrograms: true,
    member: undefined,
    members: undefined,
    programs: [],
  };

  componentDidMount() {
    checkAuthed(
      this.props.subscribe,
      this.authedCallback,
      this.unauthedCallback,
    );
  }

  authedCallback = (member: Member) => {
    this.setState({ member }, () => {
      listenForProgramChanges((programs: Program[]) =>
        this.setState(
          { programs: parsePrograms(programs), loadingPrograms: false },
          this.checkFinishedLoading,
        ),
      );
      listenForMemberChanges(member.uid, (memberData: Member) => {
        this.setState(
          { member: parseMemberData(memberData), loadingMember: false },
          this.checkFinishedLoading,
        );
      });
      listenForMembersChanges((membersData: { [key: string]: Member }) => {
        this.setState(
          {
            loadingMembers: false,
            members: R.values(membersData).map((mem: Member) =>
              parseMemberData(mem),
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
      loadingMember,
      loadingMembers,
    } = this.state;
    if (
      !loadingPrograms &&
      !loadingEvents &&
      !loadingMember &&
      !loadingMembers
    ) {
      this.setState({ loading: false });
    }
  };

  unauthedCallback = () => {
    this.setState({ loadingMember: false, member: undefined });
  };

  render() {
    const {
      events,
      loading,
      loadingMember,
      programs,
      member,
      members,
    } = this.state;
    // console.log(members);

    return (
      <Router>
        <Main id="top">
          <Nav member={member} />
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
                  member={member}
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
                  member={member}
                />
              )}
            />
            <Route
              path="/programs/:programId/:divisionId/:classInstId"
              render={props => (
                <ClassManager
                  {...props}
                  events={events}
                  loading={loading}
                  programs={programs}
                  member={member}
                  members={members}
                />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login {...props} loading={loadingMember} member={member} />
              )}
            />
            <Redirect to="/" />
          </Switch>
          <Footer member={member} />
        </Main>
      </Router>
    );
  }
}

export default withSubscribe(App);
