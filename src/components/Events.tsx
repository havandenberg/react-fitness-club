import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { PulseLoader } from 'react-spinners';
import { fontSize } from 'styled-system';
import EventsImg from '../assets/images/events.svg';
import l from '../styles/layout';
import { borders, colors, fontSizes, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import { SpecialEvent as SpecialEventType } from '../types/special-event';
import { getMemberName } from '../utils/member';
import { isMobileOnly } from '../utils/screensize';
import {
  getPastSpecialEvents,
  getUpcomingSpecialEvents,
  sortSpecialEventsByDate,
} from '../utils/special-event';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';
import SpecialEvent from './SpecialEvent';

const EventsCount = styled('span')(fontSize);

interface Props {
  events: CalendarEvent[];
  loadingSpecialEvents: boolean;
  member?: Member;
  members?: Member[];
  specialEvents: SpecialEventType[];
}

interface State {
  showPastEvents: boolean;
}

class Events extends React.Component<Props, State> {
  state = {
    showPastEvents: false,
  };

  setShowPastEvents = (showPastEvents: boolean) => {
    this.setState({ showPastEvents });
  };

  render() {
    const {
      events,
      loadingSpecialEvents,
      member,
      members,
      specialEvents,
    } = this.props;
    const { showPastEvents } = this.state;

    const upcomingEvents = getUpcomingSpecialEvents(specialEvents);
    const pastEvents = getPastSpecialEvents(specialEvents);
    const sortedEvents = sortSpecialEventsByDate(
      showPastEvents ? pastEvents : upcomingEvents,
    );

    return (
      <div>
        <t.Title center pb={spacing.ml}>
          <l.FlexCentered>
            <l.Img
              height={[spacing.xxl, spacing.xxl, spacing.xxxxl]}
              mr={spacing.ml}
              src={EventsImg}
            />
            Events
          </l.FlexCentered>
        </t.Title>
        <Divider white />
        <l.Page
          px={[spacing.sm, 0]}
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
          {loadingSpecialEvents ? (
            <l.FlexCentered>
              <l.FlexColumn>
                <PulseLoader sizeUnit="px" size={30} color={colors.black} />
                <t.Text mt={spacing.m}>Loading events</t.Text>
              </l.FlexColumn>
            </l.FlexCentered>
          ) : (
            <>
              <l.Flex mb={spacing.xl} spaceBetween>
                <l.Flex alignTop={isMobileOnly()} columnOnMobile>
                  <t.H3 mr={[spacing.m, spacing.xl]} nowrap>
                    {showPastEvents ? 'Past' : 'Upcoming'} Events
                    {!showPastEvents && (
                      <EventsCount fontSize={fontSizes.text}>
                        {' '}
                        ({upcomingEvents.length})
                      </EventsCount>
                    )}
                  </t.H3>
                  <t.TextButton
                    border={borders.red}
                    color={colors.red}
                    hoverStyle="underline"
                    mt={spacing.s}
                    nowrap
                    onClick={() => this.setShowPastEvents(!showPastEvents)}>
                    {showPastEvents ? 'Upcoming' : 'Past'} Events
                    {showPastEvents && <span> ({upcomingEvents.length})</span>}
                  </t.TextButton>
                </l.Flex>
                <t.Text italic textAlign="right">
                  {member ? (
                    `Signing up as ${getMemberName(member)}`
                  ) : (
                    <span>
                      <t.Link
                        border={borders.red}
                        color={colors.red}
                        to="/login">
                        Log in{' '}
                      </t.Link>
                      to sign up directly for events
                    </span>
                  )}
                </t.Text>
              </l.Flex>
              {R.isEmpty(sortedEvents) ? (
                <t.Text center large my={spacing.xxxxxl}>
                  No upcoming events. Check back soon!
                </t.Text>
              ) : (
                <>
                  {sortedEvents.map((specialEvent: SpecialEventType) => (
                    <SpecialEvent
                      key={specialEvent.id}
                      events={events}
                      member={member}
                      members={members}
                      specialEvent={specialEvent}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </l.Page>
        <Newsletter />
        <l.Space height={100} />
      </div>
    );
  }
}

export default withScroll(Events);
