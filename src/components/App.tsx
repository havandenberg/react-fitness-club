import * as React from 'react';
import styled from 'react-emotion';
import { colors, maxWidth } from '../styles/theme';
import Hero from './Hero';

const Main = styled('div')({
  margin: '0 auto',
  maxWidth,
});

const Page = styled('div')({
  background: colors.background,
  margin: '0 auto',
  position: 'relative',
});

const App = () => (
  <Main>
    <Hero />
    <Page />
  </Main>
);

export default App;
