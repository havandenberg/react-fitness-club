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
import { Member } from '../types/user';
import { checkAuthed, listenForUserChanges } from '../utils/auth';
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
  user?: Member;
}

class App extends React.Component<SubscribeProps, State> {
  state = { user: undefined };

  componentDidMount() {
    checkAuthed(
      this.props.subscribe,
      this.authedCallback,
      this.unauthedCallback,
    );
  }

  authedCallback = (user: Member) => {
    this.setState({ user }, () =>
      listenForUserChanges(user.uid, (userData: Member) =>
        this.setState({ user: userData }),
      ),
    );
  };

  unauthedCallback = () => {
    this.setState({ user: undefined });
  };

  render() {
    const { user } = this.state;
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
            <Route path="/schedule" component={Schedule} />
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
