import * as React from 'react';
import styled from 'react-emotion';
import l from '../styles/layout';
import {
  borders,
  colors,
  fontSizes,
  spacing,
  transitions,
} from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { StyleSet, StyleValue } from '../types/styles';
import { isTabletUp } from '../utils/screensize';
import ProfilePhoto from './ProfilePhoto';

type ActiveType = 'border' | 'text';

const Name = styled(t.Text)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  transition: transitions.default,
});

const SmallMemberCardWrapper = styled(l.Flex)(
  {
    border: borders.transparentThick,
    borderRadius: borders.radius,
    transition: transitions.default,
  },
  ({
    activeType,
    borderColor,
    isActive,
    onClick,
  }: {
    activeType?: ActiveType;
    borderColor?: string;
    isActive?: boolean;
    onClick?: () => void;
  }) => ({
    '.name': {
      color:
        activeType === 'text'
          ? isActive
            ? colors.red
            : colors.black
          : undefined,
    },
    ':hover': {
      '.name': {
        color: activeType === 'text' ? colors.red : colors.black,
      },
    },
    borderColor:
      activeType === 'border'
        ? isActive
          ? colors.lightGreen
          : colors.lightRed
        : borderColor,
    cursor: onClick ? 'pointer' : 'default',
  }),
);

const SmallMemberCard = ({
  activeType,
  customStyles = {
    nameFontSize: fontSizes.largeText,
    photoSideLength: [spacing.xxxxl, spacing.xxxxxl, spacing.xxxxxl],
    wrapper: {
      mb: spacing.ml,
      p: [spacing.s, spacing.sm, spacing.sm],
      width: ['100%', 250, 300],
    },
  },
  isActive,
  member,
  onClick,
}: {
  activeType?: ActiveType;
  customStyles?: {
    nameFontSize?: StyleValue;
    photoSideLength?: StyleValue;
    wrapper?: StyleSet;
  };
  isActive?: boolean;
  member: Member;
  onClick?: () => void;
}) => (
  <SmallMemberCardWrapper
    activeType={activeType}
    isActive={isActive}
    onClick={onClick}
    {...customStyles.wrapper}>
    <ProfilePhoto
      imageSrc={member.profilePhotoUrl}
      sideLength={customStyles.photoSideLength}
    />
    <l.Space width={[spacing.sm, spacing.ml, spacing.ml]} />
    <Name
      className="name"
      fontSize={customStyles.nameFontSize}
      isWrap
      maxWidth={isTabletUp() ? 200 : undefined}>
      {member.firstName} {member.lastName}
    </Name>
  </SmallMemberCardWrapper>
);

export default SmallMemberCard;
