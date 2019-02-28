import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';
import * as React from 'react';
import styled from 'react-emotion';
import * as Modal from 'react-modal';
import ModalCloseImg from '../assets/images/modal-close.svg';
import VideoImg from '../assets/images/video.svg';
import l from '../styles/layout';
import { borders, colors, spacing, z } from '../styles/theme';
import t from '../styles/typography';
import { ASSETS_PATH } from '../utils/constants';
import { isMobileOnly } from '../utils/screensize';

const CloseIcon = styled(l.Space)({
  cursor: 'pointer',
  position: 'absolute',
  right: 0,
  top: `-${spacing.xxl}`,
});

interface State {
  show: boolean;
}

class IntroVideo extends React.Component<{}, State> {
  targetElement: HTMLElement | null = null;

  state = {
    show: false,
  };

  componentDidMount() {
    this.targetElement = document.querySelector('#top');
  }

  openModal = () => {
    this.setState({ show: true });
  };

  closeModal = () => {
    this.setState({ show: false });
  };

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        <t.TextButton
          border={borders.darkBlue}
          color={colors.darkBlue}
          hoverStyle="underline"
          onClick={this.openModal}>
          <l.Flex>
            <l.Img
              height={[spacing.xxxl, spacing.xxxxxl, spacing.xxxxxl]}
              src={VideoImg}
            />
            <l.Space width={spacing.ml} />
            <t.H1 color={colors.darkBlue}>Intro to RFC</t.H1>
          </l.Flex>
        </t.TextButton>
        <Modal
          style={{
            content: {
              backgroundColor: colors.black,
              border: 0,
              borderRadius: borders.borderRadius,
              margin: isMobileOnly() ? spacing.s : spacing.xxl,
              outline: 'none',
              overflow: 'visible',
              padding: spacing.s,
              position: 'static',
            },
            overlay: {
              alignItems: 'center',
              backgroundColor: `${colors.black}C0`,
              bottom: 0,
              display: 'flex',
              justifyContent: 'center',
              left: 0,
              padding: 0,
              position: 'fixed',
              right: 0,
              top: 0,
              zIndex: z.max,
            },
          }}
          isOpen={show}
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
          onRequestClose={this.closeModal}>
          <l.Space
            height={['auto', 500, 500]}
            position="relative"
            width={['100%', 'auto', 'auto']}>
            <video autoPlay controls preload="true" height="100%" width="100%">
              <source
                src={`${ASSETS_PATH}/react-fitness-club-intro-small.mp4`}
                type="video/mp4"
              />
            </video>
            <CloseIcon onClick={this.closeModal}>
              <l.Img height={spacing.ml} src={ModalCloseImg} />
            </CloseIcon>
          </l.Space>
        </Modal>
      </div>
    );
  }
}

export default IntroVideo;
