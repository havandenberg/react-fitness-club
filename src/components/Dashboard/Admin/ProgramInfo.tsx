import * as React from 'react';
import l from '../../../styles/layout';
import { spacing } from '../../../styles/theme';
import t from '../../../styles/typography';
import { Member } from '../../../types/member';
import { Program } from '../../../types/program';
// import { getClassesAttended } from '../../../utils/class';
import {
  getEnrolledDivision,
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
    <l.Space>
      <l.Flex
        alignTop={isMobile()}
        columnOnMobile
        mb={[spacing.ml, spacing.sm]}
      >
        <t.Text bold large mb={[spacing.s, 0]} width={['100%', LABEL_WIDTH]}>
          Enrolled programs:
        </t.Text>
        <l.Flex>
          {enrolledPrograms.map((program: Program, index: number) => {
            const division = getEnrolledDivision(program, member.uid);
            return (
              division && (
                <React.Fragment key={program.id}>
                  <l.FlexColumn key={program.id}>
                    <l.Img src={program.logoSrc} height={spacing.xxxl} />
                    <t.HelpText>{division.name}</t.HelpText>
                  </l.FlexColumn>
                  {index < enrolledPrograms.length - 1 && (
                    <l.Space width={spacing.ml} />
                  )}
                </React.Fragment>
              )
            );
          })}
        </l.Flex>
      </l.Flex>
      <l.Flex
        alignTop={isMobile()}
        columnOnMobile
        mb={[spacing.ml, spacing.sm]}
      >
        <t.Text bold large mb={[spacing.s, 0]} width={['100%', LABEL_WIDTH]}>
          Membership level:
        </t.Text>
      </l.Flex>
      <l.Flex
        alignTop={isMobile()}
        columnOnMobile
        mb={[spacing.ml, spacing.sm]}
      >
        <t.Text bold large mb={[spacing.s, 0]} width={['100%', LABEL_WIDTH]}>
          Last class attended:
        </t.Text>
      </l.Flex>
      <l.Flex
        alignTop={isMobile()}
        columnOnMobile
        mb={[spacing.ml, spacing.sm]}
      >
        <t.Text bold large mb={[spacing.s, 0]} width={['100%', LABEL_WIDTH]}>
          Liability waiver:
        </t.Text>
      </l.Flex>
    </l.Space>
  );
};

export default ProgramInfo;
