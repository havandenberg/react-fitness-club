import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import l from '../styles/layout';
import { borders, breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { SpecialEvent as SpecialEventType } from '../types/special-event';
import { formatDescriptiveDate } from '../utils/calendar-event';
import { isDesktop } from '../utils/screensize';
import { getSpecialEventSessions } from '../utils/special-event';
import GalleryImage from './GalleryImage';

const SessionButton = styled(t.TextButton)({
  display: 'inline-block',
});

const SpecialEventWrapper = styled(l.Space)({
  border: borders.black,
  borderRadius: borders.radius,
  padding: spacing.xl,
  [breakpoints.small]: {
    padding: spacing.ml,
  },
});

interface Props {
  events: CalendarEvent[];
  specialEvent: SpecialEventType;
}

class SpecialEvent extends React.Component<Props & RouteComponentProps> {
  render() {
    const { events, specialEvent } = this.props;
    const sessions = getSpecialEventSessions(specialEvent, events);

    return (
      <SpecialEventWrapper>
        <t.Text bold large mb={spacing.ml}>
          {specialEvent.name}
        </t.Text>
        <l.Flex alignTop columnOnMobile spaceBetween>
          <l.FlexColumn width={['100%', '35%']}>
            <GalleryImage
              image={{
                caption: '',
                src: specialEvent.posterSrc,
                thumbnail: specialEvent.posterSrc,
                thumbnailHeight: 200,
                thumbnailWidth: 150,
              }}
            />
          </l.FlexColumn>
          <l.Space height={spacing.ml} width={spacing.ml} />
          <l.Space mb={spacing.ml} width={['100%', '45%']}>
            {!R.isEmpty(sessions) && (
              <t.Text bold mb={spacing.ml}>
                Sessions:
              </t.Text>
            )}
            <div>
              {sessions.map((session: CalendarEvent, index: number) => {
                return (
                  <React.Fragment key={session.id}>
                    <SessionButton color={colors.black}>
                      {formatDescriptiveDate(session)}
                    </SessionButton>
                    {index < sessions.length - 1 && (
                      <l.Space height={spacing.s} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
            {isDesktop() && (
              <>
                <t.Text bold mt={spacing.ml}>
                  Description:
                </t.Text>
                <t.Text mb={spacing.ml}>{specialEvent.description}</t.Text>
              </>
            )}
          </l.Space>
          <l.Space width={spacing.ml} />
          <l.FlexColumn width={['100%', 0, 0]}>
            {!R.isEmpty(specialEvent.aboutUrl) && (
              <t.Anchor
                border={borders.red}
                color={colors.red}
                href={specialEvent.aboutUrl}
                target="_blank"
              >
                <t.TextButton bold center large nowrap>
                  Event Details
                </t.TextButton>
              </t.Anchor>
            )}
          </l.FlexColumn>
        </l.Flex>
        {!isDesktop() && (
          <>
            <t.Text bold my={spacing.ml}>
              Description:
            </t.Text>
            <t.Text mt={spacing.ml}>{specialEvent.description}</t.Text>
          </>
        )}
      </SpecialEventWrapper>
    );
  }
}

export default withRouter(SpecialEvent);
