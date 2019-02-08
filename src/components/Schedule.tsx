import * as moment from 'moment';
import * as R from 'ramda';
import * as React from 'react';
import BigCalendar from 'react-big-calendar';
import styled from 'react-emotion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import l from '../styles/layout';
import { breakpoints, colors, gradients, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import { Division, Program } from '../types/program';
import {
  generateNewClass,
  getClassInstById,
  getClassInstIdFromEvent,
  openClass,
} from '../utils/class';
import { getDivisionById, getProgramById, isCoachOf } from '../utils/program';
import { isMobileOnly, isTabletOnly } from '../utils/screensize';
import Divider from './Divider';
import { SelectInput, TextInput } from './Form/Input';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const localizer = BigCalendar.momentLocalizer(moment);

const LegendIcon = styled(l.Space)({
  borderRadius: 2,
  height: spacing.sm,
  marginRight: spacing.s,
  width: spacing.sm,
});

const FilterBar = styled(l.Flex)({
  [breakpoints.tablet]: {
    flexDirection: 'column',
  },
});

const LegendSet = styled(l.FlexColumn)({
  [breakpoints.tablet]: {
    flexDirection: 'row',
  },
});

interface Props {
  events: CalendarEvent[];
  loading: boolean;
  programs: Program[];
  member?: Member;
}

interface State {
  divisionId: string;
  programId: string;
  searchValue: string;
}

class Schedule extends React.Component<Props & RouteComponentProps, State> {
  state = {
    divisionId: 'all',
    programId: 'all',
    searchValue: '',
  };

  handleFilterChange = (field: string) => (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    this.setState({
      ...this.state,
      divisionId: R.equals(field, 'programId') ? 'all' : this.state.divisionId,
      [field]: e.currentTarget.value,
    });
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  filterEvents = () => {
    const { events } = this.props;
    const { divisionId, programId, searchValue } = this.state;

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
    if (isOpenMat) {
      return {
        style: {
          background: gradients.multipass,
          color: colors.white,
        },
      };
    }
    if (isProgramEvent) {
      return {
        style: {
          background: colors.purple,
          color: colors.white,
        },
      };
    }
    if (program) {
      return {
        style: {
          background: program.eventBackground,
          color: program.eventColor,
        },
      };
    }
    return {};
  };

  handleSelectEvent = (
    event: CalendarEvent,
    program: Program,
    division: Division,
  ) => {
    const { history, member } = this.props;
    if (member && isCoachOf(member.uid, program)) {
      const classId = getClassInstIdFromEvent(event);
      if (getClassInstById(classId, division)) {
        history.push(`/programs/${program.id}/${division.id}/${classId}`);
      } else {
        openClass(generateNewClass(event), program.id, division.id).then(() =>
          history.push(`/programs/${program.id}/${division.id}/${classId}`),
        );
      }
    }
  };

  render() {
    const { events, loading, programs } = this.props;
    const { divisionId, programId, searchValue } = this.state;
    const program =
      !R.equals(programId, 'all') && getProgramById(programId, programs);
    return (
      <div>
        <t.Title center mb={spacing.ml}>
          Program Schedule
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
            <>
              <FilterBar columnRevOnMobile mb={spacing.ml} spaceBetween>
                <l.Flex
                  columnOnMobile
                  mb={[0, spacing.ml, 0]}
                  width={['100%', 'auto']}>
                  <l.Space
                    mb={[spacing.sm, 0]}
                    mr={[0, spacing.sm]}
                    width={['100%', 'auto']}>
                    <t.HelpText mb={spacing.t}>Search events:</t.HelpText>
                    <TextInput
                      onChange={this.handleSearchChange}
                      value={searchValue}
                      width="100%"
                    />
                  </l.Space>
                  <l.Space
                    mb={[spacing.sm, 0]}
                    mr={[0, spacing.sm]}
                    width={['100%', 'auto']}>
                    <t.HelpText mb={spacing.t}>Program:</t.HelpText>
                    <SelectInput
                      mr={R.equals(programId, 'all') ? spacing.m : spacing.sm}
                      onChange={this.handleFilterChange('programId')}
                      value={programId}
                      width="100%">
                      <option value="all">All</option>
                      <option value="events">Special Events</option>
                      {programs.map((prog: Program) => (
                        <option key={prog.id} value={prog.id}>
                          {prog.name}
                        </option>
                      ))}
                    </SelectInput>
                  </l.Space>
                  {program && (
                    <l.Space width={['100%', 'auto']}>
                      <t.HelpText mb={spacing.t}>Division:</t.HelpText>
                      <SelectInput
                        onChange={this.handleFilterChange('divisionId')}
                        value={divisionId}
                        width="100%">
                        <option value="all">All</option>
                        {program.divisions.map((div: Division) => (
                          <option key={div.id} value={div.id}>
                            {div.name}
                          </option>
                        ))}
                      </SelectInput>
                    </l.Space>
                  )}
                </l.Flex>
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
                        background={isTabletOnly() ? colors.purple : '#0274BF'}
                      />
                      <t.HelpText color={colors.black}>
                        {isTabletOnly() ? 'Special Events' : 'Aikido'}
                      </t.HelpText>
                    </l.Flex>
                  </LegendSet>
                  <LegendSet alignTop mr={spacing.ml}>
                    <l.Flex mb={spacing.t} mr={[0, spacing.ml, 0]}>
                      <LegendIcon
                        background={isTabletOnly() ? '#0274BF' : colors.purple}
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
                    <l.Space height={spacing.m} mb={spacing.t} />
                    <l.Flex>
                      <LegendIcon background="#F14042" />
                      <t.HelpText color={colors.black}>React</t.HelpText>
                    </l.Flex>
                  </LegendSet>
                </l.Flex>
              </FilterBar>
              <l.Space height={650}>
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
                  events={events ? this.filterEvents() : []}
                  onSelectEvent={(event: CalendarEvent) => {
                    const prog = getProgramById(event.programId, programs);
                    const divId =
                      prog && getDivisionById(event.divisionId, prog);
                    if (prog && divId) {
                      this.handleSelectEvent(event, prog, divId);
                    }
                  }}
                  popup
                />
              </l.Space>
            </>
          )}
        </l.Page>
        <Newsletter />
        <l.Space height={100} />
      </div>
    );
  }
}

export default withRouter(withScroll(Schedule));
