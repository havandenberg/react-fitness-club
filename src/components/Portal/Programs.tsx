import * as R from 'ramda';
import * as React from 'react';
import { isMobileOnly, isTabletOnly } from 'src/utils/screensize';
import l from '../../styles/layout';
import { colors, spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { CalendarEvent } from '../../types/calendar-event';
import { Member } from '../../types/member';
import { MULTI_PROGRAM_MEMBERSHIPS } from '../../types/membership';
import { Program } from '../../types/program';
import { isInactiveMembership } from '../../utils/membership';
import { getEnrolledPrograms, getMembershipProgram } from '../../utils/program';
import EnrolledProgramCard from '../EnrolledProgramCard';
import Grid from '../Grid';
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

    const isMultiProgramMembership = R.contains(
      member.membership.type,
      MULTI_PROGRAM_MEMBERSHIPS,
    );
    const membershipProgram = getMembershipProgram(member.membership, programs);
    const enrolledPrograms = getEnrolledPrograms(programs, member.uid);
    const filteredEnrolledPrograms: Program[] = isMultiProgramMembership
      ? enrolledPrograms
      : membershipProgram
      ? [
          membershipProgram,
          ...enrolledPrograms.filter(
            (prog: Program) => prog.noMembershipRequired,
          ),
        ]
      : [];

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
        <Grid
          alignTop
          id="shop-grid"
          itemSpacing={spacing.ml}
          itemWidth={['100%', '44%', '45%']}
          maxColumns={isMobileOnly() ? 1 : 2}>
          {filteredEnrolledPrograms.map((prog: Program) => (
            <EnrolledProgramCard
              events={events}
              isAdmin={isAdmin}
              key={`unenrolled-${prog.id}`}
              program={prog}
              member={member}
            />
          ))}
        </Grid>
        <t.H2 my={spacing.xxl}>
          {`${isMultiProgramMembership ? 'All' : 'Available'}`} Programs:
        </t.H2>
        <Grid
          alignTop
          id="shop-grid"
          itemSpacing={spacing.ml}
          itemWidth={['100%', '44%', '28%']}
          maxColumns={isMobileOnly() ? 1 : isTabletOnly() ? 2 : 3}>
          {programs
            .filter(
              (prog: Program) =>
                !R.contains(prog.id, R.pluck('id', enrolledPrograms)) &&
                (isMultiProgramMembership ? true : prog.noMembershipRequired),
            )
            .map((prog: Program) => (
              <UnenrolledProgramCard
                key={`enrolled-${prog.id}`}
                program={prog}
                member={member}
              />
            ))}
        </Grid>
      </div>
    );
  }
}

export default withScroll(Programs);
