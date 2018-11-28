import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { bottom, left, opacity, right, top } from 'styled-system';
import MutedImg from '../assets/images/mute.svg';
import PauseImg from '../assets/images/pause.svg';
import PlayImg from '../assets/images/play.svg';
import UnmutedImg from '../assets/images/volume.svg';
import l from '../styles/layout';
import {
  breakpoints,
  colors,
  fonts,
  fontSizes,
  spacing,
  transitions,
  z,
} from '../styles/theme';
import t from '../styles/typography';
import { ASSETS_PATH, CAPOEIRA_PATH, REACT_PATH } from '../utils/constants';
import { isMobile } from '../utils/screensize';

type ENTER = 'enter';
type LEAVE = 'leave';
type DIRECTION = ENTER | LEAVE;

const ControlIcon = styled('div')({
  bottom: spacing.ml,
  height: spacing.xl,
  position: 'absolute',
  width: spacing.xl,
  zIndex: z.mid,
});

const PlayIcon = styled(ControlIcon)({
  right: isMobile() ? spacing.ml : spacing.xxxxl,
});

const VolumeIcon = styled(ControlIcon)({
  right: isMobile() ? spacing.xxxxl : spacing.ml,
});

const Image = styled('img')({ height: '100%', width: '100%' });

const Label = styled(t.H1)(
  {
    color: colors.white,
    font: fonts.poppinsMedium,
    position: 'absolute',
    zIndex: z.low,
    [breakpoints.tabletDown]: {
      left: '50%',
      textAlign: 'center',
      top: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      width: '100%',
    },
    [breakpoints.small]: {
      fontSize: fontSizes.h2,
    },
  },
  bottom,
  left,
  right,
  top,
);

const Overlay = styled('div')(
  {
    background: `${colors.black}80`,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transition: transitions.default,
    zIndex: z.low,
  },
  ({ isPlaying }: { isPlaying: boolean }) => ({
    opacity: isPlaying ? 0 : 1,
  }),
);

const QuadrantWrapper = styled(t.Anchor)({
  cursor: 'pointer',
  position: 'relative',
  width: '50%',
  zIndex: z.mid,
  [breakpoints.mobile]: {
    width: '100%',
  },
});

const VideoWrapper = styled('div')(
  {
    background: colors.gray,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  opacity,
);

interface FeaturedVideoProps {
  href?: string;
  imageSource: string;
  label: string;
  labelProps: {
    bottom?: string;
    left?: string;
    right?: string;
    top?: string;
  };
  videoSource: string;
}

interface FeaturedVideoState {
  isMuted: boolean;
  isPlaying: boolean;
}

class Quadrant extends React.Component<FeaturedVideoProps, FeaturedVideoState> {
  private vid: React.RefObject<HTMLVideoElement>;

  constructor(props: FeaturedVideoProps) {
    super(props);
    this.vid = React.createRef();
    this.state = {
      isMuted: true,
      isPlaying: false,
    };
  }

  onHover = (direction: DIRECTION) => {
    if (!isMobile()) {
      if (direction === 'enter') {
        this.play();
      }
      if (direction === 'leave') {
        this.pause();
      }
    }
  };

  pause = () => {
    this.setState({ isPlaying: false }, () => {
      if (this.vid.current) {
        this.vid.current.pause();
      }
    });
  };

  play = () => {
    this.setState({ isPlaying: true }, () => {
      if (this.vid.current) {
        this.vid.current.play();
      }
    });
  };

  toggleMuted = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({ isMuted: !this.state.isMuted });
  };

  togglePlaying = (e: React.MouseEvent) => {
    e.preventDefault();
    if (this.state.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  };

  render() {
    const { href, imageSource, label, labelProps, videoSource } = this.props;
    const { isMuted, isPlaying } = this.state;
    return (
      <QuadrantWrapper
        href={!R.isEmpty(href) && href}
        target={!R.isEmpty(href) && '_blank'}
        onMouseEnter={() => this.onHover('enter')}
        onMouseLeave={() => this.onHover('leave')}
      >
        <Image src={imageSource} />
        <Overlay isPlaying={isPlaying} />
        {(!isMobile() || !isPlaying) && <Label {...labelProps}>{label}</Label>}
        {isMobile() && (
          <PlayIcon onClick={this.togglePlaying}>
            <Image src={isPlaying ? PauseImg : PlayImg} />
          </PlayIcon>
        )}
        {isPlaying && (
          <VolumeIcon onClick={this.toggleMuted}>
            <Image src={isMuted ? MutedImg : UnmutedImg} />
          </VolumeIcon>
        )}
        <VideoWrapper opacity={isPlaying ? 1 : 0}>
          <video
            height="100%"
            loop
            muted={isMuted}
            preload="true"
            ref={this.vid}
            width="100%"
          >
            <source src={videoSource} type="video/mp4" />
          </video>
        </VideoWrapper>
      </QuadrantWrapper>
    );
  }
}

const FeaturedLinks = () => (
  <l.Space mx={[spacing.sm, spacing.ml]}>
    <l.Flex columnOnMobile>
      <Quadrant
        href={REACT_PATH}
        imageSource={`${ASSETS_PATH}/featured/photos/react-featured.png`}
        label="REaCT Mixed Martial Arts"
        labelProps={{ top: spacing.xl, left: spacing.xl }}
        videoSource={`${ASSETS_PATH}/featured/videos/featured-vid-1.mp4`}
      />
      <Quadrant
        href={CAPOEIRA_PATH}
        imageSource={`${ASSETS_PATH}/featured/photos/capoeira-featured.png`}
        label="Capoeira Luanda"
        labelProps={{ top: spacing.xl, right: spacing.xl }}
        videoSource={`${ASSETS_PATH}/featured/videos/featured-vid-2.mp4`}
      />
    </l.Flex>
    <l.Flex columnOnMobile>
      <Quadrant
        href="/"
        imageSource={`${ASSETS_PATH}/featured/photos/aikido-featured.png`}
        label="Aikido"
        labelProps={{ bottom: spacing.xl, left: spacing.xl }}
        videoSource={`${ASSETS_PATH}/featured/videos/featured-vid-3.mp4`}
      />
      <Quadrant
        imageSource={`${ASSETS_PATH}/featured/photos/ocr-featured.png`}
        label="Obstacle Course Racing"
        labelProps={{ bottom: spacing.xl, right: spacing.xxxxl }}
        videoSource={`${ASSETS_PATH}/featured/videos/featured-vid-4.mp4`}
      />
    </l.Flex>
  </l.Space>
);

export default FeaturedLinks;
