import * as moment from 'moment';
import * as React from 'react';
import BigCalendar from 'react-big-calendar';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import l from '../styles/layout';
import { colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { getProgramById, isCoachOf, Program } from '../types/program';
import {
  generateNewClass,
  getClassInstById,
  getClassInstIdFromEvent,
  openClass,
} from '../utils/class';
import { CalendarEvent } from '../utils/events';
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
  user,
}: {
  events: CalendarEvent[];
  loading: boolean;
  programs: Program[];
  user?: Member;
} & RouteComponentProps) => {
  const handleSelectEvent = (event: CalendarEvent, program: Program) => {
    if (user && isCoachOf(user, program)) {
      const classId = getClassInstIdFromEvent(event);
      if (getClassInstById(classId, program)) {
        history.push(`/programs/${program.id}/${classId}`);
      } else {
        openClass(generateNewClass(event, user), program).then(() =>
          history.push(`/programs/${program.id}/${classId}`),
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
                if (program) {
                  handleSelectEvent(event, program);
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
