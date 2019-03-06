import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import l from '../styles/layout';
import { borders, breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import { SpecialEvent as SpecialEventType } from '../types/special-event';
import { formatDescriptiveDate } from '../utils/calendar-event';
import {
  generateNewClass,
  getClassInstIdFromEvent,
  getSpecialEventClassInstById,
  openSpecialEventClass,
} from '../utils/class';
import { isMobile, isTabletOnly, TABLET_UP } from '../utils/screensize';
import {
  getSpecialEventSessions,
  removeSignup,
  signUpForSpecialEvent,
} from '../utils/special-event';
import { ButtonPrimary } from './Form/Button';
import GalleryImage from './GalleryImage';
import SmallMemberCard from './SmallMemberCard';

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
  member?: Member;
  members?: Member[];
  specialEvent: SpecialEventType;
}

interface State {
  showMembers: boolean;
}

class SpecialEvent extends React.Component<Props & RouteComponentProps, State> {
  state = {
    showMembers: false,
  };

  getSessionProps = (session: CalendarEvent) => {
    const { specialEvent } = this.props;
    const classInstId = getClassInstIdFromEvent(session);
    return {
      color: colors.red,
      to: `/events/${specialEvent.id}/${classInstId}`,
    };
  };

  toggleShowMembers = () => {
    this.setState({ showMembers: !this.state.showMembers });
  };

  render() {
    const { events, history, member, members, specialEvent } = this.props;
    const { showMembers } = this.state;

    const sessions = getSpecialEventSessions(specialEvent, events);
    const isMemberSignedUpForEvent =
      member && R.contains(member.uid, specialEvent.memberIds);
    const membersSignedUp = members
      ? members.filter((mem: Member) =>
          R.contains(mem.uid, specialEvent.memberIds),
        )
      : [];

    return (
      <SpecialEventWrapper>
        <t.Text bold large mb={spacing.ml}>
          {specialEvent.name}
        </t.Text>
        <l.Flex columnOnMobile spaceBetween>
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
            {!isTabletOnly() && (
              <t.Text mb={spacing.ml}>{specialEvent.description}</t.Text>
            )}
            <t.Text bold mb={spacing.ml}>
              Sessions:
            </t.Text>
            <div>
              {sessions.map((session: CalendarEvent, index: number) => {
                const classInstId = getClassInstIdFromEvent(session);
                const classInst = getSpecialEventClassInstById(
                  classInstId,
                  specialEvent,
                );
                return (
                  <React.Fragment key={session.id}>
                    <SessionButton
                      color={members ? colors.red : colors.black}
                      onClick={
                        members
                          ? () => {
                              if (classInst) {
                                history.push(
                                  `/events/${specialEvent.id}/${classInstId}`,
                                );
                              } else {
                                openSpecialEventClass(
                                  generateNewClass(session),
                                  specialEvent.id,
                                ).then(() =>
                                  history.push(
                                    `/events/${specialEvent.id}/${classInstId}`,
                                  ),
                                );
                              }
                            }
                          : undefined
                      }>
                      {formatDescriptiveDate(session)}
                    </SessionButton>
                    {index < sessions.length - 1 && (
                      <l.Space height={spacing.s} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </l.Space>
          <l.Space height={spacing.ml} width={spacing.ml} />
          <l.FlexColumn mb={[spacing.sm, 0]}>
            {!R.isEmpty(specialEvent.aboutUrl) && (
              <t.Anchor
                border={borders.red}
                color={colors.red}
                href={specialEvent.aboutUrl}
                target="_blank">
                <t.TextButton bold center large nowrap>
                  Event Details
                </t.TextButton>
              </t.Anchor>
            )}
            {member &&
              (isMemberSignedUpForEvent ? (
                <>
                  <t.Text color={colors.green} center mt={spacing.xl}>
                    You are <l.Break breakpoint={TABLET_UP} />
                    signed up!
                  </t.Text>
                  <t.TextButton
                    center
                    mt={spacing.ml}
                    onClick={() => removeSignup(member.uid, specialEvent)}>
                    Undo
                  </t.TextButton>
                </>
              ) : (
                <ButtonPrimary
                  mt={spacing.xl}
                  onClick={() =>
                    member && signUpForSpecialEvent(member.uid, specialEvent)
                  }>
                  Sign up
                </ButtonPrimary>
              ))}
          </l.FlexColumn>
        </l.Flex>
        {isTabletOnly() && (
          <t.Text mt={spacing.ml}>{specialEvent.description}</t.Text>
        )}
        {members && (
          <>
            <l.FlexCentered>
              <t.TextButton
                hoverStyle="underline"
                large
                mt={spacing.ml}
                onClick={this.toggleShowMembers}>
                {showMembers ? 'Hide members' : 'Show members'} (
                {membersSignedUp.length})
              </t.TextButton>
            </l.FlexCentered>
            {showMembers && !R.isEmpty(membersSignedUp) && (
              <l.Flex
                isWrap
                justifyContent={isMobile() ? 'center' : 'flex-start'}
                mt={[spacing.xl, spacing.ml]}>
                {R.sortBy((mem: Member) => mem.lastName.toLowerCase())(
                  membersSignedUp,
                ).map((mem: Member, index: number) => (
                  <React.Fragment key={index}>
                    <SmallMemberCard
                      customStyles={{
                        photoSideLength: spacing.xxxl,
                        wrapper: {
                          borderColor: colors.gray,
                          mb: spacing.sm,
                          p: spacing.sm,
                        },
                      }}
                      isActive
                      member={mem}
                    />
                    {index < members.length - 1 && (
                      <l.Space width={spacing.ml} />
                    )}
                  </React.Fragment>
                ))}
              </l.Flex>
            )}
          </>
        )}
      </SpecialEventWrapper>
    );
  }
}

export default withRouter(SpecialEvent);
