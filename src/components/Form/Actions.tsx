import * as React from 'react';
import { PulseLoader } from 'react-spinners';
import l from '../../styles/layout';
import { colors, spacing } from '../../styles/theme';
import { ButtonPrimary, ButtonSecondary } from './Button';

const FormActions = ({
  backText = 'Back',
  loading,
  forwardText = 'Continue',
  handleBack,
  handleForward,
  showBackButton,
}: {
  backText?: string;
  loading?: boolean;
  forwardText?: string;
  handleBack: (e: React.FormEvent) => void;
  handleForward:
    | ((e: React.FormEvent) => void)
    | ((
        onSuccess: () => void,
        onFail: (error: Error) => void,
        resetForm: () => void,
        data: any,
      ) => void);
  showBackButton?: boolean;
}) => (
  <l.FlexCentered mt={spacing.xl}>
    {loading ? (
      <PulseLoader sizeUnit="px" size={30} color={colors.red} />
    ) : (
      <l.FlexCentered>
        {showBackButton && (
          <ButtonSecondary mr={spacing.xl} onClick={handleBack} type="button">
            {backText || 'Back'}
          </ButtonSecondary>
        )}
        <ButtonPrimary onClick={handleForward} type="submit">
          {forwardText}
        </ButtonPrimary>
      </l.FlexCentered>
    )}
  </l.FlexCentered>
);

export default FormActions;
