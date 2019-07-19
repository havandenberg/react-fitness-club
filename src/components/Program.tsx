import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { coaches } from 'src/content/coaches';
import { programContent } from '../content/programs';
import l from '../styles/layout';
import { borders, breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import {
  Coach,
  Division,
  Program as ProgramType,
  ProgramContent,
} from '../types/program';
import { LinkPrimary } from './Form/Button';
import ProfilePhoto from './ProfilePhoto';

const ProgramWrapper = styled(l.Flex)({
  border: borders.black,
  borderRadius: borders.radius,
  margin: '0 2px',
  padding: spacing.xl,
  [breakpoints.mobile]: {
    padding: spacing.ml,
  },
});

interface Props {
  events: CalendarEvent[];
  member?: Member;
  members?: Member[];
  program: ProgramType;
}

interface State {
  showMembers: boolean;
}

class Program extends React.Component<Props & RouteComponentProps, State> {
  state = {
    showMembers: false,
  };

  toggleShowMembers = () => {
    this.setState({ showMembers: !this.state.showMembers });
  };

  render() {
    const { program } = this.props;

    const content = programContent.find(
      (programCont: ProgramContent) => program.id === programCont.id,
    );

    const programCoachIds = R.filter(
      (coachId: string) => R.contains(coachId, Object.keys(coaches)),
      program.coachIds,
    );
    const programCoaches = R.map(
      (coachId: string) => coaches[coachId],
      programCoachIds,
    );

    return (
      <ProgramWrapper alignTop columnOnMobile id={program.id}>
        <l.FlexColumn width={['100%', '50%', '50%']}>
          <l.Flex alignTop mb={spacing.ml} width="100%">
            <l.Img
              src={program.logoSrc}
              width={[spacing.xxxxxl, spacing.huge, spacing.huge]}
            />
            <l.Space width={[spacing.ml, spacing.xxxl, spacing.xxxl]} />
            <div>
              {content && (
                <t.H2 bold mb={spacing.sm}>
                  {content.name}
                </t.H2>
              )}
              <l.Flex>
                {programCoaches.map((coach: Coach, index: number) => (
                  <React.Fragment key={coach.id}>
                    <l.FlexColumn width={spacing.xxxl}>
                      <ProfilePhoto
                        imageSrc={coach.profilePhotoUrl}
                        sideLength={spacing.xxxl}
                      />
                      <l.Space height={spacing.s} />
                      <t.HelpText>{coach.name}</t.HelpText>
                    </l.FlexColumn>
                    {index < programCoaches.length - 1 && (
                      <l.Space width={spacing.ml} />
                    )}
                  </React.Fragment>
                ))}
              </l.Flex>
            </div>
          </l.Flex>
          <l.FlexColumn alignTop width="100%">
            <t.Text large mb={spacing.ml}>
              Divisions:
            </t.Text>
            {program.divisions.map((division: Division) => (
              <l.Flex
                columnOnMobile
                key={division.id}
                mb={[spacing.s, 0, 0]}
                spaceBetween
                width="100%">
                <t.Text mb={[0, spacing.s, spacing.s]}>{division.name}</t.Text>
                <t.Link
                  border={borders.red}
                  color={colors.red}
                  to={`/schedule?categoryId=${program.id}&subCategoryId=${
                    division.id
                  }`}
                  nowrap="true">
                  View Schedule
                </t.Link>
              </l.Flex>
            ))}
          </l.FlexColumn>
        </l.FlexColumn>
        <l.Space
          height={[spacing.ml, spacing.xxxxxl, spacing.xxxxxl]}
          width={spacing.xxxxxl}
        />
        <l.FlexColumn width={['100%', '50%', '50%']}>
          {content && <t.Text mb={spacing.ml}>{content.description}</t.Text>}
          {!R.isEmpty(program.cost) && (
            <t.Text center mb={spacing.ml}>
              {program.cost}
            </t.Text>
          )}
          {!R.isEmpty(program.aboutUrl) && (
            <t.Anchor
              border={borders.red}
              href={program.aboutUrl}
              target="_blank">
              <t.Text center color={colors.red} large>
                Learn more about {program.name}
              </t.Text>
            </t.Anchor>
          )}
          <LinkPrimary size="small" to="/signup">
            Sign up
          </LinkPrimary>
        </l.FlexColumn>
      </ProgramWrapper>
    );
  }
}

export default withRouter(Program);
