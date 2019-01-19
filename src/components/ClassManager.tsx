import * as R from 'ramda';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import l from '../styles/layout';
import { colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { Program } from '../types/program';
import { getClassInstById, toggleAttendingClass } from '../utils/class';
import { CalendarEvent, formatDescriptiveDate } from '../utils/events';
import { getDivisionById, getProgramById, isCoachOf } from '../utils/program';
import { isMobile, isMobileOnly } from '../utils/screensize';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import SmallMemberCard from './SmallMemberCard';

interface MatchParams {
  classInstId: string;
  divisionId: string;
  programId: string;
}

interface Props {
  events: CalendarEvent[];
  loading: boolean;
  programs: Program[];
  member?: Member;
  members?: Member[];
}

class ClassManager extends React.Component<
  Props & RouteComponentProps<MatchParams>
> {
  render() {
    const { loading, match, programs, member, members } = this.props;
    const program = getProgramById(match.params.programId, programs);
    const division =
      program && getDivisionById(match.params.divisionId, program);
    const classInst =
      division && getClassInstById(match.params.classInstId, division);

    if (loading || !members) {
      return (
        <l.FlexCentered my={spacing.xxxxxl}>
          <PulseLoader sizeUnit="px" size={30} color={colors.black} />
        </l.FlexCentered>
      );
    }

    if (
      !program ||
      !member ||
      !division ||
      !classInst ||
      !isCoachOf(member.uid, program)
    ) {
      return <Redirect to="/" />;
    }

    const divisionMembers = R.sortBy(R.prop('lastName'))(
      members.filter((mem: Member) => R.contains(mem.uid, division.memberIds)),
    );

    return (
      <div>
        <l.FlexCentered mb={spacing.sm}>
          {!isMobileOnly() && (
            <l.Img
              height={spacing.xxxxl}
              src={program.logoSrc}
              mr={spacing.xl}
            />
          )}
          <t.Title center>{program.name} Class</t.Title>
        </l.FlexCentered>
        <Divider white />
        <l.Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
          <l.FlexCentered mb={spacing.xl}>
            <t.H3>{formatDescriptiveDate(classInst.date)}</t.H3>
          </l.FlexCentered>
          <t.H3 mb={spacing.ml}>Attendance:</t.H3>
          <l.Flex
            isWrap
            justifyContent={isMobile() ? 'center' : 'flex-start'}
            mb={spacing.ml}
          >
            {divisionMembers
              .filter((mem: Member) =>
                R.contains(mem.uid, classInst.attendanceIds),
              )
              .map((mem: Member, index: number) => (
                <React.Fragment key={index}>
                  <SmallMemberCard
                    activeType="border"
                    isActive
                    member={mem}
                    onClick={() =>
                      toggleAttendingClass(
                        classInst,
                        mem.uid,
                        program.id,
                        division.id,
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
            mb={spacing.ml}
          >
            {divisionMembers
              .filter(
                (mem: Member) => !R.contains(mem.uid, classInst.attendanceIds),
              )
              .map((mem: Member, index: number) => (
                <React.Fragment key={index}>
                  <SmallMemberCard
                    activeType="border"
                    member={mem}
                    onClick={() =>
                      toggleAttendingClass(
                        classInst,
                        mem.uid,
                        program.id,
                        division.id,
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
