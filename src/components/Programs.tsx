import * as React from 'react';
import { PulseLoader } from 'react-spinners';
import * as Sticky from 'react-stickynode';
import { getProgramById } from 'src/utils/program';
import ProgramsImg from '../assets/images/programs';
import { programContent } from '../content/programs';
import l from '../styles/layout';
import { borders, colors, fontSizes, spacing, z } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import { Program as ProgramType, ProgramContent } from '../types/program';
import { getGenericMembership } from '../utils/membership';
import { isDesktop, isMobileOnly, isTabletUp } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import MembershipBadge from './MembershipBadge';
import Newsletter from './Newsletter';
import Program from './Program';
import SmallProgramCard from './SmallProgramCard';

const scrollOptions = {
  offset: isMobileOnly() ? -80 : -204,
};

interface Props {
  events: CalendarEvent[];
  loadingPrograms: boolean;
  member?: Member;
  members?: Member[];
  programs: ProgramType[];
}

const Programs = ({
  events,
  loadingPrograms,
  member,
  members,
  programs,
}: Props) => (
  <div>
    <t.Title center pb={spacing.ml}>
      <l.FlexCentered>
        <l.Space mr={spacing.ml}>
          <ProgramsImg side={[spacing.xxl, spacing.xxl, spacing.xxxxl]} />
        </l.Space>
        Programs
      </l.FlexCentered>
    </t.Title>
    <Divider white />
    <l.Page
      px={[spacing.sm, 0]}
      py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}>
      {loadingPrograms ? (
        <l.FlexCentered>
          <l.FlexColumn>
            <PulseLoader sizeUnit="px" size={30} color={colors.black} />
            <t.Text mt={spacing.m}>Loading programs</t.Text>
          </l.FlexColumn>
        </l.FlexCentered>
      ) : (
        <>
          <Sticky
            enabled={isTabletUp()}
            innerZ={z.high}
            top="#nav-end"
            bottomBoundary="#programs-end">
            <l.Flex
              background={colors.background}
              columnRevOnMobile
              py={spacing.sm}
              spaceBetween>
              <t.H3
                py={[spacing.sm, 0, 0]}
                mr={[0, spacing.sm, spacing.sm]}
                nowrap>
                Martial Arts & Fitness Programs
              </t.H3>
              <t.Link border={borders.red} color={colors.red} to="/signup">
                <l.Flex pb={spacing.t}>
                  <t.Text
                    color={colors.red}
                    fontSize={[
                      fontSizes.text,
                      fontSizes.helpText,
                      fontSizes.text,
                    ]}>
                    {isDesktop() ? 'Get a' : 'A'}ll-program access with our
                  </t.Text>
                  <l.Space width={spacing.s} />
                  <MembershipBadge
                    customStyles={{
                      badge: {
                        p: [spacing.s, spacing.s],
                      },
                      badgeText: {
                        fontSize: [
                          fontSizes.helpText,
                          fontSizes.helpText,
                          fontSizes.helpText,
                        ],
                        fontWeight: 'normal',
                      },
                      wrapper: {
                        mb: 0,
                        p: 0,
                      },
                    }}
                    membership={getGenericMembership('multipass')}
                  />
                </l.Flex>
              </t.Link>
            </l.Flex>
            <l.ScrollFlex background={colors.background}>
              {programContent.map((prog: ProgramContent, index: number) => {
                const program = getProgramById(prog.id, programs);
                return (
                  program && (
                    <React.Fragment key={`menu-${program.id}`}>
                      <SmallProgramCard
                        customStyles={{
                          nameFontSize: [
                            fontSizes.helpText,
                            fontSizes.text,
                            fontSizes.text,
                          ],
                          photoSideLength: spacing.xl,
                          wrapper: {
                            mb: [0, 0, 0],
                            p: spacing.t,
                            width: 'auto',
                          },
                        }}
                        onClick={() => scrollToId(program.id, scrollOptions)}
                        program={program}
                      />
                      {index < programs.length - 1 && (
                        <l.Space
                          width={[spacing.xl, spacing.xxxl, spacing.xxxl]}
                        />
                      )}
                    </React.Fragment>
                  )
                );
              })}
            </l.ScrollFlex>
          </Sticky>
          <l.Space height={spacing.ml} />
          {programContent.map((prog: ProgramContent, index: number) => {
            const program = getProgramById(prog.id, programs);
            return (
              program && (
                <React.Fragment key={program.id}>
                  <Program
                    events={events}
                    program={program}
                    member={member}
                    members={members}
                  />
                  {index < programs.length - 1 && (
                    <l.Space height={spacing.xxxl} />
                  )}
                </React.Fragment>
              )
            );
          })}
        </>
      )}
      <div id="programs-end" />
    </l.Page>
    <Newsletter />
    <l.Space height={100} />
  </div>
);

export default withScroll(Programs, scrollOptions);
