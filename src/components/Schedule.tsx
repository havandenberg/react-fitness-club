import * as moment from 'moment';
import * as R from 'ramda';
import * as React from 'react';
import BigCalendar, { View } from 'react-big-calendar';
import styled from 'react-emotion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import ScheduleImg from '../assets/images/schedule.svg';
import { programContent } from '../content/programs';
import l from '../styles/layout';
import { breakpoints, colors, gradients, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { FilterPrimaryCategory } from '../types/filter';
import { Member } from '../types/member';
import { Division, Program } from '../types/program';
import { SpecialEvent } from '../types/special-event';
import {
  generateNewClass,
  getClassInstIdFromEvent,
  getDivisionClassInstById,
  getSpecialEventClassInstById,
  openClass,
  openSpecialEventClass,
} from '../utils/class';
import { isCoach } from '../utils/member';
import { getDivisionById, getProgramById, isCoachOf } from '../utils/program';
import { isMobileOnly, isTabletOnly } from '../utils/screensize';
import { getSpecialEventById } from '../utils/special-event';
import Divider from './Divider';
import FilterBar, { FilterProps } from './FilterBar';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const localizer = BigCalendar.momentLocalizer(moment);

const LegendIcon = styled(l.Space)({
  borderRadius: 2,
  height: spacing.sm,
  marginRight: spacing.s,
  width: spacing.sm,
});

const LegendSet = styled(l.FlexColumn)({
  [breakpoints.tablet]: {
    flexDirection: 'row',
  },
});

interface Props {
  events: CalendarEvent[];
  specialEvents: SpecialEvent[];
  loading: boolean;
  programs: Program[];
  member?: Member;
}

interface State {
  calendarView: View;
}

class Schedule extends React.Component<Props & RouteComponentProps, State> {
  constructor(props: Props & RouteComponentProps) {
    super(props);
    this.state = {
      calendarView: isMobileOnly()
        ? BigCalendar.Views.AGENDA
        : BigCalendar.Views.WEEK,
    };
  }

  filterEvents = (
    searchValue: string,
    programId: string,
    divisionId: string,
  ) => {
    const { events } = this.props;

    return events.filter((event: CalendarEvent) => {
      const isValidProgram =
        R.equals(programId, 'all') ||
        (R.equals(programId, 'events') &&
          R.equals(event.divisionId, 'events')) ||
        (R.equals(event.programId, 'openmat') &&
          !R.equals(programId, 'events')) ||
        R.equals(event.programId, programId);
      const isValidDivision =
        R.equals(divisionId, 'all') ||
        R.equals(programId, 'events') ||
        R.equals(event.divisionId, divisionId);
      const values = R.values(
        R.pick(['description', 'summary', 'location'], event),
      );

      return (
        isValidProgram &&
        isValidDivision &&
        R.reduce(
          (containsSearchValue: boolean, value: string) => {
            return (
              containsSearchValue ||
              (value
                ? R.contains(searchValue.toLowerCase(), value.toLowerCase())
                : false)
            );
          },
          false,
          values,
        )
      );
    });
  };

  getEventProps = (event: CalendarEvent) => {
    const program = getProgramById(event.programId, this.props.programs);
    const isOpenMat = R.equals(event.programId, 'openmat');
    const isProgramEvent = R.equals(event.divisionId, 'events');

    const commonStyles = {
      color: colors.white,
    };

    if (R.equals(this.state.calendarView, BigCalendar.Views.AGENDA)) {
      return {};
    }

    if (isOpenMat) {
      return {
        style: {
          ...commonStyles,
          background: gradients.multipass,
        },
      };
    }
    if (isProgramEvent) {
      return {
        style: {
          ...commonStyles,
          background: colors.purple,
        },
      };
    }
    if (program) {
      return {
        style: {
          ...commonStyles,
          background: program.eventBackground,
          color: program.eventColor,
        },
      };
    }
    return {};
  };

  handleSelectEvent = (
    event: CalendarEvent,
    program?: Program,
    division?: Division,
  ) => {
    const { history, member, specialEvents } = this.props;
    if (member) {
      const classId = getClassInstIdFromEvent(event);
      if (isCoach(member) && R.equals(event.divisionId, 'events')) {
        const specialEvent = getSpecialEventById(
          event.specialEventId,
          specialEvents,
        );
        if (specialEvent) {
          if (getSpecialEventClassInstById(classId, specialEvent)) {
            history.push(`/events/${specialEvent.id}/${classId}`);
          } else {
            openSpecialEventClass(
              generateNewClass(event),
              specialEvent.id,
            ).then(() => history.push(`/events/${specialEvent.id}/${classId}`));
          }
        }
      } else if (program && division && isCoachOf(member.uid, program)) {
        if (getDivisionClassInstById(classId, division)) {
          history.push(`/programs/${program.id}/${division.id}/${classId}`);
        } else {
          openClass(generateNewClass(event), program.id, division.id).then(() =>
            history.push(`/programs/${program.id}/${division.id}/${classId}`),
          );
        }
      }
    }
  };

  render() {
    const { events, loading, programs } = this.props;
    const { calendarView } = this.state;
    const categories: FilterPrimaryCategory[] = R.map(
      (program: Program) => ({
        id: program.id,
        name: program.name,
        subCategories: program.divisions.map((division: Division) => ({
          id: division.id,
          name: division.name,
        })),
      }),
      programs.filter((prog: Program) =>
        R.contains(prog.id, Object.keys(programContent)),
      ),
    );
    categories.push({
      id: 'events',
      name: 'Special Events',
    });

    return (
      <div>
        <t.Title center pb={spacing.ml}>
          <l.FlexCentered>
            <l.Img
              height={[spacing.xxl, spacing.xxl, spacing.xxxxl]}
              mr={spacing.ml}
              src={ScheduleImg}
            />
            Schedule
          </l.FlexCentered>
        </t.Title>
        <Divider white />
        <l.Page
          px={[spacing.sm, 0]}
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
          {loading ? (
            <l.FlexCentered>
              <l.FlexColumn>
                <PulseLoader sizeUnit="px" size={30} color={colors.black} />
                <t.Text mt={spacing.m}>Loading events</t.Text>
              </l.FlexColumn>
            </l.FlexCentered>
          ) : (
            <div>
              <FilterBar
                categories={categories}
                categoryLabel="Programs:"
                subCategoryLabel="Divisions:"
                searchLabel="Search Events:"
                scrollEndId="#calendar-end"
                legend={
                  <l.Flex mb={[spacing.ml, 0]}>
                    <LegendSet alignTop mr={spacing.ml}>
                      <l.Flex mb={spacing.t} mr={[0, spacing.ml, 0]}>
                        <LegendIcon background={gradients.multipass} />
                        <t.HelpText color={colors.black}>
                          Multi-Program
                        </t.HelpText>
                      </l.Flex>
                      <l.Flex>
                        <LegendIcon
                          background={
                            isTabletOnly() ? colors.purple : '#0274BF'
                          }
                        />
                        <t.HelpText color={colors.black}>
                          {isTabletOnly() ? 'Special Events' : 'Aikido'}
                        </t.HelpText>
                      </l.Flex>
                    </LegendSet>
                    <LegendSet alignTop mr={spacing.ml}>
                      <l.Flex mb={spacing.t} mr={[0, spacing.ml, 0]}>
                        <LegendIcon
                          background={
                            isTabletOnly() ? '#0274BF' : colors.purple
                          }
                        />
                        <t.HelpText color={colors.black}>
                          {isTabletOnly() ? 'Aikido' : 'Special Events'}
                        </t.HelpText>
                      </l.Flex>
                      <l.Flex>
                        <LegendIcon background="#0A7861" />
                        <t.HelpText color={colors.black}>Capoeira</t.HelpText>
                      </l.Flex>
                    </LegendSet>
                    <LegendSet alignTop>
                      <l.Flex>
                        <LegendIcon background={'#DAE22A'} />
                        <t.HelpText color={colors.black}>Zumba</t.HelpText>
                      </l.Flex>
                      <l.Flex>
                        <LegendIcon background="#F14042" />
                        <t.HelpText color={colors.black}>React</t.HelpText>
                      </l.Flex>
                    </LegendSet>
                  </l.Flex>
                }>
                {({ searchValue, categoryId, subCategoryId }: FilterProps) => {
                  return (
                    <l.Space height={900}>
                      <BigCalendar
                        defaultView={
                          isMobileOnly()
                            ? BigCalendar.Views.DAY
                            : BigCalendar.Views.WEEK
                        }
                        eventPropGetter={this.getEventProps}
                        localizer={localizer}
                        max={new Date(2013, 1, 1, 22)}
                        min={new Date(2013, 1, 1, 10)}
                        events={
                          events
                            ? this.filterEvents(
                                searchValue,
                                categoryId,
                                subCategoryId,
                              )
                            : []
                        }
                        onSelectEvent={(event: CalendarEvent) => {
                          const prog = getProgramById(
                            event.programId,
                            programs,
                          );
                          const divId =
                            prog && getDivisionById(event.divisionId, prog);
                          if (
                            (prog && divId) ||
                            R.equals(event.divisionId, 'events')
                          ) {
                            this.handleSelectEvent(event, prog, divId);
                          }
                        }}
                        onView={(view: View) =>
                          this.setState({ calendarView: view })
                        }
                        popup
                        view={calendarView}
                      />
                    </l.Space>
                  );
                }}
              </FilterBar>
              <div id="calendar-end" />
            </div>
          )}
        </l.Page>
        <Newsletter />
        <l.Space height={100} />
      </div>
    );
  }
}

export default withRouter(withScroll(Schedule));
