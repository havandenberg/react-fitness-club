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
import { Division, isCoachOf, parsePrograms, Program } from '../types/program';
import {
  checkAuthed,
  listenForMemberChanges,
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

interface LoadingMembersKey {
  loading: boolean;
  uid: string;
}

interface State {
  events: CalendarEvent[];
  loading: boolean;
  loadingEvents: boolean;
  loadingMember: boolean;
  loadingMembers: LoadingMembersKey[];
  loadingPrograms: boolean;
  programs: Program[];
  member?: Member;
  members?: Member[];
}

class App extends React.Component<SubscribeProps, State> {
  constructor(props: SubscribeProps) {
    super(props);
    this.state = {
      events: [],
      loading: true,
      loadingEvents: true,
      loadingMember: true,
      loadingMembers: [],
      loadingPrograms: true,
      member: undefined,
      members: undefined,
      programs: [],
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
      loadingPrograms,
      loadingEvents,
      loadingMember,
      loadingMembers,
      member,
      programs,
    } = this.state;
    const initialLoadingFinished =
      !loadingPrograms && !loadingEvents && !loadingMember;
    if (initialLoadingFinished && member && R.isEmpty(loadingMembers)) {
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
        ).concat([member.uid]);
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
                    : [],
                }),
                this.checkFinishedLoading,
              );
            }),
          );
        });
      } else {
        this.setState({
          loading: false,
          loadingMembers: [{ loading: false, uid: '' }],
        });
      }
    } else if (
      initialLoadingFinished &&
      this.areMembersLoaded(loadingMembers)
    ) {
      this.setState({
        loading: false,
      });
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
