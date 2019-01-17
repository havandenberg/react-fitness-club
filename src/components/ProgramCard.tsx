import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { height, width } from 'styled-system';
import l from '../styles/layout';
import { borders, breakpoints, spacing } from '../styles/theme';
import t from '../styles/typography';
import { Member } from '../types/member';
import { getDivisionByName, Program } from '../types/program';
import { enrollInDivision } from '../utils/program';
import Form, {
  FormComponentProps,
  FormFieldValidations,
  FormStep,
} from './Form';
import FormActions from './Form/Actions';
import { SelectInput } from './Form/Input';
import { FormItemProps } from './Form/Row';

interface EnrollmentFields {
  divisionId: string;
}

const enrollmentFieldValidations: FormFieldValidations<EnrollmentFields> = {
  divisionId: (value: string) => !R.equals('-', value),
};

const initialValues = {
  divisionId: '-',
};

const formItems: Array<
  FormItemProps<EnrollmentFields, keyof EnrollmentFields>
> = [
  {
    flex: 1,
    inputType: 'select',
    valueName: 'divisionId',
  },
];

interface StepProps {
  isEnrolling: boolean;
  member: Member;
  program: Program;
  setIsEnrolling: (isEnrolling: boolean) => void;
}

class Step extends React.Component<
  FormComponentProps<EnrollmentFields> & StepProps
> {
  handleSubmit = (
    onSuccess: () => void,
    onFail: (error: Error) => void,
    resetForm: () => void,
    data: any,
  ) => {
    const { fields, program, member } = this.props;
    const division = getDivisionByName(fields.divisionId, program);
    if (division) {
      enrollInDivision(division, program.id, member.uid);
    }
  };

  render() {
    const {
      errors,
      fields,
      isEnrolling,
      loading,
      setIsEnrolling,
      resetForm,
      program,
      onChange,
      onSubmit,
    } = this.props;
    const options = R.insert(0, ['-'], R.pluck('name', program.divisions));
    return (
      <>
        {isEnrolling && (
          <SelectInput
            error={R.contains('divisionId', errors)}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              onChange('divisionId', e.currentTarget.value);
            }}
            value={fields.divisionId}
            width="100%"
          >
            {options.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </SelectInput>
        )}
        <FormActions
          backText="Cancel"
          handleBack={
            isEnrolling
              ? () => {
                  resetForm();
                  setIsEnrolling(false);
                }
              : undefined
          }
          handleForward={
            isEnrolling
              ? (e: React.FormEvent) => {
                  e.preventDefault();
                  onSubmit(this.handleSubmit);
                }
              : (e: React.FormEvent) => {
                  e.preventDefault();
                  setIsEnrolling(true);
                }
          }
          forwardText={isEnrolling ? 'Confirm' : 'Enroll'}
          loading={loading}
        />
      </>
    );
  }
}

const formData: Array<FormStep<EnrollmentFields>> = [
  { label: '', FormComponent: Step, rowItems: [{ items: formItems }] },
];

class EnrollmentForm extends Form<EnrollmentFields> {}

export const ProgramCardWrapper = styled(l.Space)(
  {
    border: borders.black,
    borderRadius: borders.borderRadius,
    padding: spacing.xl,
    [breakpoints.mobile]: {
      padding: spacing.ml,
    },
  },
  height,
  width,
);

interface Props {
  program: Program;
  member: Member;
}

interface State {
  isEnrolling: boolean;
}

class ProgramCard extends React.Component<Props, State> {
  state = { isEnrolling: false };

  setIsEnrolling = (isEnrolling: boolean) => {
    this.setState({ isEnrolling });
  };

  render() {
    const { member, program } = this.props;
    const { isEnrolling } = this.state;
    return (
      <ProgramCardWrapper width={['100%', '30%']}>
        <l.Flex alignTop mb={spacing.ml}>
          <l.Img
            src={program.logoSrc}
            height={spacing.xxxxxl}
            mr={spacing.xl}
          />
          <div>
            <t.Text bold large mb={spacing.ml}>
              {program.name}
            </t.Text>
          </div>
        </l.Flex>
        {isEnrolling && (
          <t.HelpText mb={spacing.t}>Choose a division:</t.HelpText>
        )}
        <EnrollmentForm
          id="enrollment-form"
          initialValues={initialValues}
          isEditing
          fieldValidations={enrollmentFieldValidations}
          steps={formData}
          stepProps={{
            isEnrolling,
            member,
            program,
            setIsEnrolling: this.setIsEnrolling,
          }}
          validationErrorMessage=""
        />
      </ProgramCardWrapper>
    );
  }
}

export default ProgramCard;
