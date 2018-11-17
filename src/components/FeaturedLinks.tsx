import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { bottom, left, opacity, right, top } from 'styled-system';
import l from '../styles/layout';
import {
  breakpoints,
  colors,
  fonts,
  fontSizes,
  spacing,
  z,
} from '../styles/theme';
import t from '../styles/typography';
import { ASSETS_PATH, CAPOEIRA_PATH, REACT_PATH } from '../utils/constants';

type ENTER = 'enter';
type LEAVE = 'leave';
type DIRECTION = ENTER | LEAVE;

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
  href: string;
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
  isPlaying: boolean;
}

class Quadrant extends React.Component<FeaturedVideoProps, FeaturedVideoState> {
  private vid: React.RefObject<HTMLVideoElement>;

  constructor(props: FeaturedVideoProps) {
    super(props);
    this.vid = React.createRef();
    this.state = {
      isPlaying: false,
    };
  }

  onHover = (direction: DIRECTION) => {
    if (direction === 'enter') {
      this.setState({ isPlaying: true }, () => {
        if (this.vid.current) {
          this.vid.current.play();
        }
      });
    }
    if (direction === 'leave') {
      this.setState({ isPlaying: false }, () => {
        if (this.vid.current) {
          this.vid.current.pause();
        }
      });
    }
  };

  render() {
    const { href, imageSource, label, labelProps, videoSource } = this.props;
    const { isPlaying } = this.state;
    return (
      <QuadrantWrapper
        href={!R.isEmpty(href) && href}
        target={!R.isEmpty(href) && '_blank'}
        onMouseEnter={() => this.onHover('enter')}
        onMouseLeave={() => this.onHover('leave')}
      >
        <Image src={imageSource} />
        <Overlay isPlaying={isPlaying} />
        <Label {...labelProps}>{label}</Label>
        <VideoWrapper opacity={this.state.isPlaying ? 1 : 0}>
          <video
            height="100%"
            loop
            muted
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
        imageSource={`${ASSETS_PATH}/quad-1.jpg`}
        label="REaCT Mixed Martial Arts"
        labelProps={{ top: spacing.xl, left: spacing.xl }}
        videoSource={`${ASSETS_PATH}/featured-videos/featured-vid-1.mp4`}
      />
      <Quadrant
        href={CAPOEIRA_PATH}
        imageSource={`${ASSETS_PATH}/quad-2.jpg`}
        label="Capoeira Luanda"
        labelProps={{ top: spacing.xl, right: spacing.xl }}
        videoSource={`${ASSETS_PATH}/featured-videos/featured-vid-2.mp4`}
      />
    </l.Flex>
    <l.Flex columnOnMobile>
      <Quadrant
        href=""
        imageSource={`${ASSETS_PATH}/quad-3.png`}
        label="Aikido"
        labelProps={{ bottom: spacing.xl, left: spacing.xl }}
        videoSource={`${ASSETS_PATH}/featured-videos/featured-vid-3.mp4`}
      />
      <Quadrant
        href=""
        imageSource={`${ASSETS_PATH}/quad-4.jpg`}
        label="Obstacle Course Racing"
        labelProps={{ bottom: spacing.xl, right: spacing.xl }}
        videoSource={`${ASSETS_PATH}/featured-videos/featured-vid-4.mp4`}
      />
    </l.Flex>
  </l.Space>
);

export default FeaturedLinks;
