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
import { getDivisionById, isCoachOf } from '../utils/program';
import { getButtonProps } from './Form/Button';
import { SelectInput } from './Form/Input';
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

interface Props {
  divisionId?: string;
  events: CalendarEvent[];
  isAdmin: boolean;
  program: Program;
  member: Member;
}

interface State {
  selectedDivisionId: string;
}

class EnrolledDivisionCard extends React.Component<
  Props & RouteComponentProps,
  State
> {
  constructor(props: Props & RouteComponentProps) {
    super(props);

    const { divisionId, isAdmin, member, program } = this.props;

    this.state = {
      selectedDivisionId:
        isAdmin || isCoachOf(member.uid, program) ? 'all' : divisionId || '',
    };
  }

  handleManageClass = (
    event: CalendarEvent,
    programId: string,
    classInstId?: string,
  ) => {
    const { history } = this.props;
    const { selectedDivisionId } = this.state;
    if (classInstId) {
      history.push(
        `/programs/${programId}/${selectedDivisionId}/${classInstId}`,
      );
    } else {
      openClass(generateNewClass(event), programId, selectedDivisionId).then(
        () =>
          history.push(
            `/programs/${programId}/${selectedDivisionId}/${classInstId}`,
          ),
      );
    }
  };

  handleSelectedDivisionChange = (selectedDivisionId: string) => {
    this.setState({ selectedDivisionId });
  };

  render() {
    const { events, isAdmin, program, member } = this.props;
    const { selectedDivisionId } = this.state;

    const maxEvents = R.equals(selectedDivisionId, 'all') ? 5 : 2;

    const upcomingEvents = R.sortBy(
      (event: CalendarEvent) => moment(event.start).unix(),
      events.filter(
        (event: CalendarEvent) =>
          R.equals(event.programId, program.id) &&
          (R.equals(selectedDivisionId, 'all')
            ? true
            : R.equals(event.divisionId, selectedDivisionId)) &&
          moment().diff(event.start) < 0,
      ),
    ).slice(0, maxEvents);

    const division = selectedDivisionId
      ? getDivisionById(selectedDivisionId, program)
      : undefined;

    return (
      <ProgramCardWrapper height={[250, 350]} width={['100%', '50%']}>
        <l.Flex alignTop mb={spacing.ml}>
          <l.Img src={program.logoSrc} height={spacing.xxxl} mr={spacing.xl} />
          <div>
            <t.H3 mt={0}>{program.name}</t.H3>
            {isAdmin || isCoachOf(member.uid, program) ? (
              <SelectInput
                customStyles={{
                  fontSize: fontSizes.helpText,
                  height: spacing.xl,
                  width: 'auto',
                }}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  this.handleSelectedDivisionChange(e.currentTarget.value);
                }}
                value={selectedDivisionId}>
                <option value="all">All</option>
                {program.divisions.map((div: Division) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
              </SelectInput>
            ) : (
              division && <t.Text color={colors.gray}>{division.name}</t.Text>
            )}
          </div>
        </l.Flex>
        <t.HelpText mb={spacing.t}>Upcoming classes:</t.HelpText>
        <l.Scroll height={150} overflow="auto">
          {upcomingEvents.map((event: CalendarEvent, index: number) => {
            const classInstId = getClassInstIdFromEvent(event);
            const classInst =
              division && getDivisionClassInstById(classInstId, division);
            const eventDivision = getDivisionById(event.divisionId, program);
            return (
              <l.Flex
                key={classInstId}
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
                  {R.equals(selectedDivisionId, 'all') && eventDivision && (
                    <t.HelpText>{eventDivision.name}</t.HelpText>
                  )}
                </div>
                {isCoachOf(member.uid, program) ? (
                  <ManageButton
                    onClick={() =>
                      this.handleManageClass(
                        event,
                        program.id,
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

export default withRouter(EnrolledDivisionCard);
