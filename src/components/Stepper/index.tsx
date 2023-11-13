import React from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ButtonRow, Spacer, StepperContainer, StyledButton } from './styles';

interface CustomStepperProps {
  steps: string[];
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  optionalSteps?: number[];
  onBack?: () => void;
  onNext?: () => void;
  onReset?: () => void;
}

const CustomStepper = ({ steps, activeStep, setActiveStep, optionalSteps, onBack, onNext, onReset }: CustomStepperProps) => {
  const { t } = useTranslation();

  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => optionalSteps?.includes(step);
  const isStepSkipped = (step: number) => skipped.has(step);

  const handleSkip = () => {
    setSkipped(new Set(skipped).add(activeStep));
    handleNext();
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(skipped);
      newSkipped.delete(activeStep);
    }

    setSkipped(newSkipped);
    setActiveStep(prevActiveStep => prevActiveStep + 1);
    if (onNext) {
      onNext();
    }
  };

  const handleBack = () => {
    if (onBack) {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
      onBack();
    }
  };

  const handleReset = () => {
    if (onReset) {
      setActiveStep(0);
      onReset();
    }
  };

  return (
    <>
      <StepperContainer >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};

            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">{t("common.optional")}</Typography>;
            }

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <ButtonRow>
          {onBack && (
            <StyledButton color="inherit" disabled={activeStep === 0} onClick={handleBack} >
              {t('common.back')}
            </StyledButton>
          )}
          {isStepOptional(activeStep) && !isStepSkipped(activeStep) && (
            <StyledButton onClick={handleSkip}>
              {t('common.skip')}
            </StyledButton>
          )}
          <Spacer />
          {onNext ? (
            null
          ) : (
            activeStep < steps.length && (
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? t('common.finish') : t('common.next')}
              </Button>
            )
          )}
          {onReset && activeStep === steps.length && (
            <Button onClick={handleReset}>Reset</Button>
          )}
        </ButtonRow>
      </StepperContainer>
    </>
  )
}

export default CustomStepper;
