import * as moment from 'moment';
import * as React from 'react';
import BigCalendar from 'react-big-calendar';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import l from '../styles/layout';
import { colors, spacing } from '../styles/theme';
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
import { isMobileOnly } from '../utils/screensize';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const localizer = BigCalendar.momentLocalizer(moment);

const Schedule = ({
  events,
  history,
  loading,
  programs,
  member,
}: {
  events: CalendarEvent[];
  loading: boolean;
  programs: Program[];
  member?: Member;
} & RouteComponentProps) => {
  const handleSelectEvent = (
    event: CalendarEvent,
    program: Program,
    division: Division,
  ) => {
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

  return (
    <div>
      <t.Title center mb={spacing.ml}>
        Program Schedule
      </t.Title>
      <Divider white />
      <l.Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
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
              defaultView={
                isMobileOnly() ? BigCalendar.Views.DAY : BigCalendar.Views.WEEK
              }
              localizer={localizer}
              max={new Date(2013, 1, 1, 22)}
              min={new Date(2013, 1, 1, 10)}
              events={events ? events : []}
              onSelectEvent={(event: CalendarEvent) => {
                const program = getProgramById(event.programId, programs);
                const divisionId =
                  program && getDivisionById(event.divisionId, program);
                if (program && divisionId) {
                  handleSelectEvent(event, program, divisionId);
                }
              }}
              popup
            />
          </l.Space>
        )}
      </l.Page>
      <Newsletter />
      <l.Space height={100} />
    </div>
  );
};

export default withRouter(withScroll(Schedule));
