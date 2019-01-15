import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import l from '../styles/layout';
import { borders, colors, spacing, transitions } from '../styles/theme';
import t from '../styles/typography';
import { ClassInst } from '../types/class';
import { Member } from '../types/member';
import { Program } from '../types/program';
import { toggleAttendingClass } from '../utils/class';
import { isTabletUp } from '../utils/screensize';
import ProfilePhoto from './ProfilePhoto';

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
  member,
  program,
}: {
  classInst?: ClassInst;
  member: Member;
  program?: Program;
}) => (
  <SmallMemberCardWrapper
    classInst={classInst}
    isSignedIn={classInst && R.contains(member.uid, classInst.membersAttended)}
    onClick={
      classInst && program
        ? () => toggleAttendingClass(member, program, classInst)
        : undefined
    }
    p={[spacing.s, spacing.sm, spacing.sm]}
    spaceBetween
    width={250}
  >
    <ProfilePhoto
      imageSrc={member.profilePhotoUrl}
      sideLength={[spacing.xxxl, spacing.xxxxl, spacing.xxxxl]}
    />
    <l.Space width={[spacing.sm, spacing.ml, spacing.ml]} />
    <t.Text large={isTabletUp()}>{`${member.firstName} ${
      member.lastName
    }`}</t.Text>
  </SmallMemberCardWrapper>
);

export default SmallMemberCard;
