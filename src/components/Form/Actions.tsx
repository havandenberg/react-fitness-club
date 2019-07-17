import * as React from 'react';
import { PulseLoader } from 'react-spinners';
import l from '../../styles/layout';
import { colors, spacing } from '../../styles/theme';
import { Scale } from '../../types/styles';
import { isSmall } from '../../utils/screensize';
import { ButtonPrimary, ButtonSecondary } from './Button';

const FormActions = ({
  backText = 'Back',
  loading,
  forwardText = 'Continue',
  handleBack,
  handleForward,
  size = 'big',
}: {
  backText?: string;
  loading?: boolean;
  forwardText?: string;
  handleBack?: (e: React.FormEvent) => void;
  handleForward:
    | ((e: React.FormEvent) => void)
    | ((
        onSuccess: () => void,
        onFail: (error: Error) => void,
        resetForm: () => void,
        data: any,
      ) => void);
  size?: Scale;
}) => (
  <l.FlexCentered mt={spacing.xl}>
    {loading ? (
      <PulseLoader sizeUnit="px" size={30} color={colors.red} />
    ) : (
      <l.FlexCentered>
        {handleBack && (
          <ButtonSecondary
            mr={isSmall() ? spacing.ml : spacing.xl}
            onClick={handleBack}
            size={size}
            type="button">
            {backText || 'Back'}
          </ButtonSecondary>
        )}
        <ButtonPrimary onClick={handleForward} size={size} type="submit">
          {forwardText}
        </ButtonPrimary>
      </l.FlexCentered>
    )}
  </l.FlexCentered>
);

export default FormActions;
