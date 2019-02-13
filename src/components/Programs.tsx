import * as React from 'react';
import { PulseLoader } from 'react-spinners';
import * as Sticky from 'react-stickynode';
import l from '../styles/layout';
import { borders, colors, fontSizes, spacing, z } from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Member } from '../types/member';
import { Program as ProgramType } from '../types/program';
import { getGenericMembership } from '../utils/membership';
import { isMobileOnly, isTabletUp } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import Divider from './Divider';
import withScroll from './hoc/withScroll';
import MembershipBadge from './MembershipBadge';
import Newsletter from './Newsletter';
import Program from './Program';
import SmallProgramCard from './SmallProgramCard';

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
    <t.Title center mb={spacing.ml}>
      Programs
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
            innerZ={z.high}
            top={isMobileOnly() ? 70 : 50}
            bottomBoundary="#programs-end">
            <l.Flex
              background={colors.background}
              columnRevOnMobile
              py={spacing.sm}
              spaceBetween>
              <t.H3
                pt={[spacing.t, 0, 0]}
                mr={[0, spacing.sm, spacing.sm]}
                nowrap>
                Martial Arts Styles
              </t.H3>
              <t.Link border={borders.red} color={colors.red} to="/login">
                <l.Flex pb={spacing.t}>
                  {isTabletUp() ? 'Get a' : 'A'}ll-program access with
                  {isTabletUp() && ' our'}
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
              {programs.map((program: ProgramType, index: number) => (
                <React.Fragment key={`menu-${program.id}`}>
                  <SmallProgramCard
                    customStyles={{
                      nameFontSize: [
                        fontSizes.helpText,
                        fontSizes.text,
                        fontSizes.text,
                      ],
                      photoSideLength: spacing.xl,
                      wrapper: { p: spacing.t, mb: [0, 0, 0], width: 'auto' },
                    }}
                    onClick={() =>
                      scrollToId(program.id, {
                        offset: isMobileOnly() ? -250 : -204,
                      })
                    }
                    program={program}
                  />
                  {index < programs.length - 1 && (
                    <l.Space width={[spacing.xl, spacing.xxxl, spacing.xxxl]} />
                  )}
                </React.Fragment>
              ))}
            </l.ScrollFlex>
          </Sticky>
          <l.Space height={spacing.ml} />
          {programs.map((program: ProgramType, index: number) => (
            <React.Fragment key={program.id}>
              <Program
                events={events}
                program={program}
                member={member}
                members={members}
              />
              {index < programs.length - 1 && <l.Space height={spacing.xxxl} />}
            </React.Fragment>
          ))}
        </>
      )}
      <div id="programs-end" />
    </l.Page>
    <Newsletter />
    <l.Space height={100} />
  </div>
);

export default withScroll(Programs);
