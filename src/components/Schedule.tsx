import * as moment from 'moment';
import * as React from 'react';
import BigCalendar from 'react-big-calendar';
import { PulseLoader } from 'react-spinners';
import l from '../styles/layout';
import { colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { isCoachOf, Program } from '../types/program';
import { CalendarEvent, getProgramIdFromEvent } from '../utils/events';
import { Page } from './App';
import Divider from './Divider';
import Hero from './Hero';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const localizer = BigCalendar.momentLocalizer(moment);

const handleSelectEvent = (
  event: CalendarEvent,
  programs: Program[],
  user?: Member,
) => {
  if (user) {
    console.log(isCoachOf(user, getProgramIdFromEvent(event), programs));
  }
};

const Schedule = ({
  events,
  loading,
  programs,
  user,
}: {
  events: CalendarEvent[];
  loading: boolean;
  programs: Program[];
  user?: Member;
}) => (
  <div>
    <Hero secondary />
    <t.Title center mb={spacing.ml}>
      Program Schedule
    </t.Title>
    <Divider white />
    <Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
      {loading ? (
        <l.FlexCentered>
          <l.FlexColumn>
            <PulseLoader sizeUnit="px" size={30} color={colors.black} />
            <t.Text mt={spacing.m}>Loading events</t.Text>
          </l.FlexColumn>
        </l.FlexCentered>
      ) : (
        <l.Space height={650}>
          <BigCalendar
            defaultView={BigCalendar.Views.WEEK}
            localizer={localizer}
            max={new Date(2013, 1, 1, 22)}
            min={new Date(2013, 1, 1, 10)}
            events={events ? events : []}
            onSelectEvent={(event: CalendarEvent) =>
              handleSelectEvent(event, programs, user)
            }
            popup
          />
        </l.Space>
      )}
    </Page>
    <Newsletter />
    <l.Space height={100} />
  </div>
);

export default withScroll(Schedule);
