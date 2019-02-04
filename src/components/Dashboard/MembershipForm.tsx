import * as R from 'ramda';
import * as React from 'react';
import styled from 'react-emotion';
import { multipass } from '../../content/memberships';
import l from '../../styles/layout';
import {
  borders,
  breakpoints,
  colors,
  spacing,
  transitions,
} from '../../styles/theme';
import t from '../../styles/typography';
import { MembershipType } from '../../types/membership';
import { Division, Program } from '../../types/program';
import { getMemberRef } from '../../utils/member';
import { getGenericMembership } from '../../utils/membership';
import {
  getDivisionDiscountMonths,
  getDivisionDiscountMultiplier,
} from '../../utils/program';
import {
  enrollInDivision,
  getDivisionById,
  getProgramById,
} from '../../utils/program';
import { isSmall } from '../../utils/screensize';
import { scrollToId } from '../../utils/scroll';
import Form, {
  FormComponentProps,
  FormFieldValidations,
  FormStep,
} from '../Form';
import { ButtonPrimary, ButtonSecondary } from '../Form/Button';
import { SelectInput } from '../Form/Input';
import { FormItemProps } from '../Form/Row';
import MembershipBadge, { multipassCost } from '../MembershipBadge';
import SmallProgramCard from '../SmallProgramCard';
import { MembershipProps } from './Membership';

const CancelSwitchMembership = styled(t.TextButton)({
  float: 'left',
  marginTop: spacing.t,
});

const MembershipCard = styled(l.FlexColumn)(
  {
    border: borders.blackThick,
    borderRadius: borders.borderRadius,
    height: 600,
    padding: spacing.xl,
    transition: transitions.default,
    width: '50%',
    [breakpoints.tablet]: {
      padding: spacing.ml,
    },
    [breakpoints.mobile]: {
      height: 550,
      width: '100%',
    },
    [breakpoints.small]: {
      padding: spacing.sm,
    },
  },
  ({ isActive }: { isActive?: boolean }) => ({
    borderColor: isActive ? colors.red : colors.black,
  }),
);

interface MembershipFields {
  divisionId: string;
  membershipType: MembershipType;
  selectedDivisionId: string;
  selectedMembershipType: MembershipType;
}

const initialValues: MembershipFields = {
  divisionId: '',
  membershipType: '',
  selectedDivisionId: '',
  selectedMembershipType: '',
};

export const membershipFieldValidations: FormFieldValidations<
  MembershipFields
> = {
  divisionId: (value: string, fields: MembershipFields) =>
    R.equals(fields.membershipType, 'multipass')
      ? true
      : !R.isEmpty(fields.selectedDivisionId),
  membershipType: (value: string, fields: MembershipFields) =>
    !R.isEmpty(value) && R.equals(value, 'multipass')
      ? true
      : !R.isEmpty(fields.selectedMembershipType) &&
        !R.isEmpty(fields.selectedDivisionId),
};

const formItems: Array<
  FormItemProps<MembershipFields, keyof MembershipFields>
> = [
  {
    flex: 1,
    inputType: 'select',
    valueName: 'membershipType',
  },
  {
    flex: 1,
    inputType: 'select',
    valueName: 'divisionId',
  },
];

interface MembershipFormProps extends MembershipProps {
  setProgramView?: () => void;
  cancelSwitchMembership?: () => void;
}

interface State {
  programSelectIsOpen: boolean;
}

class Step extends React.Component<
  FormComponentProps<MembershipFields> & MembershipFormProps,
  State
