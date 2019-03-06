import * as R from 'ramda';
import * as React from 'react';
import l from '../../styles/layout';
import { colors, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { CalendarEvent } from '../../types/calendar-event';
import { Member } from '../../types/member';
import { MULTI_PROGRAM_MEMBERSHIPS } from '../../types/membership';
import { Program } from '../../types/program';
import { isInactiveMembership } from '../../utils/membership';
import { getEnrolledPrograms } from '../../utils/program';
import { isMobileOnly, isTabletOnly } from '../../utils/screensize';
import EnrolledProgramCard from '../EnrolledProgramCard';
import withScroll from '../hoc/withScroll';
import UnenrolledProgramCard from '../UnenrolledProgramCard';

interface Props {
  events: CalendarEvent[];
  isAdmin: boolean;
  programs: Program[];
  member: Member;
}

class Programs extends React.Component<Props> {
  render() {
    const { events, isAdmin, programs, member } = this.props;
    const enrolledPrograms: Program[] = getEnrolledPrograms(
      programs,
      member.uid,
    );

    if (isInactiveMembership(member.membership)) {
      return (
        <t.Text center color={colors.red} large>
          Your membership is inactive.
          <l.Break />
          Please reactivate your membership to view your programs.
        </t.Text>
      );
    }

    return (
      <div>
        <t.H2 mb={spacing.xxl}>Enrolled Programs:</t.H2>
        <l.Flex columnOnMobile isWrap>
          {enrolledPrograms.map((prog: Program, index: number) => {
            const showSpacer = isMobileOnly()
              ? index < enrolledPrograms.length - 1
              : index % 2 < 1;
            return (
              prog && (
                <React.Fragment key={`enrolled-${prog.id}`}>
                  <EnrolledProgramCard
                    events={events}
                    isAdmin={isAdmin}
                    program={prog}
                    member={member}
                  />
                  {showSpacer && (
                    <l.Space height={spacing.xl} width={spacing.xl} />
                  )}
                </React.Fragment>
              )
            );
          })}
        </l.Flex>
        {R.contains(member.membership.type, MULTI_PROGRAM_MEMBERSHIPS) && (
          <>
            <t.H2 my={spacing.xxl}>All Programs:</t.H2>
            <l.Flex columnOnMobile isWrap>
              {programs.map((prog: Program, index: number) => {
                const showSpacer = isMobileOnly()
                  ? index < programs.length - 1
                  : isTabletOnly()
                  ? index % 2 < 1
                  : index % 3 < 2;
                return (
                  <React.Fragment key={`all-${prog.id}`}>
                    <UnenrolledProgramCard program={prog} member={member} />
                    {showSpacer && (
                      <l.Space height={spacing.xl} width={spacing.xl} />
                    )}
                  </React.Fragment>
                );
              })}
            </l.Flex>
          </>
        )}
      </div>
    );
  }
}

export default withScroll(Programs);
