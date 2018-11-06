import * as React from 'react';
import styled from 'react-emotion';
import LogoImg from '../assets/images/logo.png';
import l from '../styles/layout';
import { headerHeight, spacing } from '../styles/theme';
import t from '../styles/typography';

const HeroWrapper = styled('div')({
  height: headerHeight,
});

const Logo = styled('img')({
  height: 200,
});

const Hero = () => (
  <HeroWrapper>
    <l.CenteredRow py={spacing.xl}>
      <Logo src={LogoImg} />
    </l.CenteredRow>
    <l.CenteredRow>
      <div>
        <t.Text large mt={spacing.ml}>
          React Fitness Club opening soon!
        </t.Text>
        <t.Text large mt={spacing.ml}>
          173 Grove Street
          <br />
          Worcester, MA 01605
        </t.Text>
        <t.Text large mt={spacing.ml}>
          Website Under Construction
        </t.Text>
        <t.Text large mt={spacing.ml}>
          Call 774-317-1267 for more info or to sign up
        </t.Text>
      </div>
    </l.CenteredRow>
  </HeroWrapper>
);

export default Hero;
