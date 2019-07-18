import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import * as moment from 'moment';
import * as R from 'ramda';
import * as React from 'react';
import BigCalendar, { View } from 'react-big-calendar';
import styled from 'react-emotion';
import * as ReactModal from 'react-modal';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import ExpandImg from '../assets/images/expand.svg';
import ModalCloseImg from '../assets/images/modal-close-dark.svg';
import ScheduleImg from '../assets/images/schedule.svg';
import ShrinkImg from '../assets/images/shrink.svg';
import { programContent } from '../content/programs';
import l from '../styles/layout';
import { colors, fontSizes, gradients, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { FilterPrimaryCategory } from '../types/filter';
import { Member } from '../types/member';
import { Division, Program, ProgramContent } from '../types/program';
import { SpecialEvent } from '../types/special-event';
import { formatDescriptiveDate } from '../utils/calendar-event';
import {
  generateNewClass,
  getClassInstIdFromEvent,
  getDivisionClassInstById,
  getSpecialEventClassInstById,
  openClass,
  openSpecialEventClass,
} from '../utils/class';
import { isCoach } from '../utils/member';
import {
  getDivisionById,
  getProgramById,
  isCoachOfProgram,
} from '../utils/program';
import { isMobile, isMobileOnly, isTabletOnly } from '../utils/screensize';
import { getSpecialEventById } from '../utils/special-event';
import Divider from './Divider';
import FilterBar, { FilterProps } from './FilterBar';
import { ButtonPrimary, LinkPrimary } from './Form/Button';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';
import { CloseButton } from './Shop/Item';

const localizer = BigCalendar.momentLocalizer(moment);

const LegendIcon = styled(l.Space)({
  borderRadius: 2,
  height: spacing.sm,
  marginLeft: spacing.sm,
  marginRight: spacing.s,
  width: spacing.sm,
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
  expandCalendar: boolean;
  selectedEvent?: CalendarEvent;
  showEventDetails: boolean;
}

class Schedule extends React.Component<Props & RouteComponentProps, State> {
  targetElement: HTMLElement | null = null;
  constructor(props: Props & RouteComponentProps) {
    super(props);
    this.state = {
      calendarView: isMobileOnly()
        ? BigCalendar.Views.AGENDA
        : BigCalendar.Views.WEEK,
      expandCalendar: false,
      selectedEvent: undefined,
      showEventDetails: false,
    };
  }

  componentDidMount() {
    this.targetElement = document.querySelector('#top');
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  closeModal = () => {
    this.setState({ selectedEvent: undefined, showEventDetails: false });
  };

  showModal = (selectedEvent: CalendarEvent) => {
    this.setState({ selectedEvent, showEventDetails: true });
  };

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
      return {
        style: {
          fontSize: isMobile() ? fontSizes.helpText : fontSizes.text,
        },
      };
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

  handleGoToEventClass = (event: CalendarEvent) => {
    const { history, member, programs, specialEvents } = this.props;
    const program = getProgramById(event.programId, programs);
    const division = program && getDivisionById(event.divisionId, program);
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
      } else if (program && division && isCoachOfProgram(member.uid, program)) {
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

  toggleExpandCalendar = () => {
    this.setState({ expandCalendar: !this.state.expandCalendar });
  };

  render() {
    const { events, loading, member, programs } = this.props;
    const {
      calendarView,
      expandCalendar,
      selectedEvent,
      showEventDetails,
    } = this.state;

    const calendarHeight = expandCalendar ? 1800 : 900;

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
        R.find(
          (progCont: ProgramContent) => prog.id === progCont.id,
          programContent,
        ),
      ),
    );
    categories.push({
      id: 'events',
      name: 'Special Events',
    });

    const selectedProgram =
      selectedEvent && getProgramById(selectedEvent.programId, programs);

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
                  <t.TextButton
                    mt={spacing.m}
                    onClick={this.toggleExpandCalendar}>
                    <l.Img
                      height={spacing.xxl}
                      src={expandCalendar ? ShrinkImg : ExpandImg}
                    />
                  </t.TextButton>
                }
                legendOnBottom
                lowerLegend={
                  <l.Flex isWrap mb={[spacing.ml, 0]}>
                    <l.Flex mb={spacing.sm}>
                      <LegendIcon background={gradients.multipass} />
                      <t.HelpText color={colors.black}>
                        Multi-Program
                      </t.HelpText>
                    </l.Flex>
                    <l.Flex mb={spacing.sm}>
                      <LegendIcon
                        background={isTabletOnly() ? colors.purple : '#0274BF'}
                      />
                      <t.HelpText color={colors.black}>
                        {isTabletOnly() ? 'Special Events' : 'Aikido'}
                      </t.HelpText>
                    </l.Flex>
                    <l.Flex mb={spacing.sm}>
                      <LegendIcon
                        background={isTabletOnly() ? '#0274BF' : colors.purple}
                      />
                      <t.HelpText color={colors.black}>
                        {isTabletOnly() ? 'Aikido' : 'Special Events'}
                      </t.HelpText>
                    </l.Flex>
                    <l.Flex mb={spacing.sm}>
                      <LegendIcon background="#0A7861" />
                      <t.HelpText color={colors.black}>Capoeira</t.HelpText>
                    </l.Flex>
                    <l.Flex mb={spacing.sm}>
                      <LegendIcon background={'#DAE22A'} />
                      <t.HelpText color={colors.black}>Zumba</t.HelpText>
                    </l.Flex>
                    <l.Flex mb={spacing.sm}>
                      <LegendIcon background="#F14042" />
                      <t.HelpText color={colors.black}>REaCT MMA</t.HelpText>
                    </l.Flex>
                    <l.Flex mb={spacing.sm}>
                      <LegendIcon background="#242424" />
                      <t.HelpText color={colors.black}>REaCT Skillz</t.HelpText>
                    </l.Flex>
                    <l.Flex mb={spacing.sm}>
                      <LegendIcon background="#46B388" />
                      <t.HelpText color={colors.black}>
                        Qigong Meditation
                      </t.HelpText>
                    </l.Flex>
                  </l.Flex>
                }>
                {({ searchValue, categoryId, subCategoryId }: FilterProps) => {
                  return (
                    <div>
                      <l.Space height={calendarHeight}>
                        <BigCalendar
                          eventPropGetter={this.getEventProps}
                          localizer={localizer}
                          max={new Date(2013, 1, 1, 21)}
                          min={new Date(2013, 1, 1, 8)}
                          scrollToTime={new Date(2013, 1, 1, 10)}
                          events={
                            events
                              ? this.filterEvents(
                                  searchValue,
                                  categoryId,
                                  subCategoryId,
                                )
                              : []
                          }
                          onSelectEvent={(event: CalendarEvent) =>
                            this.showModal(event)
                          }
                          onView={(view: View) =>
                            this.setState({ calendarView: view })
                          }
                          popup
                          step={30}
                          view={calendarView}
                        />
                      </l.Space>
                      <ReactModal
                        isOpen={showEventDetails}
                        onAfterOpen={() => {
                          if (this.targetElement) {
                            disableBodyScroll(this.targetElement);
                          }
                        }}
                        onAfterClose={() => {
                          if (this.targetElement) {
                            enableBodyScroll(this.targetElement);
                          }
                        }}
                        onRequestClose={this.closeModal}
                        style={{
                          content: {
                            background: colors.background,
                            bottom: 'auto',
                            margin: '0 auto',
                            maxWidth: 550,
                            overflowY: 'auto',
                          },
                          overlay: {
                            zIndex: 1000,
                          },
                        }}>
                        {selectedEvent && (
                          <l.Space position="relative">
                            {selectedProgram && (
                              <l.FlexCentered>
                                <l.Img
                                  src={selectedProgram.logoSrc}
                                  height={spacing.huge}
                                />
                              </l.FlexCentered>
                            )}
                            <t.H1 center mt={spacing.xl}>
                              {selectedEvent.title}
                            </t.H1>
                            <t.Text center mt={spacing.sm}>
                              {formatDescriptiveDate(selectedEvent)}
                            </t.Text>
                            <l.FlexCentered mb={spacing.m} mt={spacing.xl}>
                              {selectedProgram && (
                                <LinkPrimary
                                  to={`/programs?id=${selectedProgram.id}`}
                                  size="small"
                                  width={130}>
                                  View Program
                                </LinkPrimary>
                              )}
                              {member &&
                                isCoach(member) &&
                                (selectedProgram
                                  ? isCoachOfProgram(
                                      member.uid,
                                      selectedProgram,
                                    )
                                  : true) && (
                                  <l.Space ml={spacing.ml}>
                                    <ButtonPrimary
                                      onClick={() =>
                                        this.handleGoToEventClass(selectedEvent)
                                      }
                                      size="small"
                                      width={130}>
                                      Manage
                                    </ButtonPrimary>
                                  </l.Space>
                                )}
                            </l.FlexCentered>
                            <CloseButton
                              onClick={this.closeModal}
                              src={ModalCloseImg}
                            />
                          </l.Space>
                        )}
                      </ReactModal>
                    </div>
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
