import * as firebase from 'firebase';
import * as React from 'react';
import styled from 'react-emotion';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { auth, AuthProvider, getAuthProvider } from '../firebase';
import l from '../styles/layout';
import {
  breakpoints,
  colors,
  maxContentWidth,
  maxWidth,
} from '../styles/theme';
import { Member, newUserDefaults } from '../types/user';
import About from './About';
import Contact from './Contact';
import Dashboard from './Dashboard';
import Footer from './Footer';
import Gallery from './Gallery';
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

class App extends React.Component<{}, State> {
  state = { user: undefined };

  componentDidMount() {
    const membersRef = firebase.database().ref('members');
    auth.onAuthStateChanged(user => {
      if (user) {
        membersRef.child(user.uid).once('value', snapshot => {
          if (snapshot.exists()) {
            this.setState({ user: snapshot.val() }, () =>
              this.listenForUserChanges(snapshot.val()),
            );
          } else {
            const newUser = {
              ...newUserDefaults,
              email: user.email || '',
              firstName: user.displayName ? user.displayName.split(' ')[0] : '',
              lastName: user.displayName ? user.displayName.split(' ')[1] : '',
              uid: user.uid,
            };
            firebase
              .database()
              .ref(`members/${user.uid}`)
              .set(newUser, () => {
                this.setState({ user: newUser }, () =>
                  this.listenForUserChanges(newUser),
                );
              });
          }
        });
      }
    });
  }

  listenForUserChanges = (user: Member) => {
    firebase
      .database()
      .ref(`members/${user.uid}`)
      .on('value', snapshot => {
        if (snapshot) {
          this.setState({ user: snapshot.val() });
        }
      });
  };

  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: undefined,
      });
    });
  };

  login = (subscribe: (data: object) => void) => (
    provider: AuthProvider,
    email?: string,
    password?: string,
  ) => {
    const authProvider = getAuthProvider(provider);

    if (provider !== 'email' && authProvider) {
      auth
        .signInWithPopup(authProvider)
        .then((data: firebase.auth.UserCredential) => {
          if (data.user) {
            const membersRef = firebase.database().ref('members');
            membersRef.child(data.user.uid).once('value', snapshot => {
              if (!snapshot.exists() && data.user) {
                subscribe(
                  this.mailchimpUser(data.user.displayName, data.user.email),
                );
              }
            });
          }
        });
    } else if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((data: firebase.auth.UserCredential) => {
          if (data.user) {
            const membersRef = firebase.database().ref('members');
            membersRef.child(data.user.uid).once('value', snapshot => {
              this.setState({ user: snapshot.val() });
            });
          }
        });
    }
  };

  mailchimpUser = (
    displayName: string | null,
    emailAddress: string | null,
  ) => ({
    EMAIL: emailAddress,
    FNAME: displayName && displayName.split(' ')[0],
    LNAME: displayName && displayName.split(' ')[1],
    SOURCE: 'web-portal-form',
  });

  render() {
    const { user } = this.state;
    return (
      <Router>
        <Main id="top">
          <Nav logout={this.logout} user={user} />
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
              render={props => (
                <MailchimpSubscribe
                  render={({ subscribe }) => (
                    <Login
                      {...props}
                      login={this.login(subscribe)}
                      logout={this.logout}
                      user={user}
                    />
                  )}
                  url={process.env.REACT_APP_MAILCHIMP_URI || ''}
                />
              )}
            />
            <Redirect to="/" />
          </Switch>
          <Footer />
        </Main>
      </Router>
    );
  }
}

export default App;
