import * as moment from 'moment';
import * as R from 'ramda';
import * as React from 'react';
import l from '../../styles/layout';
import { colors, fontSizes, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { CalendarEvent } from '../../types/calendar-event';
import { Member } from '../../types/member';
import { InactivePeriod } from '../../types/membership';
import { Program } from '../../types/program';
import { getMemberRef } from '../../utils/member';
import {
  deactivateMembership,
  getMemberCost,
  isInactiveMembership,
} from '../../utils/membership';
import { getMembershipProgram } from '../../utils/program';
import MembershipBadge from '../MembershipBadge';
import MembershipForm from './MembershipForm';
import SwitchMembership from './SwitchMembership';

export interface MembershipProps {
  events: CalendarEvent[];
  member: Member;
  programs: Program[];
  setProgramView?: () => void;
}

interface State {
  isDeactivatingMembership: boolean;
  isReactivatingMembership: boolean;
  isSwitchingMembership: boolean;
}

class Membership extends React.Component<MembershipProps, State> {
  state = {
    isDeactivatingMembership: false,
    isReactivatingMembership: false,
    isSwitchingMembership: false,
  };

  handleDeactivateMembership = () => {
    const { member } = this.props;
    const { isDeactivatingMembership } = this.state;

    if (!isDeactivatingMembership) {
      this.setState({ isDeactivatingMembership: true });
    } else {
      deactivateMembership(member);
      this.setState({ isDeactivatingMembership: false });
    }
  };

  handleReactivateMembership = () => {
    const { member } = this.props;
    const { isReactivatingMembership } = this.state;

    if (!isReactivatingMembership) {
      this.setState({ isReactivatingMembership: true });
    } else {
      const inactivePeriod = isInactiveMembership(member.membership);
      if (inactivePeriod) {
        getMemberRef(member.uid).update({
          membership: {
            ...member.membership,
            inactivePeriods: JSON.stringify(
              member.membership.inactivePeriods.map((ip: InactivePeriod) =>
                R.equals(ip.start, inactivePeriod.start)
                  ? { ...inactivePeriod, end: new Date() }
                  : ip,
              ),
            ),
          },
        });
      }
      this.setState({ isReactivatingMembership: false });
    }
  };

  render() {
    const { member, programs } = this.props;
    const {
      isDeactivatingMembership,
      isReactivatingMembership,
      isSwitchingMembership,
    } = this.state;

    const program = getMembershipProgram(member.membership, programs);

    const isInactive = isInactiveMembership(member.membership);

    const cost = getMemberCost(member, program);

    if (R.isEmpty(member.membership.type)) {
      return <MembershipForm events {...this.props} />;
    }

    if (isSwitchingMembership) {
      return (
        <SwitchMembership
          cancelSwitchMembership={() =>
            this.setState({ isSwitchingMembership: false })
          }
          member={member}
          programs={programs}
        />
      );
    }

    return (
      <l.FlexColumnCentered>
        <MembershipBadge
          customStyles={{
            nameFontSize: fontSizes.h3,
            photoSideLength: [spacing.xxxl, spacing.xxxxl, spacing.xxxxl],
            wrapper: { mb: 0, p: 0, width: 'auto' },
          }}
          membership={member.membership}
          program={program}
          nameLayout="horizontal"
        />
        <l.Space height={spacing.xxxl} />
        <l.FlexColumnCentered mx="auto" width={['100%', '60%', '60%']}>
          {!isInactive && (
            <>
              <l.Flex mb={spacing.sm} width="100%">
                <t.Text large flex={1} textAlign="right">
                  Monthly Cost:
                </t.Text>
                <l.Space width={[spacing.ml, spacing.xxxl, spacing.xxxl]} />
                {cost < 0 ? (
                  <t.Text large flex={1}>
                    N/A
                  </t.Text>
                ) : (
                  <t.Text large flex={1}>
                    ${cost}
                  </t.Text>
                )}
              </l.Flex>
              <l.Flex mb={spacing.sm} width="100%">
                <t.Text large flex={1} textAlign="right">
                  Signup Date:{' '}
                </t.Text>
                <l.Space width={[spacing.ml, spacing.xxxl, spacing.xxxl]} />
                <t.Text large flex={1}>
                  {moment(member.membership.signupDate).format('MM/DD/YYYY')}
                </t.Text>
              </l.Flex>
            </>
          )}
          {isInactive && (
            <>
              <t.Text center large mb={spacing.xxxl}>
                Your membership is inactive.
              </t.Text>
              <t.TextButton
                onClick={
                  isReactivatingMembership
                    ? undefined
                    : this.handleReactivateMembership
                }>
                <l.Flex columnOnMobile>
                  Reactivate
                  <l.Space height={spacing.m} width={spacing.sm} />
                  <MembershipBadge
                    bypassInactive
                    customStyles={{
                      badge: {
                        p: spacing.s,
                      },
                      badgeText: {
                        fontSize: [
                          fontSizes.helpText,
                          fontSizes.helpText,
                          fontSizes.helpText,
                        ],
                        fontWeight: 'normal',
                      },
                      wrapper: {
                        mb: 0,
                        p: 0,
                      },
                    }}
                    membership={member.membership}
                    nameLayout="horizontal"
                    program={program}
                  />
                  <l.Space height={spacing.s} width={spacing.sm} />
                  <t.Text nowrap>
                    (${getMemberCost(member, program)} / month)
                  </t.Text>
                </l.Flex>
              </t.TextButton>
            </>
          )}
          <l.Space height={isInactive ? spacing.xl : spacing.xxxl} />
          {isDeactivatingMembership && (
            <>
              <t.Text center color={colors.red}>
                Are you sure you want to deactivate your membership?
                <l.Break />
                You can reactivate it at any time.
              </t.Text>
              <l.Space height={spacing.xl} />
            </>
          )}
          {isReactivatingMembership && (
            <>
              <t.Text center>
                Glad to have you back! Please confirm your reactivation below.
              </t.Text>
              <l.Space height={spacing.xl} />
            </>
          )}
          {!isDeactivatingMembership && !isReactivatingMembership && (
            <t.TextButton
              center
              mb={spacing.ml}
              onClick={() => this.setState({ isSwitchingMembership: true })}>
              Switch Membership
            </t.TextButton>
          )}
          {(!isInactive || isReactivatingMembership) && (
            <l.FlexCentered width={['80%', 'auto', 'auto']}>
              {(isDeactivatingMembership || isReactivatingMembership) && (
                <t.TextButton
                  center
                  color={colors.black}
                  onClick={() =>
                    this.setState({
                      isDeactivatingMembership: false,
                      isReactivatingMembership: false,
                    })
                  }
                  mr={spacing.xl}>
                  Cancel
                </t.TextButton>
              )}
              <t.TextButton
                center
                onClick={
                  isReactivatingMembership
                    ? this.handleReactivateMembership
                    : this.handleDeactivateMembership
                }>
                {isReactivatingMembership ? 'R' : 'D'}eactivate Membership
              </t.TextButton>
            </l.FlexCentered>
          )}
        </l.FlexColumnCentered>
      </l.FlexColumnCentered>
    );
  }
}

export default Membership;
