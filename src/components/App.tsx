import * as React from 'react';
import styled from 'react-emotion';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import '../firebase';
import { colors, maxWidth } from '../styles/theme';
import { Alert } from '../types/alert';
import { CalendarEvent } from '../types/calendar-event';
import { Program } from '../types/program';
import { ShopItem } from '../types/shop';
import { SpecialEvent } from '../types/special-event';
import { parseAlerts } from '../utils/alert';
import {
  listenForAlertsChanges,
  listenForInventoryChanges,
  listenForProgramChanges,
  listenForSpecialEventsChanges,
} from '../utils/auth';
import { expandRecurringEvents, getEvents } from '../utils/calendar-event';
import { parsePrograms } from '../utils/program';
import { parseInventory } from '../utils/shop';
import { parseSpecialEvents } from '../utils/special-event';
import Contact from './Contact';
import Events from './Events';
import FAQs from './FAQs';
import Footer from './Footer';
import Gallery from './Gallery';
import Hero from './Hero';
import Home from './Home';
import Mission from './Mission';
import Nav from './Nav';
import Programs from './Programs';
import Schedule from './Schedule';
import Shop from './Shop';

const Main = styled('div')({
  background: colors.background,
  margin: '0 auto',
  maxWidth,
});

interface State {
  alerts: Alert[];
  events: CalendarEvent[];
  inventory: ShopItem[];
  loading: boolean;
  loadingAlerts: boolean;
  loadingEvents: boolean;
  loadingInventory: boolean;
  loadingPrograms: boolean;
  loadingSpecialEvents: boolean;
  programs: Program[];
  specialEvents: SpecialEvent[];
}

class App extends React.Component<{}, State> {
  constructor({}) {
    super({});
    this.state = {
      alerts: [],
      events: [],
      inventory: [],
      loading: true,
      loadingAlerts: true,
      loadingEvents: true,
      loadingInventory: true,
      loadingPrograms: true,
      loadingSpecialEvents: true,
      programs: [],
      specialEvents: [],
    };
  }

  componentDidMount() {
    listenForAlertsChanges((alerts: Alert[]) =>
      this.setState(
        { alerts: parseAlerts(alerts), loadingAlerts: false },
        this.checkUnauthedFinishedLoading,
      ),
    );
    listenForInventoryChanges((inventory: ShopItem[]) =>
      this.setState(
        { inventory: parseInventory(inventory), loadingInventory: false },
        this.checkUnauthedFinishedLoading,
      ),
    );
    listenForProgramChanges((programs: Program[]) =>
      this.setState(
        { programs: parsePrograms(programs), loadingPrograms: false },
        this.checkUnauthedFinishedLoading,
      ),
    );
    getEvents().then(data => {
      this.setState(
        {
          events: expandRecurringEvents(data.items),
          loadingEvents: false,
        },
        this.checkUnauthedFinishedLoading,
      );
    });
    listenForSpecialEventsChanges((events: SpecialEvent[]) => {
      this.setState(
        {
          loadingSpecialEvents: false,
          specialEvents: parseSpecialEvents(events),
        },
        this.checkUnauthedFinishedLoading,
      );
    });
  }

  checkUnauthedFinishedLoading = () => {
    const {
      loadingAlerts,
      loadingEvents,
      loadingInventory,
      loadingPrograms,
      loadingSpecialEvents,
    } = this.state;
    if (
      !loadingAlerts &&
      !loadingEvents &&
      !loadingInventory &&
      !loadingPrograms &&
      !loadingSpecialEvents
    ) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const {
      alerts,
      events,
      inventory,
      loading,
      loadingAlerts,
      loadingInventory,
      loadingPrograms,
      loadingSpecialEvents,
      programs,
      specialEvents,
    } = this.state;

    return (
      <Router>
        <Main id="top">
          <Nav />
          <Hero
            alerts={alerts}
            loadingAlerts={loadingAlerts}
            specialEvents={specialEvents}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/mission" component={Mission} />
            <Route
              exact
              path="/events"
              render={props => (
                <Events
                  {...props}
                  events={events}
                  loadingSpecialEvents={loadingSpecialEvents}
                  specialEvents={specialEvents}
                />
              )}
            />
            <Route
              exact
              path="/programs"
              render={props => (
                <Programs
                  {...props}
                  events={events}
                  loadingPrograms={loadingPrograms}
                  programs={programs}
                />
              )}
            />
            <Route path="/gallery" component={Gallery} />
            <Route
              path="/shop"
              render={props => (
                <Shop
                  {...props}
                  loading={loadingInventory}
                  inventory={inventory}
                />
              )}
            />
            <Route path="/faqs" component={FAQs} />
            <Route
              path="/contact"
              render={props => <Contact {...props} programs={programs} />}
            />
            <Route
              path="/schedule"
              render={props => (
                <Schedule
                  {...props}
                  events={events}
                  loading={loading}
                  programs={programs}
                  specialEvents={specialEvents}
                />
              )}
            />
            {/* <Route path="/signup" component={Signup} /> */}
            <Redirect to="/" />
          </Switch>
          <Footer />
        </Main>
      </Router>
    );
  }
}

export default App;
