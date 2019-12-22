import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { programContent } from '../content/programs';
import l from '../styles/layout';
import { borders, breakpoints, colors, spacing } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import {
  Division,
  Program as ProgramType,
  ProgramContent,
} from '../types/program';

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

    return (
      <ProgramWrapper alignTop columnOnMobile id={program.id}>
        <l.FlexColumn width={['100%', '50%', '50%']}>
          <l.Flex alignTop mb={spacing.ml} width="100%">
            <l.Img
              src={program.logoSrc}
              width={[spacing.xxxxxl, spacing.huge, spacing.huge]}
            />
            <l.Space width={[spacing.ml, spacing.xxxl, spacing.xxxl]} />
            {content && (
              <t.H2 bold mb={spacing.sm}>
                {content.name}
              </t.H2>
            )}
          </l.Flex>
          <l.FlexColumn alignTop width="100%">
            {content &&
              content.instructors.map(instructor => (
                <l.FlexColumn alignTop key={instructor.name}>
                  <l.Flex mb={spacing.l}>
                    {instructor.photoSrc && (
                      <>
                        <l.Img
                          height={spacing.huge}
                          src={instructor.photoSrc}
                        />
                        <l.Space width={spacing.xl} />
                      </>
                    )}
                    <t.Text>{instructor.name}</t.Text>
                  </l.Flex>
                  {instructor.bio && (
                    <>
                      <t.Text fontSize="12px">{instructor.bio}</t.Text>
                      <l.Space height={spacing.l} />
                    </>
                  )}
                </l.FlexColumn>
              ))}
          </l.FlexColumn>
          <l.FlexColumn alignTop width="100%">
            <t.Text large mb={spacing.ml}>
              Schedule:
            </t.Text>
            {program.divisions.map((division: Division) => (
              <l.Flex
                columnOnMobile
                key={division.id}
                mb={[spacing.s, 0, 0]}
                spaceBetween
                width="100%"
              >
                <t.Text mb={[0, spacing.s, spacing.s]}>{division.name}</t.Text>
                <t.Link
                  border={borders.red}
                  color={colors.red}
                  to={`/schedule?categoryId=${program.id}&subCategoryId=${division.id}`}
                  nowrap="true"
                >
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
        <l.FlexColumn alignTop width={['100%', '50%', '50%']}>
          {content && content.description}
          {!R.isEmpty(program.aboutUrl) && (
            <l.FlexCentered width="100%">
              <t.Anchor
                border={borders.red}
                href={program.aboutUrl}
                target="_blank"
              >
                <t.Text color={colors.red} large>
                  Learn more about {program.name}
                </t.Text>
              </t.Anchor>
              <l.Space height={spacing.m} />
            </l.FlexCentered>
          )}
        </l.FlexColumn>
      </ProgramWrapper>
    );
  }
}

export default withRouter(Program);
