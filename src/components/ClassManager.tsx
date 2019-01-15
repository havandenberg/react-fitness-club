import * as R from 'ramda';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import l from '../styles/layout';
import { colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { getProgramById, isCoachOf, Program } from '../types/program';
import { getClassInstById } from '../utils/class';
import { CalendarEvent, formatDescriptiveDate } from '../utils/events';
import { isMobileOnly } from '../utils/screensize';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import SmallMemberCard from './SmallMemberCard';

interface MatchParams {
  programId: string;
  classId: string;
}

interface Props {
  events: CalendarEvent[];
  loading: boolean;
  programs: Program[];
  user?: Member;
  users?: Member[];
}

class ClassManager extends React.Component<
  Props & RouteComponentProps<MatchParams>
> {
  render() {
    const { loading, match, programs, user, users } = this.props;
    const program = getProgramById(match.params.programId, programs);
    const classInst =
      program && getClassInstById(match.params.classId, program);

    if (loading || !users) {
      return (
        <l.FlexCentered my={spacing.xxxxxl}>
          <PulseLoader sizeUnit="px" size={30} color={colors.black} />
        </l.FlexCentered>
      );
    }

    if (!program || !user || !classInst || !isCoachOf(user, program)) {
      return <Redirect to="/" />;
    }

    const programUsers = R.sortBy(R.prop('lastName'))(
      users.filter((u: Member) => R.contains(u.uid, program.members)),
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
          <t.Text mb={spacing.ml}>Attendance:</t.Text>
          <l.Flex isWrap mb={spacing.ml}>
            {programUsers
              .filter((member: Member) =>
                R.contains(member.uid, classInst.membersAttended),
              )
              .map((member: Member, index: number) => (
                <React.Fragment key={index}>
                  <SmallMemberCard
                    classInst={classInst}
                    member={member}
                    program={program}
                  />
                  {index < users.length - 1 && (
                    <l.Space height={spacing.ml} width={spacing.ml} />
                  )}
                </React.Fragment>
              ))}
          </l.Flex>
          <l.Flex isWrap mb={spacing.ml}>
            {programUsers
              .filter(
                (member: Member) =>
                  !R.contains(member.uid, classInst.membersAttended),
              )
              .map((member: Member, index: number) => (
                <React.Fragment key={index}>
                  <SmallMemberCard
                    classInst={classInst}
                    member={member}
                    program={program}
                  />
                  {index < users.length - 1 && <l.Space height={spacing.ml} width={spacing.ml} />}
                </React.Fragment>
              ))}
          </l.Flex>
        </l.Page>
      </div>
    );
  }
}

export default withScroll(ClassManager);
