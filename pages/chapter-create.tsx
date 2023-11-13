import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';

import DefaultLayout from '@components/DefaultLayout';
import CustomStepper from '@components/Stepper';
import { AddInfo } from 'src/views/ChapterCreate/AddInfo/AddInfo';
import { AddCanva } from 'src/views/ChapterCreate/AddCanva/AddCanva';

const steps = ['Agregar información del capítulo', 'Agregar viñetas', 'Publicar'];

const ChapterCreate = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AddInfo onNext={handleNext} />;
      case 1:
        return <AddCanva onNext={handleNext} />;
      case 2:
        return <AddInfo onNext={handleNext} />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <DefaultLayout>
      <Grid container direction="row" display="flex" justifyContent="center" spacing={20}>
        <Grid item >
          <CustomStepper
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            onNext={handleNext} 
            onBack={() => console.log('ss')}
          />
          {renderStepContent(activeStep)}
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};
export default ChapterCreate;
