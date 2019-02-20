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
import {
  getEnrolledDivision,
  getEnrolledPrograms,
  getProgramById,
} from '../../utils/program';
import { isMobileOnly } from '../../utils/screensize';
import EnrolledDivisionCard from '../EnrolledDivisionCard';
import withScroll from '../hoc/withScroll';
import ProgramCard from '../ProgramCard';

interface Props {
  events: CalendarEvent[];
  isAdmin: boolean;
  programs: Program[];
  member: Member;
}

class Programs extends React.Component<Props> {
  render() {
    const { events, isAdmin, programs, member } = this.props;
    const program = getProgramById(member.membership.type, programs);
    const enrolledPrograms: Program[] = R.contains(
      member.membership.type,
      MULTI_PROGRAM_MEMBERSHIPS,
    )
      ? getEnrolledPrograms(programs, member.uid)
      : program
      ? [program]
      : [];

    const unenrolledPrograms = programs.filter(
      (prog: Program) => !R.contains(prog.id, R.pluck('id', enrolledPrograms)),
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
            const division = getEnrolledDivision(prog, member.uid);
            const showSpacer = isMobileOnly()
              ? index < enrolledPrograms.length - 1
              : index + (1 % 2) < 2;
            return (
              prog &&
              division && (
                <React.Fragment key={`enrolled-${prog.id}`}>
                  <EnrolledDivisionCard
                    divisionId={division.id}
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
        {R.contains(member.membership.type, MULTI_PROGRAM_MEMBERSHIPS) &&
          !R.isEmpty(unenrolledPrograms) && (
            <>
              <t.H2 my={spacing.xxl}>All Programs:</t.H2>
              <l.Flex columnOnMobile isWrap>
                {unenrolledPrograms.map((prog: Program, index: number) => {
                  const showSpacer = isMobileOnly()
                    ? index < programs.length - 1
                    : index + (1 % 3) < 3;
                  return (
                    <React.Fragment key={`all-${prog.id}`}>
                      <ProgramCard program={prog} member={member} />
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
