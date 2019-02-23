import * as firebase from 'firebase';
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
import { Alert } from '../types/alert';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import { Division, Program } from '../types/program';
import { SpecialEvent } from '../types/special-event';
import { parseAlerts } from '../utils/alert';
import {
  checkAuthed,
  listenForAlertsChanges,
  listenForMemberChanges,
  listenForProgramChanges,
  listenForSpecialEventsChanges,
} from '../utils/auth';
import { expandRecurringEvents, getEvents } from '../utils/calendar-event';
import { parseMemberData } from '../utils/member';
import { isCoachOf, parsePrograms } from '../utils/program';
import { parseSpecialEvents } from '../utils/special-event';
import About from './About';
import ClassManager from './ClassManager';
import Contact from './Contact';
import Dashboard from './Dashboard';
import Events from './Events';
import Footer from './Footer';
import Gallery from './Gallery';
import Hero from './Hero';
import withSubscribe, { SubscribeProps } from './hoc/withSubscribe';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import Programs from './Programs';
import Schedule from './Schedule';
import Signup from './Signup';

const Main = styled('div')({
  background: colors.background,
  margin: '0 auto',
  maxWidth,
});

interface LoadingMembersKey {
  loading: boolean;
  uid: string;
}

interface State {
  alerts: Alert[];
  events: CalendarEvent[];
  isAdmin: boolean;
  loading: boolean;
  loadingAlerts: boolean;
  loadingEvents: boolean;
  loadingMember: boolean;
  loadingMembers: LoadingMembersKey[];
  loadingPrograms: boolean;
  loadingSpecialEvents: boolean;
  member?: Member;
  members?: Member[];
  programs: Program[];
  specialEvents: SpecialEvent[];
}

class App extends React.Component<SubscribeProps, State> {
  constructor(props: SubscribeProps) {
    super(props);
    this.state = {
      alerts: [],
      events: [],
      isAdmin: false,
      loading: true,
      loadingAlerts: true,
      loadingEvents: true,
      loadingMember: true,
      loadingMembers: [],
      loadingPrograms: true,
      loadingSpecialEvents: true,
      member: undefined,
      members: undefined,
      programs: [],
      specialEvents: [],
    };
  }

  componentDidMount() {
    checkAuthed(
      this.props.subscribe,
      this.authedCallback,
      this.unauthedCallback,
    );
  }

