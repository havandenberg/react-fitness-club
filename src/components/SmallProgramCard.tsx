import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import l from '../styles/layout';
import { colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Program } from '../types/program';
import {
  getDivisionDiscountCost,
  getDivisionDiscountMonths,
  getDivisionMonthlyCost,
} from '../utils/program';
import { getDivisionById } from '../utils/program';
import { isMobileOnly, isSmall, isTabletUp } from '../utils/screensize';
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
    nameFontSize?: string | number | Array<string | number>;
    photoSideLength?: string | number | Array<string | number>;
    wrapper?: { [key: string]: string | number | Array<string | number> };
  };
  isActive?: boolean;
  divisionId?: string;
  nameLayout?: NameLayout;
  onClick?: () => void;
  program: Program;
  showCost?: boolean;
}) => {
  const division = divisionId && getDivisionById(divisionId, program);
  const styles = R.mergeDeepLeft(customStyles, initialStyles);
  const monthlyCost = getDivisionMonthlyCost(program, division && division.id);
  const discountCost = getDivisionDiscountCost(
    program,
    division && division.id,
  );
  const discountMonths = getDivisionDiscountMonths(
    program,
    division && division.id,
  );
  const hasDiscount = !R.equals(discountCost, monthlyCost);
  const NameComponent = R.equals(nameLayout, 'horizontal')
    ? l.Flex
    : l.FlexColumn;
  return (
    <SmallProgramCardWrapper onClick={onClick} {...styles.wrapper}>
      <NameComponent>
        <l.Img
          src={program.logoSrc}
          height={styles.photoSideLength}
          mb={spacing.t}
        />
        <l.Space width={[spacing.sm, spacing.ml, spacing.ml]} />
        <l.FlexColumn>
          <t.Text
            bold
            large
            fontSize={styles.nameFontSize}
            maxWidth={isTabletUp() ? 200 : undefined}>
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
      {showCost && (
        <l.FlexColumn alignTop={isMobileOnly()} ml={spacing.xl}>
          <t.Text large>{`$${monthlyCost} / month`}</t.Text>
          {hasDiscount && (
            <t.Text
              color={colors.gray}
              mt={spacing.sm}
              nowrap={
                !isSmall()
              }>{`$${discountCost} for first ${discountMonths} months`}</t.Text>
          )}
        </l.FlexColumn>
      )}
    </SmallProgramCardWrapper>
  );
};

export default SmallProgramCard;
