import * as React from 'react';
import { PulseLoader } from 'react-spinners';
import l from '../styles/layout';
import { borders, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import { SpecialEvent as SpecialEventType } from '../types/special-event';
import { getMemberName } from '../utils/member';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';
import SpecialEvent from './SpecialEvent';

interface Props {
  events: CalendarEvent[];
  loadingSpecialEvents: boolean;
  member?: Member;
  members?: Member[];
  specialEvents: SpecialEventType[];
}

const Events = ({
  events,
  loadingSpecialEvents,
  member,
  members,
  specialEvents,
}: Props) => (
  <div>
    <t.Title center mb={spacing.ml}>
      Events
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
            <t.H3 mr={spacing.sm} nowrap>
              Upcoming Events
            </t.H3>
            <t.Text italic textAlign="right">
              {member ? (
                `Signing up as ${getMemberName(member)}`
              ) : (
                <span>
                  <t.Link border={borders.red} color={colors.red} to="/login">
                    Log in{' '}
                  </t.Link>
                  to sign up directly for events
                </span>
              )}
            </t.Text>
          </l.Flex>
          {specialEvents.map((specialEvent: SpecialEventType) => (
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
    </l.Page>
    <Newsletter />
    <l.Space height={100} />
  </div>
);

export default withScroll(Events);
