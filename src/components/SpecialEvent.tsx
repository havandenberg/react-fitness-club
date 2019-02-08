import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { ASSETS_PATH } from 'src/utils/constants';
import l from '../styles/layout';
import { borders, breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import { SpecialEvent as SpecialEventType } from '../types/special-event';
import { formatDescriptiveDate } from '../utils/calendar-event';
import { isMobile, isTabletOnly, TABLET_UP } from '../utils/screensize';
import {
  getSpecialEventSessions,
  removeSignup,
  signUpForSpecialEvent,
} from '../utils/special-event';
import { ButtonPrimary } from './Form/Button';
import GalleryImage from './GalleryImage';
import SmallMemberCard from './SmallMemberCard';

const SpecialEventWrapper = styled(l.Space)({
  border: borders.black,
  borderRadius: borders.borderRadius,
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

class SpecialEvent extends React.Component<Props, State> {
  state = {
    showMembers: false,
  };

  toggleShowMembers = () => {
    this.setState({ showMembers: !this.state.showMembers });
  };

  render() {
    const { events, member, members, specialEvent } = this.props;
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
                src: `${ASSETS_PATH}/programs/Aikido/events/NV-Worcester-2019.png`,
                thumbnail: `${ASSETS_PATH}/programs/Aikido/events/NV-Worcester-2019.png`,
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
            {sessions.map((session: CalendarEvent, index: number) => (
              <React.Fragment key={session.id}>
                <t.Text>{formatDescriptiveDate(session)}</t.Text>
                {index < sessions.length - 1 && <l.Space height={spacing.s} />}
              </React.Fragment>
            ))}
          </l.Space>
          <l.Space height={spacing.ml} width={spacing.ml} />
          <l.FlexColumn mb={[spacing.sm, 0]}>
            <t.Anchor
              border={borders.red}
              color={colors.red}
              href={specialEvent.aboutUrl}
              target="_blank">
              <t.TextButton bold center large nowrap>
                Event Details
              </t.TextButton>
            </t.Anchor>
            {member &&
              (isMemberSignedUpForEvent ? (
                <>
                  <t.Text color={colors.green} center large mt={spacing.xl}>
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
                        wrapper: { mb: spacing.sm, p: spacing.sm },
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

export default SpecialEvent;
