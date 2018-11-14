import * as React from 'react';
import styled from 'react-emotion';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import l from '../styles/layout';
import {
  breakpoints,
  colors,
  maxContentWidth,
  maxWidth,
  spacing,
} from '../styles/theme';
import Footer from './Footer';
import Home from './Home';
import Nav from './Nav';

const Main = styled('div')({
  background: colors.background,
  margin: '0 auto',
  maxWidth,
});

export const Page = styled(l.Space)({
  background: colors.background,
  margin: '0 auto',
  maxWidth: maxContentWidth,
  padding: `${spacing.xxxxxl} 0`,
  position: 'relative',
  width: '90%',
  [breakpoints.mobile]: {
    padding: `${spacing.xxxl} ${spacing.sm}`,
    width: '100%',
  },
});

const App = () => (
  <Router>
    <Main>
      <Nav />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={Home} />
      <Route path="/programs" component={Home} />
      <Route path="/gallery" component={Home} />
      <Route path="/contact" component={Home} />
      <Redirect to="/" />
      <Footer />
    </Main>
  </Router>
);

export default App;
