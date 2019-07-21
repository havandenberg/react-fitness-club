import * as moment from 'moment';
import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { ClassInst } from 'src/types/class';
import l from '../../../styles/layout';
import {
  breakpoints,
  colors,
  fontSizes,
  mobileSizes,
  spacing,
} from '../../../styles/theme';
import t from '../../../styles/typography';
import { Member } from '../../../types/member';
import { Division, Program } from '../../../types/program';
import {
  getClassesAttended,
  getClassFormattedDescription,
} from '../../../utils/class';
import {
  getEnrolledDivisions,
  getEnrolledPrograms,
  getProgramById,
} from '../../../utils/program';
import { isMobile } from '../../../utils/screensize';
import { TinyMembershipBadge } from '../../MembershipBadge';

const LABEL_WIDTH = 220;

const Label = styled(t.Text)({
  [breakpoints.tablet]: {
    marginBottom: spacing.sm,
  },
  [breakpoints.mobile]: {
    fontSize: mobileSizes.largeText,
    marginBottom: spacing.s,
    width: '100%',
  },
  fontSize: fontSizes.largeText,
  fontWeight: 'bold',
  marginBottom: 0,
  marginRight: spacing.xl,
  minWidth: LABEL_WIDTH,
  whiteSpace: 'nowrap',
});

const Row = styled(l.Flex)({
  alignItems: isMobile() ? 'flex-start' : 'center',
  flexDirection: isMobile() ? 'column' : 'row',
  marginBottom: spacing.m,
  [breakpoints.tablet]: {
    marginBottom: spacing.ml,
  },
  [breakpoints.mobile]: {
    marginBottom: spacing.ml,
  },
});

const AdminInfo = ({
  member,
  programs,
}: {
  member: Member;
  programs: Program[];
}) => {
  const enrolledPrograms = getEnrolledPrograms(programs, member.uid);
  const lastClassAttended: ClassInst | undefined = R.head(
    getClassesAttended(programs, member.uid),
  );
  return (
    <l.FlexColumn alignTop width="100%">
      <Row alignItems="flex-start">
        <Label>Enrolled programs:</Label>
        <l.Flex isWrap>
          {enrolledPrograms.map((program: Program, index: number) => {
            const divisions = getEnrolledDivisions(program, member.uid);
            return divisions.map((div: Division) => (
              <React.Fragment key={`${program.id}-${div.id}`}>
                <l.FlexColumn key={program.id} mb={spacing.s} mr={spacing.s}>
                  <l.Img src={program.logoSrc} height={spacing.xxxl} />
                  <t.HelpText>{div.name}</t.HelpText>
                </l.FlexColumn>
                {index < enrolledPrograms.length - 1 && (
                  <l.Space height={spacing.ml} width={spacing.ml} />
                )}
              </React.Fragment>
            ));
          })}
        </l.Flex>
      </Row>
      <Row>
        <Label>Membership:</Label>
        {!R.isEmpty(member.membership.type) && (
          <l.Space>
            <TinyMembershipBadge
              textColor={colors.black}
              membership={member.membership}
              program={getProgramById(member.membership.type, programs)}
              showText
            />
            {member.membership.cost && (
              <t.HelpText>{member.membership.cost}</t.HelpText>
            )}
            <t.HelpText>
              Signed up on{' '}
              {moment(member.membership.signupDate).format('ddd MMM Do, h:mm')}
            </t.HelpText>
          </l.Space>
        )}
      </Row>
      <Row>
        <Label>Last class attended:</Label>
        <t.Text>
          {lastClassAttended
            ? getClassFormattedDescription(lastClassAttended, programs)
            : 'None'}
        </t.Text>
      </Row>
      <Row>
        <Label>Liability waiver:</Label>
      </Row>
      <Row>
        <Label>Member ID:</Label>
        <t.Text>{member.uid}</t.Text>
      </Row>
      <Row>
        <Label>Square ID:</Label>
        <t.Text>{member.squareCustomerId}</t.Text>
      </Row>
    </l.FlexColumn>
  );
};

export default AdminInfo;
