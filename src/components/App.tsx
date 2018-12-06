import * as firebase from 'firebase';
import * as React from 'react';
import styled from 'react-emotion';
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
import Footer from './Footer';
import Gallery from './Gallery';
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
  user: Member | null;
}

class App extends React.Component<{}, State> {
  state = {
    user: null,
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        const membersRef = firebase.database().ref('members');
        membersRef.child(user.uid).once('value', snapshot => {
          if (snapshot.exists()) {
            this.setState({ user: snapshot.val() });
          } else {
            const newMember = {
              ...newUserDefaults,
              email: user.email || '',
              firstName: user.displayName ? user.displayName.split(' ')[0] : '',
              lastName: user.displayName ? user.displayName.split(' ')[1] : '',
            };
            firebase
              .database()
              .ref(`members/${user.uid}`)
              .set(newMember, () => {
                this.setState({ user: newMember });
              });
          }
        });
      }
    });
  }

  logout = () => {
    auth.signOut().then(() => {
      this.setState({
        user: null,
      });
    });
  };

  login = (provider: AuthProvider, email?: string, password?: string) => {
    const authProvider = getAuthProvider(provider);
    if (provider !== 'email' && authProvider) {
      auth.signInWithPopup(authProvider);
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
            <Route path="/signup" component={Signup} />
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  login={this.login}
                  logout={this.logout}
                  user={user}
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
