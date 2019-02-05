import * as R from 'ramda';
import * as React from 'react';
import { isInactiveMembership } from 'src/utils/membership';
import l from '../../styles/layout';
import { colors, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { CalendarEvent } from '../../types/calendar-event';
import { Member } from '../../types/member';
import { MULTI_PROGRAM_MEMBERSHIPS } from '../../types/membership';
import { Program } from '../../types/program';
import {
  getEnrolledDivision,
  getEnrolledPrograms,
  getProgramById,
} from '../../utils/program';
import EnrolledDivisionCard from '../EnrolledDivisionCard';
import withScroll from '../hoc/withScroll';
import ProgramCard from '../ProgramCard';

interface Props {
  events: CalendarEvent[];
  programs: Program[];
  member: Member;
}

class Programs extends React.Component<Props> {
  render() {
    const { events, programs, member } = this.props;
    const program = getProgramById(member.membership.type, programs);
    const enrolledPrograms: Program[] = R.contains(
      member.membership.type,
      MULTI_PROGRAM_MEMBERSHIPS,
    )
      ? getEnrolledPrograms(programs, member.uid)
      : program
      ? [program]
      : [];

    const unenrolledPrograms = enrolledPrograms.filter(
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
        <l.Flex columnOnMobile>
          {enrolledPrograms.map((prog: Program, index: number) => {
            const division = getEnrolledDivision(prog, member.uid);
            return (
              prog &&
              division && (
                <React.Fragment key={`enrolled-${prog.id}`}>
                  <EnrolledDivisionCard
                    events={events}
                    divisionId={division.id}
                    program={prog}
                    member={member}
                  />
                  {index < enrolledPrograms.length - 1 && (
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
              <t.H2 mb={spacing.xxl} mt={spacing.xxxxxl}>
                All Programs:
              </t.H2>
              <l.Flex columnOnMobile>
                {unenrolledPrograms.map((prog: Program, index: number) => (
                  <React.Fragment key={`all-${prog.id}`}>
                    <ProgramCard program={prog} member={member} />
                    {index < programs.length - 1 && (
                      <l.Space height={spacing.xl} width={spacing.xl} />
                    )}
                  </React.Fragment>
                ))}
              </l.Flex>
            </>
          )}
      </div>
    );
  }
}

export default withScroll(Programs);
