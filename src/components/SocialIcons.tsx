import * as React from 'react';
import styled from 'react-emotion';
import fbIcon from '../assets/images/facebook.svg';
import igIcon from '../assets/images/instagram.svg';
import l from '../styles/layout';
import { breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';

const SocialIcon = styled('img')(
  {
    background: colors.background,
    borderRadius: 10,
    cursor: 'pointer',
  },
  ({ small }: { small?: boolean }) => ({
    height: small ? spacing.xl : spacing.xxl,
    width: small ? spacing.xl : spacing.xxl,
    [breakpoints.small]: {
      height: spacing.xl,
      width: spacing.xl,
    },
  }),
);

const SocialIcons = ({ small }: { small?: boolean }) => (
  <l.Flex>
    <t.Anchor href="https://www.facebook.com/REaCT.Nat/" target="_blank">
      <SocialIcon small={small} src={fbIcon} />
    </t.Anchor>
    <l.Space ml={[spacing.s, spacing.m]} />
    <t.Anchor href="https://www.instagram.com/react.nation/" target="_blank">
      <SocialIcon small={small} src={igIcon} />
    </t.Anchor>
  </l.Flex>
);

export default SocialIcons;
