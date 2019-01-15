import * as R from 'ramda';
import * as React from 'react';
import l from '../../styles/layout';
import { spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { Member } from '../../types/member';
import { Program } from '../../types/program';
import { CalendarEvent } from '../../utils/events';
import withScroll from '../hoc/withScroll';
import { EnrolledProgramCard, ProgramCard } from '../ProgramCard';

interface Props {
  events: CalendarEvent[];
  programs: Program[];
  user: Member;
}

class Programs extends React.Component<Props> {
  render() {
    const { events, programs, user } = this.props;
    const enrolledPrograms = programs.filter((prog: Program) =>
      R.contains(user.uid, prog.members),
    );
    return (
      <div>
        <t.H2 mb={spacing.xxl}>Enrolled Programs:</t.H2>
        <l.Flex columnOnMobile>
          {enrolledPrograms.map((program: Program, index: number) => {
            return (
              program && (
                <React.Fragment key={`enrolled-${program.id}`}>
                  <EnrolledProgramCard
                    events={events}
                    program={program}
                    user={user}
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
            .filter((prog: Program) => !R.contains(user.uid, prog.members))
            .map((program: Program, index: number) => (
              <React.Fragment key={`all-${program.id}`}>
                <ProgramCard program={program} user={user} />
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
