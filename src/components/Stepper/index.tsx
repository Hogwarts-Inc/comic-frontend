/* eslint-disable no-unused-vars */
import React from 'react';

import { Step, StepLabel, Stepper } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ButtonRow, StepperContainer, StyledButton } from './styles';

interface CustomStepperProps {
  activeStep: number;
  steps: string[];
  setActiveStep: (step: number) => void;
}

const CustomStepper = ({ activeStep, steps, setActiveStep }: CustomStepperProps) => {
  const { t } = useTranslation();

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <StepperContainer>
        <Stepper activeStep={activeStep}>
          {steps.map(label => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <ButtonRow>
          <StyledButton color="inherit" disabled={activeStep === 0} onClick={handleBack}>
            {t('common.back')}
          </StyledButton>
        </ButtonRow>
      </StepperContainer>
    </>
  );
};

export default CustomStepper;
