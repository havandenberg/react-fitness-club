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
import { isMobileOnly, isTabletUp } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';

const ProgramWrapper = styled(l.Space)({
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

    const schedule = (
      <l.FlexColumn alignTop>
        <t.Text bold={isMobileOnly()} large mb={spacing.ml}>
          Schedule:
        </t.Text>
        {program.divisions.map((division: Division) => (
          <l.Flex key={division.id} mb={spacing.s} spaceBetween width="100%">
            <t.Text
              onClick={() =>
                scrollToId(division.id, {
                  offset: -210,
                })
              }
            >
              {division.name}
            </t.Text>
            <l.Space width={spacing.l} />
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
    );

    return (
      <ProgramWrapper id={program.id}>
        <l.Flex alignTop columnOnMobile mb={[spacing.xl, 0, 0]} spaceBetween>
          <l.Flex alignTop mr={[0, spacing.xxxxxl]}>
            <l.Img
              src={program.logoSrc}
              height={[spacing.xxxxxl, spacing.huge, spacing.huge]}
            />
            <l.Space width={[spacing.ml, spacing.xxxl, spacing.xxxl]} />
            {content && (
              <t.H2 bold mb={spacing.sm}>
                {content.name}
              </t.H2>
            )}
          </l.Flex>
          {isTabletUp() && schedule}
        </l.Flex>
        <l.Section maxWidth={600} width="100%">
          {isMobileOnly() && schedule}
          <l.FlexColumn alignTop my={spacing.xl}>
            <t.Text bold={isMobileOnly()} large mb={spacing.m}>
              Program Description:
            </t.Text>
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
          {content && content.instructors && !R.isEmpty(content.instructors) && (
            <>
              <t.Text bold={isMobileOnly()} large mb={spacing.m}>
                Instructor{content.instructors.length > 1 ? 's' : ''}:
              </t.Text>
              {content.instructors.map(instructor => (
                <l.Flex
                  alignTop
                  columnOnMobile
                  key={instructor.name}
                  id={instructor.name}
                  mb={spacing.xxxl}
                >
                  <l.Flex spaceBetween>
                    {instructor.photoSrc && (
                      <l.Space mr={spacing.xl}>
                        <l.Img width={spacing.huge} src={instructor.photoSrc} />
                      </l.Space>
                    )}
                    {isMobileOnly() && instructor.logoSrc && (
                      <l.Img height={spacing.huge} src={instructor.logoSrc} />
                    )}
                  </l.Flex>
                  <l.Space>
                    <l.Flex my={spacing.s} spaceBetween>
                      <t.Text>{instructor.name}</t.Text>
                      {isTabletUp() && instructor.logoSrc && (
                        <l.Img
                          height={spacing.xxxxxl}
                          src={instructor.logoSrc}
                        />
                      )}
                    </l.Flex>
                    {instructor.bio && (
                      <t.JustifiedText fontSize="12px">
                        {instructor.bio}
                      </t.JustifiedText>
                    )}
                  </l.Space>
                </l.Flex>
              ))}
            </>
          )}
        </l.Section>
      </ProgramWrapper>
    );
  }
}

export default withRouter(Program);
