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
import {
  AIKIDO_PATH,
  ASSETS_PATH,
  CAPOEIRA_PATH,
  DDPY_PATH,
  OCR_PATH,
  REACT_PATH,
} from '../utils/constants';
import { shuffle } from '../utils/helpers';
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

const Label = styled(l.Flex)(
  {
    color: colors.white,
    font: fonts.poppinsMedium,
    position: 'absolute',
    zIndex: z.low,
    [breakpoints.tabletDown]: {
      justifyContent: 'center',
      left: '50%',
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

const QuadrantWrapper = styled(t.Link)({
  cursor: 'pointer',
  height: 380,
  position: 'relative',
  width: '50%',
  zIndex: z.mid,
  [breakpoints.tablet]: {
    height: 240,
  },
  [breakpoints.mobile]: {
    height: 'auto',
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
  imageSource: string;
  label: string;
  labelProps: {
    bottom?: string;
    left?: string;
    right?: string;
    top?: string;
  };
  logoSrc: string;
  to?: string;
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
    const {
      to,
      imageSource,
      label,
      labelProps,
      logoSrc,
      videoSource,
    } = this.props;
    const { isMuted, isPlaying } = this.state;
    return (
      <QuadrantWrapper
        to={to || ''}
        onMouseEnter={() => this.onHover('enter')}
        onMouseLeave={() => this.onHover('leave')}
      >
        <Image src={imageSource} />
        <Overlay isPlaying={isPlaying} />
        {(!isMobile() || !isPlaying) && (
          <Label {...labelProps}>
            <l.Img height={spacing.xxl} mr={spacing.ml} src={logoSrc} />
            <t.H1 color={colors.white}>{label}</t.H1>
          </Label>
        )}
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

const labelPropsList = [
  { top: spacing.xl, left: spacing.xl },
  { top: spacing.xl, right: spacing.xl },
  { bottom: spacing.xl, left: spacing.xl },
  { bottom: spacing.xl, right: spacing.xxxxl },
];

const FeaturedLinks = () => (
  <l.Space mx={[0, spacing.ml]}>
    <l.Flex isWrap>
      {shuffle([
        {
          imageSource: `${ASSETS_PATH}/featured/photos/react-featured.png`,
          key: 'react',
          label: 'REaCT Mixed Martial Arts',
          logoSrc: `${ASSETS_PATH}/programs/REaCT/react-logo.png`,
          to: REACT_PATH,
          videoSource: `${ASSETS_PATH}/featured/videos/featured-vid-1.mp4`,
        },
        {
          imageSource: `${ASSETS_PATH}/featured/photos/capoeira-featured.png`,
          key: 'capoeira',
          label: 'Capoeira Luanda',
          logoSrc: `${ASSETS_PATH}/programs/Capoeira/capoeira-logo.png`,
          to: CAPOEIRA_PATH,
          videoSource: `${ASSETS_PATH}/featured/videos/featured-vid-2.mp4`,
        },
        {
          imageSource: `${ASSETS_PATH}/featured/photos/aikido-featured.jpg`,
          key: 'aikido',
          label: 'Aikido',
          logoSrc: `${ASSETS_PATH}/programs/Aikido/aikido-logo.png`,
          to: AIKIDO_PATH,
          videoSource: `${ASSETS_PATH}/featured/videos/featured-vid-3.mp4`,
        },
        {
          imageSource: `${ASSETS_PATH}/featured/photos/ocr-featured.png`,
          key: 'ocr-team',
          label: 'Obstacle Course Racing',
          logoSrc: `${ASSETS_PATH}/programs/OCR/ocr.svg`,
          to: OCR_PATH,
          videoSource: `${ASSETS_PATH}/featured/videos/featured-vid-4.mp4`,
        },
        {
          imageSource: `${ASSETS_PATH}/programs/Yoga/ddpy-featured.png`,
          key: 'ddpy',
          label: 'DDPYoga',
          logoSrc: `${ASSETS_PATH}/programs/Yoga/namaslay.png`,
          to: DDPY_PATH,
          videoSource: `${ASSETS_PATH}/programs/Yoga/ddpy-featured.mp4`,
        },
      ])
        .slice(0, 4)
        .map((props, idx) => (
          <Quadrant {...props} labelProps={labelPropsList[idx]} />
        ))}
    </l.Flex>
  </l.Space>
);

export default FeaturedLinks;
