import * as moment from 'moment';
import * as React from 'react';
import BigCalendar from 'react-big-calendar';
import { PulseLoader } from 'react-spinners';
import l from '../styles/layout';
import { colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Page } from './App';
import Divider from './Divider';
import Hero from './Hero';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';

const localizer = BigCalendar.momentLocalizer(moment);

const GET_CAL_URL = (calID: string, key: string) =>
  `https://www.googleapis.com/calendar/v3/calendars/${calID}/events?fields=items(summary,id,location,start,end,recurrence)&key=${key}`;

interface CalendarEventShape {
  end: {
    dateTime?: string;
    date?: string;
  };
  id: string;
  location?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  summary: string;
}

export interface GCalEvent {
  end: {
    date: Date;
    dateTime: Date;
  };
  start: {
    date: Date;
    dateTime: Date;
  };
  summary: string;
}

export interface ClientEvent {
  end: string;
  start: string;
  title: string;
}

interface State {
  events: ClientEvent[];
  loading: boolean;
}

class Schedule extends React.Component<{}, State> {
  state = {
    events: [],
    loading: false,
  };

  componentDidMount() {
    this.getEvents().then(data => {
      this.setState(state => ({
        ...state,
        events: data.items.map((item: CalendarEventShape) => ({
          end: new Date(item.end.date || item.end.dateTime || ''),
          id: item.id,
          start: new Date(item.start.date || item.start.dateTime || ''),
          title: item.summary,
        })),
        loading: false,
      }));
    });
  }

  getEvents = () => {
    this.setState(state => ({
      ...state,
      events: [],
      loading: true,
    }));
    return fetch(
      GET_CAL_URL(
        process.env.REACT_APP_GCAL_ID || '',
        process.env.REACT_APP_GCAL_KEY || '',
      ),
    ).then(res => res.json());
  };

  render() {
    const { events, loading } = this.state;
    return (
      <div>
        <Hero secondary />
        <t.Title center mb={spacing.ml}>
          Schedule
        </t.Title>
        <Divider white />
        <Page px={[spacing.sm, 0]} py={[spacing.xxxl, spacing.xxxxxl]}>
          {loading ? (
            <l.FlexCentered>
              <PulseLoader sizeUnit="px" size={30} color={colors.black} />
            </l.FlexCentered>
          ) : (
            <l.Space height={500}>
              <BigCalendar
                localizer={localizer}
                max={new Date(2013, 1, 1, 22)}
                min={new Date(2013, 1, 1, 10)}
                events={events ? events : []}
              />
            </l.Space>
          )}
        </Page>
        <Newsletter />
        <l.Space height={100} />
      </div>
    );
  }
}

export default withScroll(Schedule);
