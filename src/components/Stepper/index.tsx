import React from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';

interface CustomStepperProps {
  steps: string[];
  activeStep: number; // Now controlled externally
  setActiveStep: React.Dispatch<React.SetStateAction<number>>; // Function to update the active step
  optionalSteps?: number[]; // Array of indices for optional steps
  onBack?: () => void; // Optional external function to call when moving back a step
  onNext?: () => void; // Add this line to include an external onNext handler
  onReset?: () => void; // Optional external function to call when resetting the steps
}

const CustomStepper = ({ steps, activeStep, setActiveStep, optionalSteps, onBack, onNext, onReset }: CustomStepperProps) => {
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => optionalSteps?.includes(step);
  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
    if (onNext) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
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
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};

            if (isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>;
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

        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {onBack && (
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          <Box sx={{ flex: '1 1 auto' }} />
          {onNext ? (
            null
          ) : (
            activeStep < steps.length && (
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            )
          )}
          {onReset && activeStep === steps.length && (
            <Button onClick={handleReset}>Reset</Button>
          )}
        </Box>
      </Box>
    </>
  )
}

export default CustomStepper;
