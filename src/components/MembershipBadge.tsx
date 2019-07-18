import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { fontSize, space } from 'styled-system';
import { multipass } from '../content/memberships';
import l from '../styles/layout';
import {
  borders,
  colors,
  fontSizes,
  gradients,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import { Membership } from '../types/membership';
import { Program } from '../types/program';
import { StyleSet, StyleValue } from '../types/styles';
import { isInactiveMembership } from '../utils/membership';
import { isMobileOnly } from '../utils/screensize';
import SmallProgramCard from './SmallProgramCard';

export type NameLayout = 'horizontal' | 'vertical';

export const multipassCost = (
  <l.FlexColumn
    alignTop={isMobileOnly()}
    ml={isMobileOnly() ? spacing.ml : undefined}>
    <t.Text large mb={spacing.sm}>
      {multipass.cost}
    </t.Text>
  </l.FlexColumn>
);

const Badge = styled(l.Space)(
  {
    borderRadius: borders.radius,
    padding: `${spacing.sm} ${spacing.ml}`,
  },
  ({ background }: { background: string }) => ({
    background,
  }),
  fontSize,
  space,
);

const MembershipBadge = ({
  bypassInactive,
  customStyles,
  divisionId,
  membership,
  nameLayout = 'vertical',
  program,
  showCost,
}: {
  bypassInactive?: boolean;
  customStyles?: {
    badge?: StyleSet;
    badgeText?: StyleSet;
    nameFontSize?: StyleValue;
    photoSideLength?: StyleValue;
    wrapper?: StyleSet;
  };
  divisionId?: string;
  membership: Membership;
  nameLayout?: NameLayout;
  program?: Program;
  showCost?: boolean;
}) => {
  const styles = R.mergeDeepLeft({ wrapper: {} }, customStyles || {});

  if (!bypassInactive && isInactiveMembership(membership)) {
    return (
      <Badge background={gradients.gray} {...styles.badge}>
        <t.H2 color={colors.white} {...styles.badgeText}>
          Inactive
        </t.H2>
      </Badge>
    );
  }

  if (
    !R.isEmpty(membership.type) &&
    !R.equals(membership.type, 'multipass') &&
    program
  ) {
    return (
      <SmallProgramCard
        customStyles={styles}
        divisionId={divisionId}
        nameLayout={nameLayout}
        program={program}
        showCost={showCost}
      />
    );
  }
  switch (membership.type) {
    case 'multipass':
      return (
        <l.Flex>
          <Badge background={gradients.multipass} {...styles.badge}>
            <t.H2 color={colors.white} nowrap {...styles.badgeText}>
              Multi-Pass
            </t.H2>
          </Badge>
          {showCost && (
            <>
              <l.Space nowrap width={spacing.xl} />
              {multipassCost}
            </>
          )}
        </l.Flex>
      );
    case 'coach':
      return (
        <Badge background={gradients.red} {...styles.badge}>
          <t.H2 color={colors.white} {...styles.badgeText}>
            Coach
          </t.H2>
        </Badge>
      );
    case 'sponsored':
      return (
        <Badge background={gradients.sponsoredGreen} {...styles.badge}>
          <t.H2 color={colors.white} {...styles.badgeText}>
            Sponsored
          </t.H2>
        </Badge>
      );
    case 'student':
      return (
        <Badge background={gradients.gold} {...styles.badge}>
          <t.H2 color={colors.white} {...styles.badgeText}>
            Student
          </t.H2>
        </Badge>
      );
    default:
      return <div />;
  }
};

export default MembershipBadge;

const TinyBadge = styled(Badge)({
  borderRadius: 2,
  height: spacing.m,
  padding: 0,
  width: spacing.xxl,
});

const TinyBadgeWithText = ({
  background,
  text,
}: {
  background: string;
  text?: string;
}) => (
  <l.Flex>
    {text && (
      <>
        <t.Text color={colors.white} fontSize={fontSizes.helpText} nowrap>
          {text}
        </t.Text>
        <l.Space width={spacing.sm} />
      </>
    )}
    <TinyBadge background={background} />
  </l.Flex>
);

export const TinyMembershipBadge = ({
  membership,
  program,
  showText,
}: {
  membership: Membership;
  program?: Program;
  showText?: boolean;
}) => {
  if (isInactiveMembership(membership)) {
    return (
      <TinyBadgeWithText
        background={gradients.gray}
        text={showText ? 'Inactive' : undefined}
      />
    );
  }
  if (
    !R.isEmpty(membership.type) &&
    !R.equals(membership.type, 'multipass') &&
    program
  ) {
    return (
      <l.Flex alignTop>
        <l.Img height={spacing.ml} src={program.logoSrc} />
        {showText && (
          <>
            <l.Space width={spacing.sm} />
            <t.Text color={colors.white} fontSize={fontSizes.helpText}>
              {program.name}
            </t.Text>
          </>
        )}
      </l.Flex>
    );
  }
  switch (membership.type) {
    case 'multipass':
      return (
        <TinyBadgeWithText
          background={gradients.multipass}
          text={showText ? 'Multi-Pass' : undefined}
        />
      );
    case 'coach':
      return (
        <TinyBadgeWithText
          background={gradients.red}
          text={showText ? 'Coach' : undefined}
        />
      );
    case 'sponsored':
      return (
        <TinyBadgeWithText
          background={gradients.sponsoredGreen}
          text={showText ? 'Sponsored' : undefined}
        />
      );
    case 'student':
      return (
        <TinyBadgeWithText
          background={gradients.gold}
          text={showText ? 'Student' : undefined}
        />
      );
    default:
      return <div />;
  }
};
