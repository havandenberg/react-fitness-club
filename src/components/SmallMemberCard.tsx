import * as R from 'ramda';
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
import { ClassInst } from '../types/class';
import { Member } from '../types/member';
import { toggleAttendingClass } from '../utils/class';
import { isTabletUp, TABLET_UP } from '../utils/screensize';
import ProfilePhoto from './ProfilePhoto';

const Name = styled(t.Text)({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const SmallMemberCardWrapper = styled(l.Flex)(
  {
    border: borders.transparentThick,
    borderRadius: borders.borderRadius,
    transition: transitions.default,
  },
  ({
    isSignedIn,
    classInst,
  }: {
    classInst?: ClassInst;
    isSignedIn?: boolean;
  }) => ({
    borderColor: classInst
      ? isSignedIn
        ? colors.lightGreen
        : colors.lightRed
      : undefined,
    cursor: classInst ? 'pointer' : 'default',
  }),
);

const SmallMemberCard = ({
  classInst,
  divisionId,
  member,
  programId,
}: {
  classInst?: ClassInst;
  divisionId?: string;
  member: Member;
  programId?: string;
}) => (
  <SmallMemberCardWrapper
    classInst={classInst}
    isSignedIn={classInst && R.contains(member.uid, classInst.attendanceIds)}
    onClick={
      classInst && programId && divisionId
        ? () =>
            toggleAttendingClass(classInst, member.uid, programId, divisionId)
        : undefined
    }
    mb={spacing.ml}
    p={[spacing.s, spacing.sm, spacing.sm]}
    width={['100%', 250, 300]}
  >
    <ProfilePhoto
      imageSrc={member.profilePhotoUrl}
      sideLength={[spacing.xxxxl, spacing.xxxxxl, spacing.xxxxxl]}
    />
    <l.Space width={[spacing.sm, spacing.ml, spacing.ml]} />
    <Name
      fontSize={fontSizes.largeText}
      maxWidth={isTabletUp() ? 200 : undefined}
    >
      {member.firstName} <l.Break breakpoint={TABLET_UP} />
      {member.lastName}
    </Name>
  </SmallMemberCardWrapper>
);

export default SmallMemberCard;
