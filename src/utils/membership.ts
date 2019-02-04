import * as moment from 'moment';
import * as R from 'ramda';
import { multipass } from '../content/memberships';
import { Member } from '../types/member';
import {
  InactivePeriod,
  Membership,
  MembershipType,
} from '../types/membership';
import { Program } from '../types/program';
import { getMemberRef } from './member';
import {
  getDivisionDiscountCost,
  getDivisionDiscountMonths,
  getDivisionMonthlyCost,
} from './program';

export const deactivateMembership = (member: Member) => {
  getMemberRef(member.uid).update({
    membership: {
      ...member.membership,
      inactivePeriods: JSON.stringify(
        member.membership.inactivePeriods.concat([
          { start: new Date(), end: '' },
        ]),
      ),
    },
  });
};

export const getGenericMembership: (
  type: MembershipType,
) => Membership = type => ({
  inactivePeriods: [],
  signupDate: '',
  type,
});

export const getMemberMonthlyCost = (
  member: Member,
  program?: Program,
  divisionId?: string,
) => {
  switch (member.membership.type) {
    case 'multipass':
      return hasDiscount(member, program, divisionId)
        ? multipass.monthlyCost * (1 - multipass.discountMultiplier)
        : multipass.monthlyCost;
    case 'coach':
    case 'student':
    case 'sponsored':
    case '':
      return 0;
    default:
      if (program) {
        const monthlyCost = getDivisionMonthlyCost(program, divisionId);
        const discountCost = getDivisionDiscountCost(program, divisionId);
        return hasDiscount(member, program, divisionId)
          ? discountCost
          : monthlyCost;
      }
      return 0;
  }
};

const getDiscount = (
  member: Member,
  program?: Program,
  divisionId?: string,
) => {
  let numMonths = 0;
  if (R.equals(member.membership.type, 'multipass')) {
    numMonths = multipass.discountMonths;
  } else if (program) {
    numMonths = getDivisionDiscountMonths(program, divisionId);
  }
  return moment().diff(member.membership.signupDate, 'months') < numMonths;
};

export const hasDiscount = (
  member: Member,
  program?: Program,
  divisionId?: string,
) => {
  if (
    !R.reduce(
      (hasPastMembershipsWithDiscounts: boolean, membership: Membership) =>
        hasPastMembershipsWithDiscounts &&
        getDiscount({ ...member, membership }),
      true,
      member.pastMemberships,
    )
  ) {
    return false;
  }
  return getDiscount(member, program, divisionId);
};

export const isInactiveMembership = (membership: Membership) =>
  R.find(
    (inactivePeriod: InactivePeriod) => R.isEmpty(inactivePeriod.end),
    membership.inactivePeriods,
  );
