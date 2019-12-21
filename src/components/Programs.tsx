import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import * as React from 'react';
import styled from 'react-emotion';
import * as ReactModal from 'react-modal';
import { PulseLoader } from 'react-spinners';
import * as Sticky from 'react-stickynode';
import { border, fontSize, height, position, space } from 'styled-system';
import ModalCloseImg from '../assets/images/modal-close-dark.svg';
import ProgramsImg from '../assets/images/programs';
import { programContent } from '../content/programs';
import l from '../styles/layout';
import {
  borders,
  breakpoints,
  colors,
  fontSizes,
  gradients,
  spacing,
  transitions,
  z,
} from '../styles/theme';
import t from '../styles/typography';
import { CalendarEvent } from '../types/calendar-event';
import { Program as ProgramType, ProgramContent } from '../types/program';
import { getProgramById } from '../utils/program';
import { isMobileOnly, isTabletUp } from '../utils/screensize';
import { scrollToId } from '../utils/scroll';
import Divider from './Divider';
import { LinkPrimary } from './Form/Button';
import withScroll from './hoc/withScroll';
import Newsletter from './Newsletter';
import Program from './Program';
import { CloseButton } from './Shop/Item';
import SmallProgramCard from './SmallProgramCard';

const Badge = styled(l.Space)(
  {
    borderRadius: borders.radius,
    padding: `${spacing.sm} ${spacing.ml}`,
  },
  ({ background }: { background: string }) => ({
    background,
  }),
  fontSize,
  space,
);

const MembershipCard = styled(l.FlexColumn)(
  {
    border: borders.blackThick,
    borderRadius: borders.radius,
    height: 600,
    padding: spacing.xl,
    transition: transitions.default,
    width: '50%',
    [breakpoints.tablet]: {
      padding: spacing.ml,
    },
    [breakpoints.mobile]: {
      height: 500,
      width: '100%',
    },
    [breakpoints.small]: {
      padding: spacing.sm,
    },
  },
  ({ isActive }: { isActive?: boolean }) => ({
    borderColor: isActive ? colors.red : colors.black,
  }),
  border,
  height,
  position,
);

const scrollOptions = {
  offset: isMobileOnly() ? -80 : -204,
};

const MultipassCard = styled(MembershipCard)({
  border: 'none',
  height: 'auto',
  padding: `${spacing.ml} ${spacing.sm}`,
  position: 'relative',
  width: '100%',
  [breakpoints.tablet]: {
    height: 'auto',
  },
  [breakpoints.mobile]: {
    height: 'auto',
  },
});

interface Props {
  events: CalendarEvent[];
  loadingPrograms: boolean;
  programs: ProgramType[];
}

interface State {
  showMultipassModal: boolean;
}

class Programs extends React.Component<Props, State> {
  targetElement: HTMLElement | null = null;
  state = {
    showMultipassModal: false,
  };

  componentDidMount() {
    this.targetElement = document.querySelector('#top');
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  closeModal = () => this.setState({ showMultipassModal: false });

  openModal = () => this.setState({ showMultipassModal: true });

  render() {
    const { events, loadingPrograms, programs } = this.props;
    const { showMultipassModal } = this.state;
    return (
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
          py={[spacing.xxxl, spacing.xxxl, spacing.xxxxxl]}
        >
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
                bottomBoundary="#programs-end"
              >
                <l.Flex
                  background={colors.background}
                  columnOnMobile
                  pb={spacing.m}
                  pt={spacing.sm}
                  spaceBetween
                >
                  <t.H3
                    py={[spacing.sm, 0, 0]}
                    mr={[0, spacing.sm, spacing.sm]}
                    nowrap
                  >
                    Martial Arts & Fitness Programs
                  </t.H3>
                  <t.TextButton
                    border={borders.red}
                    color={colors.red}
                    onClick={this.openModal}
                  >
                    <l.Flex pb={spacing.t}>
                      <t.Text
                        color={colors.red}
                        fontSize={[
                          fontSizes.text,
                          fontSizes.helpText,
                          fontSizes.text,
                        ]}
                        mr={spacing.sm}
                        textAlign="right"
                      >
                        Get unlimited program access with our
                      </t.Text>
                      <l.Space width={spacing.s} />
                      <Badge
                        background={gradients.multipass}
                        mr={isMobileOnly() ? spacing.m : 0}
                        p={[spacing.s, spacing.s]}
                      >
                        <t.H2
                          color={colors.white}
                          fontSize={[
                            fontSizes.helpText,
                            fontSizes.helpText,
                            fontSizes.helpText,
                          ]}
                          fontWeight="normal"
                          nowrap
                        >
                          Multi-Pass
                        </t.H2>
                      </Badge>
                    </l.Flex>
                  </t.TextButton>
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
                            onClick={() =>
                              scrollToId(program.id, scrollOptions)
                            }
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
                      <Program events={events} program={program} />
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
        <ReactModal
          isOpen={showMultipassModal}
          onAfterOpen={() => {
            if (this.targetElement) {
              disableBodyScroll(this.targetElement);
            }
          }}
          onAfterClose={() => {
            if (this.targetElement) {
              enableBodyScroll(this.targetElement);
            }
          }}
          onRequestClose={this.closeModal}
          style={{
            content: {
              background: colors.background,
              bottom: 'auto',
              margin: '0 auto',
              maxWidth: 550,
            },
            overlay: { zIndex: 1000 },
          }}
        >
          <MultipassCard spaceBetween>
            <l.FlexColumn>
              <Badge background={gradients.multipass}>
                <t.H2 color={colors.white} nowrap>
                  Multi-Pass
                </t.H2>
              </Badge>
              <l.Space height={[spacing.ml, spacing.xl]} />
              <t.Text mb={spacing.sm}>
                Unlimited access to all RFC programs!
              </t.Text>
              <t.Text>2 free day passes per month included.</t.Text>
            </l.FlexColumn>
            <LinkPrimary
              mt={spacing.xl}
              to="/signup"
              type="button"
              size="small"
            >
              Sign up
            </LinkPrimary>
            <CloseButton onClick={this.closeModal} src={ModalCloseImg} />
          </MultipassCard>
        </ReactModal>
      </div>
    );
  }
}

export default withScroll(Programs, scrollOptions);
