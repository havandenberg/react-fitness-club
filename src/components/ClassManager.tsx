import * as R from 'ramda';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import l from '../styles/layout';
import { colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { ClassInst } from '../types/class';
import { Member } from '../types/member';
import { Division, Program } from '../types/program';
import { SpecialEvent } from '../types/special-event';
import { formatDescriptiveDate } from '../utils/calendar-event';
import {
  getDivisionClassInstById,
  getSpecialEventClassInstById,
  toggleAttendingDivisionClass,
  toggleAttendingSpecialEventClass,
} from '../utils/class';
import { isCoach } from '../utils/member';
import { getDivisionById, getProgramById, isCoachOf } from '../utils/program';
import { isMobile, isMobileOnly } from '../utils/screensize';
import { getSpecialEventById } from '../utils/special-event';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import SmallMemberCard from './SmallMemberCard';

interface MatchParams {
  classInstId: string;
  divisionId: string;
  programId: string;
  specialEventId: string;
}

interface Props {
  specialEvents: SpecialEvent[];
  events: CalendarEvent[];
  loading: boolean;
  programs: Program[];
  member?: Member;
  members?: Member[];
}

class ClassManager extends React.Component<
  Props & RouteComponentProps<MatchParams>
> {
  toggleAttendingClass = (
    classInst: ClassInst,
    memberId: string,
    program?: Program,
    division?: Division,
    specialEvent?: SpecialEvent,
  ) => {
    if (specialEvent) {
      toggleAttendingSpecialEventClass(classInst, memberId, specialEvent.id);
    } else if (program && division) {
      toggleAttendingDivisionClass(
        classInst,
        memberId,
        program.id,
        division.id,
      );
    }
  };

  render() {
    const {
      loading,
      match,
      programs,
      member,
      members,
      specialEvents,
    } = this.props;
    const program = getProgramById(match.params.programId, programs);
    const division =
      program && getDivisionById(match.params.divisionId, program);
    const specialEvent = getSpecialEventById(
      match.params.specialEventId,
      specialEvents,
    );
    const classInst =
      (division &&
        getDivisionClassInstById(match.params.classInstId, division)) ||
      (specialEvent &&
        getSpecialEventClassInstById(match.params.classInstId, specialEvent));

    if (loading || !members) {
      return (
        <l.FlexCentered my={spacing.xxxxxl}>
          <PulseLoader sizeUnit="px" size={30} color={colors.black} />
        </l.FlexCentered>
      );
    }

    if (
      !member ||
      !classInst ||
      !((program && isCoachOf(member.uid, program)) || isCoach(member))
    ) {
      return <Redirect to="/" />;
    }

    const eventMembers = members.filter((mem: Member) =>
      R.contains(
        mem.uid,
        (division && division.memberIds) ||
          (specialEvent && specialEvent.memberIds) ||
          [],
      ),
    );

    const logoSrc = (program && program.logoSrc) || '';
    const name =
      (program && `${program.name} Class`) ||
      (specialEvent && 'Special Event') ||
      '';
    const divisionName =
      (division && `${division.name}`) ||
      (specialEvent && specialEvent.name) ||
      '';

    return (
      <div>
        <l.FlexCentered mb={spacing.sm}>
          {!isMobileOnly() && (
            <l.Img height={spacing.xxxxl} src={logoSrc} mr={spacing.xl} />
          )}
          <t.Title center>{name}</t.Title>
        </l.FlexCentered>
        <Divider white />
        <l.Page
          px={[spacing.sm, 0]}
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
          <l.FlexColumnCentered mb={spacing.xl}>
            <t.H3 color={colors.gray} mb={spacing.t}>
              {divisionName}
            </t.H3>
            <t.Text large>{formatDescriptiveDate(classInst.date)}</t.Text>
          </l.FlexColumnCentered>
          <t.H3 mb={spacing.ml}>Attendance:</t.H3>
          <l.Flex
            isWrap
            justifyContent={isMobile() ? 'center' : 'flex-start'}
            mb={spacing.ml}>
            {R.sortBy((mem: Member) => mem.lastName.toLowerCase())(
              eventMembers.filter((mem: Member) =>
                R.contains(mem.uid, classInst.attendanceIds),
              ),
            ).map((mem: Member, index: number) => (
              <React.Fragment key={index}>
                <SmallMemberCard
                  activeType="border"
                  isActive
                  member={mem}
                  onClick={() =>
                    this.toggleAttendingClass(
                      classInst,
                      mem.uid,
                      program,
                      division,
                      specialEvent,
                    )
                  }
                />
                {index < members.length - 1 && <l.Space width={spacing.ml} />}
              </React.Fragment>
            ))}
          </l.Flex>
          <l.Flex
            isWrap
            justifyContent={isMobile() ? 'center' : 'flex-start'}
            mb={spacing.ml}>
            {R.sortBy((mem: Member) => mem.lastName.toLowerCase())(
              eventMembers.filter(
                (mem: Member) => !R.contains(mem.uid, classInst.attendanceIds),
              ),
            ).map((mem: Member, index: number) => (
              <React.Fragment key={index}>
                <SmallMemberCard
                  activeType="border"
                  member={mem}
                  onClick={() =>
                    this.toggleAttendingClass(
                      classInst,
                      mem.uid,
                      program,
                      division,
                      specialEvent,
                    )
                  }
                />
                {index < members.length - 1 && <l.Space width={spacing.ml} />}
              </React.Fragment>
            ))}
          </l.Flex>
        </l.Page>
      </div>
    );
  }
}

export default withScroll(ClassManager);