  authedCallback = (member: Member) => {
    this.setState({ member }, () => {
      listenForAlertsChanges((alerts: Alert[]) =>
        this.setState(
          { alerts: parseAlerts(alerts), loadingAlerts: false },
          this.checkFinishedLoading,
        ),
      );
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
      listenForSpecialEventsChanges((events: SpecialEvent[]) => {
        this.setState(
          {
            loadingSpecialEvents: false,
            specialEvents: parseSpecialEvents(events),
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

  areMembersLoaded = (loadingMembers: LoadingMembersKey[]) =>
    !R.isEmpty(loadingMembers) &&
    R.reduce(
      (areLoaded: boolean, loadingMembersKey: LoadingMembersKey) =>
        areLoaded && !loadingMembersKey.loading,
      true,
      loadingMembers,
    );

  checkFinishedLoading = () => {
    const {
      loadingAlerts,
      loadingEvents,
      loadingMember,
      loadingMembers,
      loadingPrograms,
      loadingSpecialEvents,
      member,
      programs,
    } = this.state;
    const initialLoadingFinished =
      !loadingAlerts &&
      !loadingPrograms &&
      !loadingEvents &&
      !loadingMember &&
      !loadingSpecialEvents;
    if (initialLoadingFinished && member && R.isEmpty(loadingMembers)) {
      firebase
        .database()
        .ref('adminList')
        .child(member.uid)
        .once('value', snapshot => {
          if (snapshot.exists()) {
            this.setState(
              () => ({ isAdmin: true }),
              () => {
                firebase
                  .database()
                  .ref('membersList')
                  .once('value', snap => {
                    const members = JSON.parse(snap.val());
                    this.loadMembers(members);
                  });
              },
            );
          } else {
            const programsWithCoachAuth = programs.filter((program: Program) =>
              isCoachOf(member.uid, program),
            );
            if (!R.isEmpty(programsWithCoachAuth)) {
              const members = R.uniq(
                R.reduce(
                  (mems: string[], program: Program) =>
                    mems.concat(
                      R.reduce(
                        (ms: string[], division: Division) =>
                          ms.concat(division.memberIds),
                        [],
                        program.divisions,
                      ),
                    ),
                  [],
                  programsWithCoachAuth,
                ),
              );
              this.loadMembers(members);
            } else {
              this.setState({
                loading: false,
                loadingMembers: [{ loading: false, uid: '' }],
              });
            }
          }
        });
    } else if (
      initialLoadingFinished &&
      this.areMembersLoaded(loadingMembers)
    ) {
      this.setState({
        loading: false,
      });
    }
  };

  loadMembers = (members: string[]) => {
    const initialLoadingMembers = members.map((memId: string) => ({
      loading: true,
      uid: memId,
    }));
    this.setState({ loadingMembers: initialLoadingMembers }, () => {
      members.map((mem: string) =>
        listenForMemberChanges(mem, (memberData: Member) => {
          this.setState(
            prevState => ({
              loadingMembers: prevState.loadingMembers.map(
                (loadingMemberKey: LoadingMembersKey) =>
                  R.equals(loadingMemberKey.uid, mem)
                    ? { ...loadingMemberKey, loading: false }
                    : loadingMemberKey,
              ),
              members: prevState.members
                ? prevState.members.concat(parseMemberData(memberData))
                : [parseMemberData(memberData)],
            }),
            this.checkFinishedLoading,
          );
        }),
      );
    });
  };

  checkUnauthedFinishedLoading = () => {
    const {
      loadingAlerts,
      loadingEvents,
      loadingPrograms,
      loadingSpecialEvents,
    } = this.state;
    if (
      !loadingAlerts &&
      !loadingEvents &&
      !loadingPrograms &&
      !loadingSpecialEvents
    ) {
      this.setState({
        loading: false,
        loadingMember: false,
        member: undefined,
      });
    }
  };

  unauthedCallback = () => {
    listenForAlertsChanges((alerts: Alert[]) =>
      this.setState(
        { alerts: parseAlerts(alerts), loadingAlerts: false },
        this.checkUnauthedFinishedLoading,
      ),
    );
    listenForProgramChanges((programs: Program[]) =>
      this.setState(
        { programs: parsePrograms(programs), loadingPrograms: false },
        this.checkUnauthedFinishedLoading,
      ),
    );
    getEvents().then(data => {
      this.setState(
        {
          events: expandRecurringEvents(data.items),
          loadingEvents: false,
        },
        this.checkUnauthedFinishedLoading,
      );
    });
    listenForSpecialEventsChanges((events: SpecialEvent[]) => {
      this.setState(
        {
          loadingSpecialEvents: false,
          specialEvents: parseSpecialEvents(events),
        },
        this.checkUnauthedFinishedLoading,
      );
    });
  };

  render() {
    const {
      alerts,
      events,
      isAdmin,
      loading,
      loadingAlerts,
      loadingMember,
      loadingPrograms,
      loadingSpecialEvents,
      member,
      members,
      programs,
      specialEvents,
    } = this.state;

    return (
      <Router>
        <Main id="top">
          <Nav member={member} programs={programs} />
          <Hero
            alerts={alerts}
            loadingAlerts={loadingAlerts}
            specialEvents={specialEvents}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route
              exact
              path="/events"
              render={props => (
                <Events
                  {...props}
                  events={events}
                  loadingSpecialEvents={loadingSpecialEvents}
                  member={member}
                  members={members}
                  specialEvents={specialEvents}
                />
              )}
            />
            <Route
              exact
              path="/programs"
              render={props => (
                <Programs
                  {...props}
                  events={events}
                  loadingPrograms={loadingPrograms}
                  member={member}
                  members={members}
                  programs={programs}
                />
              )}
            />
            <Route path="/gallery" component={Gallery} />
            <Route
              path="/contact"
              render={props => <Contact {...props} programs={programs} />}
            />
            <Route
              path="/schedule"
              render={props => (
                <Schedule
                  {...props}
                  events={events}
                  loading={loading}
                  member={member}
                  programs={programs}
                  specialEvents={specialEvents}
                />
              )}
            />
            <Route
              path="/dashboard"
              render={props => (
                <Dashboard
                  {...props}
                  events={events}
                  isAdmin={isAdmin}
                  loading={loading}
                  programs={programs}
                  member={member}
                  members={members}
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
                  member={member}
                  members={members}
                  programs={programs}
                  specialEvents={specialEvents}
                />
              )}
            />
            <Route
              path="/events/:specialEventId/:classInstId"
              render={props => (
                <ClassManager
                  {...props}
                  events={events}
                  loading={loading}
                  member={member}
                  members={members}
                  programs={programs}
                  specialEvents={specialEvents}
                />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login {...props} loading={loadingMember} member={member} />
              )}
            />
            <Route
              path="/signup"
              render={props => (
                <Signup {...props} loading={loadingMember} member={member} />
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
