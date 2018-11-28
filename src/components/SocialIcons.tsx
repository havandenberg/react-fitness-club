import * as React from 'react';
import styled from 'react-emotion';
import fbIcon from '../assets/images/facebook.svg';
import igIcon from '../assets/images/instagram.svg';
import l from '../styles/layout';
import { breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { FACEBOOK_PATH, INSTAGRAM_PATH } from '../utils/constants';
import { isMobile } from '../utils/screensize';

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

const SocialIconsWrapper = styled(l.Flex)(
  ({ showLabels }: { showLabels?: boolean }) => ({
    [breakpoints.tablet]: {
      alignItems: 'flex-start',
      flexDirection: showLabels ? 'column' : 'row',
    },
  }),
);

const SocialLabel = styled(t.Text)({
  marginLeft: spacing.ml,
  [breakpoints.mobile]: {
    marginLeft: spacing.sm,
  },
});

const SocialIcons = ({
  showLabels,
  small,
}: {
  showLabels?: boolean;
  small?: boolean;
}) => (
  <SocialIconsWrapper
    showLabels={showLabels}
    spaceBetween={isMobile() && showLabels}
  >
    <t.Anchor href={FACEBOOK_PATH} mb={[0, spacing.ml, 0]} target="_blank">
      <SocialIcon small={small} src={fbIcon} />
      {showLabels && <SocialLabel>REaCT.Nat</SocialLabel>}
    </t.Anchor>
    <l.Space ml={[spacing.s, spacing.m]} />
    {showLabels && <l.Space ml={[0, spacing.ml]} />}
    <t.Anchor href={INSTAGRAM_PATH} target="_blank">
      <SocialIcon small={small} src={igIcon} />
      {showLabels && <SocialLabel>react.nation</SocialLabel>}
    </t.Anchor>
  </SocialIconsWrapper>
);

export default SocialIcons;
