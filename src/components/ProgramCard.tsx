import * as moment from 'moment';
import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { height, space, width } from 'styled-system';
import l from '../styles/layout';
import {
  borders,
  breakpoints,
  colors,
  fontSizes,
  gradients,
  spacing,
} from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { isCoachOf, Program } from '../types/program';
import {
  generateNewClass,
  getClassInstById,
  getClassInstIdFromEvent,
  openClass,
} from '../utils/class';
import { CalendarEvent, formatDescriptiveDate } from '../utils/events';
import { enrollInProgram } from '../utils/program';
import { ButtonPrimary, getButtonProps } from './Form/Button';

const ActiveText = styled(t.Text)(
  ({ isGreen }: { isGreen: boolean }) => ({
    color: isGreen ? colors.green : colors.black,
  }),
  space,
);

const ManageButton = styled('button')(
  getButtonProps(colors.green, gradients.green),
  {
    fontSize: fontSizes.small,
    padding: 6,
    width: 64,
    [breakpoints.mobile]: { padding: 6 },
  },
);

const ProgramCardWrapper = styled(l.Space)(
  {
    border: borders.black,
    borderRadius: borders.borderRadius,
    padding: spacing.xl,
    [breakpoints.mobile]: {
      padding: spacing.ml,
    },
  },
  height,
  width,
);

export const EnrolledProgramCard = withRouter(
  ({
    events,
    history,
    program,
    user,
  }: {
    events: CalendarEvent[];
    program: Program;
    user: Member;
  } & RouteComponentProps) => {
    const upcomingEvents = events.filter(
      (event: CalendarEvent) =>
        R.equals(event.programId, program.id) && moment().diff(event.start) < 0,
    );

    return (
      <ProgramCardWrapper height={[250, 350]} width={['100%', '50%']}>
        <l.Flex alignTop mb={spacing.ml}>
          <l.Img src={program.logoSrc} height={spacing.xxxl} mr={spacing.xl} />
          <div>
            <t.H3 mb={spacing.ml}>{program.name}</t.H3>
          </div>
        </l.Flex>
        <t.HelpText mb={spacing.t}>Upcoming classes:</t.HelpText>
        <l.Scroll height={200} overflow="auto">
          {upcomingEvents
            .slice(0, 2)
            .map((event: CalendarEvent, index: number) => {
              const classInstId = getClassInstIdFromEvent(event);
              const classInst = getClassInstById(classInstId, program);
              const handleManageClass = () => {
                if (classInst) {
                  history.push(`/programs/${program.id}/${classInst.id}`);
                } else {
                  openClass(generateNewClass(event, user), program).then(() =>
                    history.push(`/programs/${program.id}/${classInstId}`),
                  );
                }
              };
              return (
                <l.Flex
                  key={classInstId}
                  mb={index === 0 ? spacing.sm : undefined}
                  spaceBetween
                >
                  <ActiveText
                    bold
                    isGreen={moment().isBetween(
                      moment(event.start),
                      moment(event.end),
                    )}
                  >
                    {formatDescriptiveDate(event)}
                  </ActiveText>
                  {isCoachOf(user, program) ? (
                    <ManageButton onClick={handleManageClass}>
                      Manage
                    </ManageButton>
                  ) : (
                    classInst &&
                    R.contains(user.uid, classInst.membersAttended) && (
                      <ActiveText isGreen italic>
                        Signed In
                      </ActiveText>
                    )
                  )}
                </l.Flex>
              );
            })}
        </l.Scroll>
      </ProgramCardWrapper>
    );
  },
);

export const ProgramCard = ({
  program,
  user,
}: {
  program: Program;
  user: Member;
}) => (
  <ProgramCardWrapper width={['100%', '30%']}>
    <l.Flex alignTop mb={spacing.ml}>
      <l.Img src={program.logoSrc} height={spacing.xxxxxl} mr={spacing.xl} />
      <div>
        <t.Text bold large mb={spacing.ml}>
          {program.name}
        </t.Text>
      </div>
    </l.Flex>
    <l.FlexCentered>
      <ButtonPrimary onClick={() => enrollInProgram(program, user)}>
        Enroll
      </ButtonPrimary>
    </l.FlexCentered>
  </ProgramCardWrapper>
);
