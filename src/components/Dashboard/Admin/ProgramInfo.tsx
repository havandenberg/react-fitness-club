import * as moment from 'moment';
import * as R from 'ramda';
import * as React from 'react';
import { TinyMembershipBadge } from '../../../components/MembershipBadge';
import l from '../../../styles/layout';
import { spacing } from '../../../styles/theme';
import t from '../../../styles/typography';
import { Member } from '../../../types/member';
import { Division, Program } from '../../../types/program';
// import { getClassesAttended } from '../../../utils/class';
import {
  getEnrolledDivisions,
  getEnrolledPrograms,
} from '../../../utils/program';
import { isMobile } from '../../../utils/screensize';

const LABEL_WIDTH = 300;

const ProgramInfo = ({
  member,
  programs,
}: {
  member: Member;
  programs: Program[];
}) => {
  const enrolledPrograms = getEnrolledPrograms(programs, member.uid);
  return (
    <l.FlexColumn width="100%">
      <l.Flex
        alignTop={isMobile()}
        columnOnMobile
        mb={[spacing.ml, spacing.sm]}>
        <t.Text bold large mb={[spacing.s, 0]} width={['100%', LABEL_WIDTH]}>
          Enrolled programs:
        </t.Text>
        <l.Flex isWrap>
          {enrolledPrograms.map((program: Program, index: number) => {
            const divisions = getEnrolledDivisions(program, member.uid);
            return divisions.map((div: Division) => (
              <React.Fragment key={program.id}>
                <l.FlexColumn key={program.id} mb={spacing.s}>
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
      </l.Flex>
      <l.Flex
        alignTop={isMobile()}
        columnOnMobile
        mb={[spacing.ml, spacing.sm]}>
        <t.Text bold large mb={[spacing.s, 0]} width={['100%', LABEL_WIDTH]}>
          Membership level:
        </t.Text>
        {!R.isEmpty(member.membership.type) && (
          <l.Flex isWrap width="100%">
            <l.Space>
              <TinyMembershipBadge membership={member.membership} showText />
              <t.HelpText>
                signed up on{' '}
                {moment(member.membership.signupDate).format(
                  'ddd MMM Do, h:mm',
                )}
              </t.HelpText>
            </l.Space>
          </l.Flex>
        )}
      </l.Flex>
      <l.Flex
        alignTop={isMobile()}
        columnOnMobile
        mb={[spacing.ml, spacing.sm]}>
        <t.Text bold large mb={[spacing.s, 0]} width={['100%', LABEL_WIDTH]}>
          Last class attended:
        </t.Text>
        <l.Flex isWrap width="100%">
          <l.Space />
        </l.Flex>
      </l.Flex>
      <l.Flex
        alignTop={isMobile()}
        columnOnMobile
        mb={[spacing.ml, spacing.sm]}>
        <t.Text bold large mb={[spacing.s, 0]} width={['100%', LABEL_WIDTH]}>
          Liability waiver:
        </t.Text>
        <l.Flex isWrap width="100%">
          <div />
        </l.Flex>
      </l.Flex>
    </l.FlexColumn>
  );
};

export default ProgramInfo;