> {
  state = {
    programSelectIsOpen: false,
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const {
      cancelSwitchMembership,
      fields,
      member,
      onSubmit,
      programs,
      setProgramView,
    } = this.props;
    const hasPastMembership = !R.isEmpty(member.membership.type);
    onSubmit(
      (
        onSuccess: () => void,
        onFail: (error: Error) => void,
        resetForm: () => void,
        data: any,
      ) => {
        getMemberRef(member.uid)
          .update({
            membership: {
              inactivePeriods: JSON.stringify([]),
              signupDate: new Date(),
              type: fields.membershipType,
            },
            pastMemberships: hasPastMembership
              ? JSON.stringify(
                  member.pastMemberships.concat([member.membership]),
                )
              : JSON.stringify(member.pastMemberships),
          })
          .then(() => {
            if (!R.equals(fields.membershipType, 'multipass')) {
              const program = getProgramById(fields.membershipType, programs);
              const division =
                program && getDivisionById(fields.divisionId, program);
              if (program && division) {
                enrollInDivision(division, program.id, member.uid).then(() => {
                  onSuccess();
                  if (setProgramView) {
                    setProgramView();
                  }
                  if (cancelSwitchMembership) {
                    cancelSwitchMembership();
                  }
                  scrollToId('top');
                });
              }
            } else {
              onSuccess();
              if (setProgramView) {
                setProgramView();
              }
              if (cancelSwitchMembership) {
                cancelSwitchMembership();
              }
              scrollToId('top');
            }
          })
          .catch((error: Error) => {
            onFail(error);
          });
      },
    );
  };

  setSelectedProgram = () => {
    const { fields, onChange, validate } = this.props;
    if (validate()) {
      onChange('membershipType', fields.selectedMembershipType, () => {
        onChange('divisionId', fields.selectedDivisionId, () => {
          scrollToId('confirm-section', { offset: -100 });
        });
      });
    } else {
      onChange('membershipType', '', () => onChange('divisionId', ''));
    }
  };

  toggleProgramSelectOpen = (programSelectIsOpen: boolean) => {
    this.setState({ programSelectIsOpen });
  };

  render() {
    const {
      cancelSwitchMembership,
      errors,
      fields,
      onChange,
      programs,
      validate,
    } = this.props;
    const { programSelectIsOpen } = this.state;

    const selectedProgram = getProgramById(
      fields.selectedMembershipType,
      programs,
    );
    const selectedDivision =
      selectedProgram &&
      getDivisionById(fields.selectedDivisionId, selectedProgram);
    const selectedProgramDiscountMonths =
      selectedProgram &&
      (R.isEmpty(fields.selectedMembershipType)
        ? false
        : getDivisionDiscountMonths(
            selectedProgram,
            selectedDivision ? selectedDivision.id : undefined,
          ));

    const program = getProgramById(fields.membershipType, programs);

    return (
      <>
        <l.Flex spaceBetween mb={spacing.xl}>
          {cancelSwitchMembership && (
            <CancelSwitchMembership
              large
              onClick={cancelSwitchMembership}
              width={spacing.xxxxxl}>
              Back
            </CancelSwitchMembership>
          )}
          <t.Text center large>
            Select a membership and confirm below:
          </t.Text>
          <l.Space width={spacing.xxxxxl} />
        </l.Flex>
        <l.Flex columnRevOnMobile mb={spacing.xxxl}>
          <MembershipCard
            isActive={
              !R.isEmpty(fields.membershipType) &&
              !R.equals(fields.membershipType, 'multipass')
            }
            spaceBetween>
            <l.FlexColumn>
              <t.H2 py={[0, spacing.sm, spacing.sm]}>Single Program</t.H2>
              <l.Space height={[spacing.ml, spacing.xl]} />
              <t.Text mb={spacing.sm}>Full access to one RFC program:</t.Text>
              {selectedProgram && selectedProgramDiscountMonths ? (
                <t.Text mb={spacing.ml}>
                  First {selectedProgramDiscountMonths} months -{' '}
                  {getDivisionDiscountMultiplier(
                    selectedProgram,
                    selectedDivision && selectedDivision.id,
                  ) * 100}
                  % off trial period
                </t.Text>
              ) : (
                <t.Text mb={spacing.ml}>
                  Discounted trial period at 20% off or more
                </t.Text>
              )}
            </l.FlexColumn>
            <l.FlexColumn width="100%">
              {selectedProgram && (
                <SmallProgramCard
                  customStyles={{
                    wrapper: { mb: 0, width: ['100%', '100%', 350] },
                  }}
                  divisionId={selectedDivision && selectedDivision.id}
                  program={selectedProgram}
                  showCost
                />
              )}
              <l.Space height={spacing.sm} />
              <t.HelpText alignSelf="flex-start" mb={spacing.t}>
                Choose a program:
              </t.HelpText>
              <SelectInput
                error={R.contains('membershipType', errors)}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  onChange(
                    'selectedMembershipType',
                    e.currentTarget.value,
                    () => {
                      onChange('selectedDivisionId', '');
                      this.toggleProgramSelectOpen(false);
                    },
                  );
                }}
                onClick={() => this.toggleProgramSelectOpen(true)}
                value={fields.selectedMembershipType}
                width="100%">
                <option value="">-</option>
                {programs.map((prog: Program) => (
                  <option key={prog.id} value={prog.id}>
                    {programSelectIsOpen
                      ? `${prog.name} ($${prog.monthlyCost}/month)`
                      : prog.name}
                  </option>
                ))}
              </SelectInput>
              {selectedProgram && (
                <>
                  <l.Space height={spacing.ml} />
                  <t.HelpText alignSelf="flex-start" mb={spacing.t}>
                    Choose a division:
                  </t.HelpText>
                  <SelectInput
                    error={R.contains('divisionId', errors)}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      !R.isEmpty(e.currentTarget.value) &&
                      onChange('selectedDivisionId', e.currentTarget.value)
                    }
                    value={fields.selectedDivisionId}
                    width="100%">
                    <option value="">-</option>
                    {selectedProgram.divisions.map((div: Division) => (
                      <option key={div.id} value={div.id}>
                        {div.name}
                      </option>
                    ))}
                  </SelectInput>
                </>
              )}
            </l.FlexColumn>
            <l.Space height={spacing.ml} />
            <ButtonSecondary
              onClick={() => {
                if (R.equals(fields.membershipType, 'multipass')) {
                  onChange(
                    'membershipType',
                    fields.selectedMembershipType,
                    () => {
                      this.setSelectedProgram();
                    },
                  );
                } else {
                  this.setSelectedProgram();
                }
              }}
              type="button">
              Select
            </ButtonSecondary>
          </MembershipCard>
          <l.Space height={spacing.xl} width={spacing.xl} />
          <MembershipCard
            isActive={R.equals(fields.membershipType, 'multipass')}
            spaceBetween>
            <l.FlexColumn>
              <MembershipBadge membership={getGenericMembership('multipass')} />
              <l.Space height={[spacing.ml, spacing.xl]} />
              <t.Text mb={spacing.sm}>
                Unlimited access to all RFC programs
              </t.Text>
              <t.Text mb={spacing.sm}>
                2 free day passes per month included
              </t.Text>
              <t.Text>
                First {multipass.discountMonths} months -{' '}
                {multipass.discountMultiplier * 100}% off trial period
              </t.Text>
            </l.FlexColumn>
            {multipassCost}
            <l.FlexColumn>
              <t.Text center mb={spacing.sm}>
                You will be able to enroll in programs at the next step
              </t.Text>
            </l.FlexColumn>
            <ButtonSecondary
              onClick={() => {
                onChange('membershipType', 'multipass', () => {
                  validate();
                });
                scrollToId('confirm-section', { offset: -100 });
              }}
              type="button">
              Select
            </ButtonSecondary>
          </MembershipCard>
        </l.Flex>
        <l.FlexColumn
          id="confirm-section"
          mx="auto"
          width={['100%', '100%', '80%']}>
          <t.Text center large mb={spacing.sm}>
            Want to bring a friend?
          </t.Text>
          <t.Text center large mb={spacing.xxl}>
            Day passes are available at the door for $10 / day. Limited to 2 per
            guest per month (you get an extra 2 for free with the multipass).
          </t.Text>
          <t.Text center large mb={spacing.sm}>
            At the moment online payments are not available, so for now all
            transactions must be completed at the studio. Please bring your
            first payment to your first class.
          </t.Text>
          <t.Text center large mb={spacing.xxxl}>
            We accept all major forms of payment.
          </t.Text>
          {R.isEmpty(fields.membershipType) ? (
            <t.H2 center color={colors.red}>
              Please select a membership above to continue
            </t.H2>
          ) : (
            <>
              <l.FlexColumnCentered>
                <l.Flex>
                  <MembershipBadge
                    customStyles={{
                      wrapper: {
                        mb: 0,
                        p: 0,
                        width: isSmall() ? 250 : ['auto', '100%', '100%'],
                      },
                    }}
                    divisionId={fields.divisionId}
                    membership={getGenericMembership(fields.membershipType)}
                    program={program}
                    showCost
                  />
                </l.Flex>
                <l.Space
                  height={
                    R.equals(fields.membershipType, 'multipass')
                      ? spacing.xxxl
                      : spacing.xl
                  }
                />
                <ButtonPrimary onClick={this.handleSubmit}>
                  Confirm Membership
                </ButtonPrimary>
              </l.FlexColumnCentered>
            </>
          )}
        </l.FlexColumn>
      </>
    );
  }
}

const formData: Array<FormStep<MembershipFields>> = [
  { label: '', FormComponent: Step, rowItems: [{ items: formItems }] },
];

class MembershipForm extends Form<MembershipFields> {}

class MembershipFormComponent extends React.Component<MembershipFormProps> {
  render() {
    const {
      cancelSwitchMembership,
      member,
      programs,
      setProgramView,
    } = this.props;

    return (
      <MembershipForm
        id="membership-form"
        initialValues={initialValues}
        isEditing
        fieldValidations={membershipFieldValidations}
        steps={formData}
        stepProps={{ cancelSwitchMembership, member, programs, setProgramView }}
        validationErrorMessage=""
      />
    );
  }
}

export default MembershipFormComponent;
