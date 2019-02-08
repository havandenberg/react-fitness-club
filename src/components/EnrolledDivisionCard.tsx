import * as moment from 'moment';
import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { space } from 'styled-system';
import l from '../styles/layout';
import {
  breakpoints,
  colors,
  fontSizes,
  gradients,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import { Program } from '../types/program';
import { formatDescriptiveDate } from '../utils/calendar-event';
import {
  generateNewClass,
  getClassInstIdFromEvent,
  getDivisionClassInstById,
  openClass,
} from '../utils/class';
import { getDivisionById, isCoachOf } from '../utils/program';
import { getButtonProps } from './Form/Button';
import { ProgramCardWrapper } from './ProgramCard';

const ActiveText = styled(t.Text)(
  ({ isGreen }: { isGreen: boolean }) => ({
    color: isGreen ? colors.green : colors.black,
  }),
  space,
);

const ManageButton = styled('button')(
  getButtonProps(colors.green, gradients.green),
  {
    fontSize: fontSizes.small,
    padding: 6,
    width: 64,
    [breakpoints.mobile]: { padding: 6 },
  },
);

const EnrolledDivisionCard = withRouter(
  ({
    divisionId,
    events,
    history,
    program,
    member,
  }: {
    divisionId: string;
    events: CalendarEvent[];
    program: Program;
    member: Member;
  } & RouteComponentProps) => {
    const upcomingEvents = events.filter(
      (event: CalendarEvent) =>
        R.equals(event.programId, program.id) &&
        R.equals(event.divisionId, divisionId) &&
        moment().diff(event.start) < 0,
    );

    const division = getDivisionById(divisionId, program);

    return division ? (
      <ProgramCardWrapper height={[250, 350]} width={['100%', '50%']}>
        <l.Flex alignTop mb={spacing.ml}>
          <l.Img src={program.logoSrc} height={spacing.xxxl} mr={spacing.xl} />
          <div>
            <t.H3 mt={0}>{program.name}</t.H3>
            <t.Text color={colors.gray}>{division.name}</t.Text>
          </div>
        </l.Flex>
        <t.HelpText mb={spacing.t}>Upcoming classes:</t.HelpText>
        <l.Scroll height={200} overflow="auto">
          {upcomingEvents
            .slice(0, 2)
            .map((event: CalendarEvent, index: number) => {
              const classInstId = getClassInstIdFromEvent(event);
              const classInst = getDivisionClassInstById(classInstId, division);
              const handleManageClass = () => {
                if (classInst) {
                  history.push(
                    `/programs/${program.id}/${divisionId}/${classInstId}`,
                  );
                } else {
                  openClass(
                    generateNewClass(event),
                    program.id,
                    divisionId,
                  ).then(() =>
                    history.push(
                      `/programs/${program.id}/${divisionId}/${classInstId}`,
                    ),
                  );
                }
              };
              return (
                <l.Flex
                  key={classInstId}
                  mb={index === 0 ? spacing.sm : undefined}
                  spaceBetween>
                  <ActiveText
                    bold
                    isGreen={moment().isBetween(
                      moment(event.start),
                      moment(event.end),
                    )}>
                    {formatDescriptiveDate(event)}
                  </ActiveText>
                  {isCoachOf(member.uid, program) ? (
                    <ManageButton onClick={handleManageClass}>
                      Manage
                    </ManageButton>
                  ) : (
                    classInst &&
                    R.contains(member.uid, classInst.attendanceIds) && (
                      <ActiveText isGreen italic>
                        Signed In
                      </ActiveText>
                    )
                  )}
                </l.Flex>
              );
            })}
        </l.Scroll>
      </ProgramCardWrapper>
    ) : (
      <div />
    );
  },
);

export default EnrolledDivisionCard;
