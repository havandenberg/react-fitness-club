import * as R from 'ramda';
import * as React from 'react';
import l from '../../styles/layout';
import { spacing } from '../../styles/theme';
import t from '../../styles/typography';
import { FormComponentProps } from '../Form';
import FormActions from '../Form/Actions';
import { CheckboxRadioInputWithLabel } from '../Form/CheckboxRadio';
import { FormRowData } from '../Form/Row';
import { SetupFields } from './index';

export const PROGRAM_INTERST_STEP = 'Program Interest';

const programs = [
  'General interest',
  'Private or small group lesson',
  'REaCT MMA',
  'Capoeira',
  'Aikido',
  'Yoga',
  'Obstacle Course Racing',
  'Dungeons & Dragons',
  'Qigong Meditation',
];

export const programInterestStep: Array<FormRowData<SetupFields>> = [
  {
    items: [
      {
        flex: '100%',
        inputType: 'text',
        valueName: 'programInterests',
      },
    ],
  },
];

class ProgramInterestStep extends React.Component<
  FormComponentProps<SetupFields>
> {
  toggleChecked = (name: string) => {
    const { fields } = this.props;
    if (R.contains(name, fields.programInterests)) {
      return fields.programInterests.filter(prog => !R.equals(prog, name));
    }
    return [...fields.programInterests, name];
  };

  render() {
    const { errors, fields, onBack, onChange, onForward } = this.props;
    return (
      <div>
        <t.Text mb={spacing.xl}>
          Check off any number of programs you are interested in (not committed
          yet).
        </t.Text>
        {programs.map((programOption: string) => (
          <l.FlexColumn alignTop key={programOption} mx="auto" width={300}>
            <CheckboxRadioInputWithLabel
              checked={R.contains(programOption, fields.programInterests)}
              error={R.contains('programInterests', errors)}
              onChange={() => {
                onChange('programInterests', this.toggleChecked(programOption));
              }}
              text={programOption}
              type="checkbox"
            />
            <l.Space height={spacing.xl} />
          </l.FlexColumn>
        ))}
        <FormActions handleBack={onBack} handleForward={onForward} />
      </div>
    );
  }
}

export default ProgramInterestStep;
