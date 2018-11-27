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
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import Gallery from './Gallery';
import Home from './Home';
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

const App = () => (
  <Router>
    <Main id="top">
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/programs" component={Programs} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/contact" component={Contact} />
        <Route path="/schedule" component={Schedule} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Main>
  </Router>
);

export default App;
