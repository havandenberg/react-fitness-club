import * as R from 'ramda';
import * as React from 'react';
import l from '../../../styles/layout';
import { fontSizes, mobileSizes, spacing } from '../../../styles/theme';
import t from '../../../styles/typography';
import { Member } from '../../../types/member';
import { Division, Program } from '../../../types/program';
import {
  getCoachingPrograms,
  getDivisionById,
  getEnrolledPrograms,
  getProgramById,
} from '../../../utils/program';
import { SelectInput, TextInput } from '../../Form/Input';
import SmallMemberCard from '../../SmallMemberCard';

interface Props {
  memberId: string;
  members: Member[];
  onMemberSelect: (member: Member) => void;
  programs: Program[];
  selectedMemberId?: string;
}

interface State {
  divisionId: string;
  programId: string;
  searchValue: string;
}

class MemberList extends React.Component<Props, State> {
  state = {
    divisionId: 'All',
    programId: '',
    searchValue: '',
  };

  handleFilterChange = (field: string) => (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    this.setState({
      ...this.state,
      divisionId: R.equals(field, 'programId') ? 'all' : this.state.divisionId,
      [field]: e.currentTarget.value,
    });
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  filterMembers = () => {
    const { members, programs } = this.props;
    const { divisionId, programId, searchValue } = this.state;
    const program =
      !R.equals(programId, 'all') && getProgramById(programId, programs);
    const division =
      program &&
      !R.equals(divisionId, 'all') &&
      getDivisionById(divisionId, program);

    return members.filter((member: Member) => {
      const isValidProgram = program
        ? R.contains(
            program.id,
            R.pluck('id', getEnrolledPrograms(programs, member.uid)),
          )
        : true;
      const isValidDivision = division
        ? R.contains(member.uid, division.memberIds)
        : true;
      return (
        isValidProgram &&
        isValidDivision &&
        R.reduce(
          (containsSearchValue: boolean, value: string) =>
            containsSearchValue ||
            R.contains(searchValue.toLowerCase(), value.toLowerCase()),
          false,
          R.values(
            R.pick(
              [
                'allergies',
                'city',
                'email',
                'firstName',
                'lastName',
                'medicalConditions',
                'nickname',
                'phone',
                'state',
                'streetAddress1',
                'streetAddress2',
                'zip',
              ],
              member,
            ),
          )
            .concat(R.values(member.dateOfBirth))
            .concat(R.values(member.emergencyContact)),
        )
      );
    });
  };

  render() {
    const { memberId, onMemberSelect, programs, selectedMemberId } = this.props;
    const { divisionId, programId, searchValue } = this.state;
    const program =
      !R.equals(programId, 'all') && getProgramById(programId, programs);
    return (
      <l.Space width={['100%', 250, 325]}>
        <t.HelpText mb={spacing.t}>Search members:</t.HelpText>
        <TextInput
          mb={spacing.sm}
          onChange={this.handleSearchChange}
          value={searchValue}
          width="100%"
        />
        <t.HelpText mb={spacing.t}>Program:</t.HelpText>
        <SelectInput
          mb={R.equals(programId, 'all') ? spacing.m : spacing.sm}
          onChange={this.handleFilterChange('programId')}
          value={programId}
          width="100%"
        >
          <option value="all">All</option>
          {getCoachingPrograms(programs, memberId).map((prog: Program) => (
            <option key={prog.id} value={prog.id}>
              {prog.name}
            </option>
          ))}
        </SelectInput>
        {program && (
          <>
            <t.HelpText mb={spacing.t}>Division:</t.HelpText>
            <SelectInput
              mb={spacing.m}
              onChange={this.handleFilterChange('divisionId')}
              value={divisionId}
              width="100%"
            >
              <option value="all">All</option>
              {program.divisions.map((div: Division) => (
                <option key={div.id} value={div.id}>
                  {div.name}
                </option>
              ))}
            </SelectInput>
          </>
        )}
        <l.Scroll height={[200, 800, 800]} width="100%">
          {R.sortBy(R.prop('lastName'))(this.filterMembers()).map(
            (member: Member) => (
              <div id={member.uid} key={member.uid}>
                <SmallMemberCard
                  activeType="text"
                  isActive={R.equals(selectedMemberId, member.uid)}
                  customStyles={{
                    nameFontSize: [
                      mobileSizes.text,
                      mobileSizes.text,
                      fontSizes.text,
                    ],
                    photoSideLength: [
                      spacing.xxxl,
                      spacing.xxxl,
                      spacing.xxxxl,
                    ],
                    wrapper: {
                      p: spacing.s,
                    },
                  }}
                  member={member}
                  onClick={() => onMemberSelect(member)}
                />
              </div>
            ),
          )}
        </l.Scroll>
      </l.Space>
    );
  }
}

export default MemberList;
