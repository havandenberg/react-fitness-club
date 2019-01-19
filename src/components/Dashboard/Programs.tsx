import * as R from 'ramda';
import * as React from 'react';
import l from '../../styles/layout';
import { spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { Member } from '../../types/member';
import { Program } from '../../types/program';
import { CalendarEvent } from '../../utils/events';
import { getEnrolledDivision, getEnrolledPrograms } from '../../utils/program';
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
    const enrolledPrograms = getEnrolledPrograms(programs, member.uid);
    return (
      <div>
        <t.H2 mb={spacing.xxl}>Enrolled Programs:</t.H2>
        <l.Flex columnOnMobile>
          {enrolledPrograms.map((program: Program, index: number) => {
            const division = getEnrolledDivision(program, member.uid);
            return (
              program &&
              division && (
                <React.Fragment key={`enrolled-${program.id}`}>
                  <EnrolledDivisionCard
                    events={events}
                    divisionId={division.id}
                    program={program}
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
        <t.H2 mb={spacing.xxl} mt={spacing.xxxxxl}>
          All Programs:
        </t.H2>
        <l.Flex columnOnMobile>
          {programs
            .filter(
              (prog: Program) =>
                !R.contains(prog.id, R.pluck('id', enrolledPrograms)),
            )
            .map((program: Program, index: number) => (
              <React.Fragment key={`all-${program.id}`}>
                <ProgramCard program={program} member={member} />
                {index < programs.length - 1 && (
                  <l.Space height={spacing.xl} width={spacing.xl} />
                )}
              </React.Fragment>
            ))}
        </l.Flex>
      </div>
    );
  }
}

export default withScroll(Programs);
