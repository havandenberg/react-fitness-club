import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import l from '../styles/layout';
import { colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Program } from '../types/program';
import { StyleSet, StyleValue } from '../types/styles';
import { getDivisionById, getDivisionCost } from '../utils/program';
import { isTabletUp } from '../utils/screensize';
import { NameLayout } from './MembershipBadge';

const SmallProgramCardWrapper = styled(l.FlexCentered)(
  ({ onClick }: { onClick?: () => void }) => ({
    cursor: onClick ? 'pointer' : 'default',
  }),
);

const initialStyles = {
  nameFontSize: undefined,
  photoSideLength: [spacing.xxl, spacing.xxxl, spacing.xxxl],
  wrapper: {
    mb: spacing.ml,
    p: [spacing.s, spacing.sm, spacing.sm],
    width: '100%',
  },
};

const SmallProgramCard = ({
  customStyles = initialStyles,
  divisionId,
  nameLayout = 'vertical',
  onClick,
  program,
  showCost,
}: {
  customStyles?: {
    nameFontSize?: StyleValue;
    photoSideLength?: StyleValue;
    wrapper?: StyleSet;
  };
  divisionId?: string;
  nameLayout?: NameLayout;
  onClick?: () => void;
  program: Program;
  showCost?: boolean;
}) => {
  const division = divisionId && getDivisionById(divisionId, program);
  const styles = R.mergeDeepLeft(customStyles, initialStyles);
  const cost = getDivisionCost(program, division && division.id);
  const NameComponent = R.equals(nameLayout, 'horizontal')
    ? l.Flex
    : l.FlexColumn;
  return (
    <SmallProgramCardWrapper onClick={onClick} {...styles.wrapper}>
      <NameComponent>
        {!R.isEmpty(program.logoSrc) && (
          <l.Img
            src={program.logoSrc}
            height={styles.photoSideLength}
            mb={spacing.t}
          />
        )}
        <l.Space width={[spacing.sm, spacing.ml, spacing.ml]} />
        <l.FlexColumn>
          <t.Text
            bold
            large
            fontSize={styles.nameFontSize}
            maxWidth={isTabletUp() ? 200 : undefined}
            nowrap>
            {program.name}
          </t.Text>
          {division && (
            <t.Text
              color={colors.gray}
              maxWidth={isTabletUp() ? 200 : undefined}>
              {division.name}
            </t.Text>
          )}
        </l.FlexColumn>
      </NameComponent>
      {showCost && <t.Text ml={spacing.xl}>{cost}</t.Text>}
    </SmallProgramCardWrapper>
  );
};

export default SmallProgramCard;
