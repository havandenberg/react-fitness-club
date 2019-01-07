import * as React from 'react';
import styled from 'react-emotion';
import l from '../styles/layout';

const ProfileImage = styled('img')({
  borderRadius: '50%',
  height: '100%',
  width: '100%',
});

interface Props {
  customStyles?: React.CSSProperties;
  imageSrc: string;
  sideLength?: string | number;
}

const ProfilePhoto = ({ customStyles, imageSrc, sideLength = 100 }: Props) => (
  <l.Space height={sideLength} style={customStyles} width={sideLength}>
    <ProfileImage src={imageSrc} />
  </l.Space>
);

export default ProfilePhoto;
