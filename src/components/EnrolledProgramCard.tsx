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
import { Division, Program } from '../types/program';
import { formatDescriptiveDate } from '../utils/calendar-event';
import {
  generateNewClass,
  getClassInstIdFromEvent,
  getDivisionClassInstById,
  openClass,
} from '../utils/class';
import {
  getDivisionById,
  getEnrolledDivisions,
  isCoachOfProgram,
} from '../utils/program';
import { isMobileOnly } from '../utils/screensize';
import { getButtonProps } from './Form/Button';
import { SelectInput } from './Form/Input';
import { ProgramCardWrapper } from './UnenrolledProgramCard';

const MAX_EVENTS = 5;

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

interface Props {
  events: CalendarEvent[];
  isAdmin: boolean;
  program: Program;
  member: Member;
}

interface State {
  selectedDivisionId: string;
}

class EnrolledProgramCard extends React.Component<
  Props & RouteComponentProps,
  State
> {
  constructor(props: Props & RouteComponentProps) {
    super(props);

    const { member, program } = this.props;
    const enrolledDivisions = getEnrolledDivisions(program, member.uid);

    this.state = {
      selectedDivisionId: this.shouldShowAllDivisions()
        ? 'all'
        : !R.isEmpty(enrolledDivisions)
        ? enrolledDivisions[0].id
        : '',
    };
  }

  handleManageClass = (
    event: CalendarEvent,
    programId: string,
    divisionId: string,
    classInstId?: string,
  ) => {
    const { history } = this.props;
    if (classInstId) {
      history.push(`/programs/${programId}/${divisionId}/${classInstId}`);
    } else {
      openClass(generateNewClass(event), programId, divisionId).then(() =>
        history.push(
          `/programs/${programId}/${divisionId}/${getClassInstIdFromEvent(
            event,
          )}`,
        ),
      );
    }
  };

  handleSelectedDivisionChange = (selectedDivisionId: string) => {
    this.setState({ selectedDivisionId });
  };

  shouldShowAllDivisions = () => {
    const { isAdmin, member, program } = this.props;
    return isAdmin || isCoachOfProgram(member.uid, program);
  };

  render() {
    const { events, program, member } = this.props;
    const { selectedDivisionId } = this.state;

    const enrolledDivisions = getEnrolledDivisions(program, member.uid);

    const upcomingEvents = R.sortBy(
      (event: CalendarEvent) => moment(event.start).unix(),
      events.filter(
        (event: CalendarEvent) =>
          R.equals(event.programId, program.id) &&
          (R.equals(selectedDivisionId, 'all')
            ? this.shouldShowAllDivisions()
              ? true
              : R.contains(event.divisionId, R.pluck('id', enrolledDivisions))
            : R.equals(event.divisionId, selectedDivisionId)) &&
          moment().diff(event.start) < 0,
      ),
    ).slice(0, MAX_EVENTS);

    const divisionOptions = this.shouldShowAllDivisions()
      ? program.divisions
      : enrolledDivisions;

    return (
      <ProgramCardWrapper height={350}>
        <l.Flex alignTop mb={spacing.ml}>
          <l.Img
            src={program.logoSrc}
            width={spacing.xxxxxl}
            mr={[spacing.ml, spacing.ml, spacing.xl]}
          />
          <div>
            <t.H3 mb={spacing.t} mt={0}>
              {program.name}
            </t.H3>
            <SelectInput
              customStyles={{
                fontSize: fontSizes.helpText,
                height: isMobileOnly() ? 'auto' : spacing.xl,
                padding: spacing.t,
                width: 'auto',
              }}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                this.handleSelectedDivisionChange(e.currentTarget.value);
              }}
              value={selectedDivisionId}>
              {divisionOptions.length > 1 &&
                !R.equals(divisionOptions[0].id, 'all') && (
                  <option key="all" value="all">
                    All
                  </option>
                )}
              {divisionOptions.map((div: Division) => (
                <option key={`${program.id}-${div.id}`} value={div.id}>
                  {div.name}
                </option>
              ))}
            </SelectInput>
          </div>
        </l.Flex>
        <t.HelpText mb={spacing.t}>Upcoming classes:</t.HelpText>
        <l.Scroll height={150} overflow="auto">
          {upcomingEvents.map((event: CalendarEvent, index: number) => {
            const classInstId = getClassInstIdFromEvent(event);
            const eventDivision = getDivisionById(event.divisionId, program);
            const classInst =
              eventDivision &&
              getDivisionClassInstById(classInstId, eventDivision);
            return (
              <l.Flex
                key={`${event.programId}-${event.divisionId}-${classInstId}`}
                mb={index < upcomingEvents.length - 1 ? spacing.sm : undefined}
                spaceBetween>
                <div>
                  <ActiveText
                    bold
                    isGreen={moment().isBetween(
                      moment(event.start),
                      moment(event.end),
                    )}>
                    {formatDescriptiveDate(event)}
                  </ActiveText>
                  {R.equals(selectedDivisionId, 'all') &&
                    divisionOptions.length > 1 &&
                    eventDivision && (
                      <t.HelpText>{eventDivision.name}</t.HelpText>
                    )}
                </div>
                {isCoachOfProgram(member.uid, program) && eventDivision ? (
                  <ManageButton
                    onClick={() =>
                      this.handleManageClass(
                        event,
                        program.id,
                        eventDivision.id,
                        classInst && classInst.id,
                      )
                    }>
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
    );
  }
}

export default withRouter(EnrolledProgramCard);
