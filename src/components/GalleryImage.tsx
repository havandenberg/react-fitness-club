import * as React from 'react';
import styled from 'react-emotion';
import Gallery from 'react-grid-gallery';
import { space } from 'styled-system';
import l from '../styles/layout';
import { borders, breakpoints, spacing } from '../styles/theme';

export const GalleryWrapper = styled('div')({
  borderRadius: borders.borderRadius,
  bottom: 0,
  left: 0,
  opacity: 0,
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
  top: 0,
  width: '100%',
});

export const Image = styled('img')({
  borderRadius: borders.borderRadius,
  width: '100%',
});

export const ImageWrapper = styled('div')(
  {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
    [breakpoints.mobile]: {
      width: '100%',
    },
  },
  space,
);

export interface Image {
  caption?: string;
  src: string;
  thumbnail: string;
  thumbnailHeight: number;
  thumbnailWidth: number;
}

interface Props {
  customStyles?: object;
  image: Image;
}

const GalleryImage = ({ customStyles, image }: Props) => (
  <ImageWrapper style={customStyles}>
    <GalleryWrapper>
      <Gallery
        backdropClosesModal
        enableImageSelection={false}
        images={[image]}
        rowHeight={1000}
        showImageCount={false}
      />
    </GalleryWrapper>
    <Image src={image.src} />
    {image.caption && (
      <l.Space display="inline-block" mb={[spacing.ml, 0]} mt={spacing.m}>
        <l.Caption>{image.caption}</l.Caption>
      </l.Space>
    )}
  </ImageWrapper>
);

export default GalleryImage;
