/* eslint-disable no-unused-vars */
import React from 'react';

import { Button, Step, StepLabel, Stepper } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { ButtonRow, Spacer, StepperContainer, StyledButton } from './styles';

interface CustomStepperProps {
  steps: string[];
  activeStep: number;
  setActiveStep: (step: number) => void;
  styles?: React.CSSProperties;
  onBack?: () => void;
  onNext?: () => void;
  onReset?: () => void;
}

const CustomStepper = ({
  steps,
  activeStep,
  setActiveStep,
  styles,
  onBack,
  onNext,
  onReset,
}: CustomStepperProps) => {
  const { t } = useTranslation();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    onNext?.();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    onBack?.();
  };

  const handleReset = () => {
    if (onReset) {
      setActiveStep(0);
      onReset();
    }
  };

  return (
    <>
      <StepperContainer>
        <Stepper activeStep={activeStep} style={styles}>
          {steps.map((label) => {
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
          {!onBack && (
            <StyledButton color="inherit" disabled={activeStep === 0} onClick={handleBack}>
              {t('common.back')}
            </StyledButton>
          )}
          <Spacer />
          {onNext && activeStep < steps.length && (
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? t('common.finish') : t('common.next')}
            </Button>
          )}
          {onReset && activeStep === steps.length && <Button onClick={handleReset}>Reset</Button>}
        </ButtonRow>
      </StepperContainer>
    </>
  );
};

export default CustomStepper;
