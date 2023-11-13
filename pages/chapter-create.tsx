import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';

import DefaultLayout from '@components/DefaultLayout';
import CustomStepper from '@components/Stepper';
import { AddInfo } from 'src/views/ChapterCreate/AddInfo/AddInfo';
import { AddCanva } from 'src/views/ChapterCreate/AddCanva/AddCanva';
import { Formik, Form, FormikErrors, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ChapterReview } from 'src/views/ChapterCreate/ChapterReview/ChapterReview';

const steps = ['Agregar información del capítulo', 'Agregar viñetas', 'Publicar'];

const validationSchema = Yup.object({
  title: Yup.string().required('Titulo es requerido'),
  description: Yup.string().required('Descripcion es requerida'),
  // Add other fields for AddCanva and other steps
});

interface FormValues {
  title: string;
  description: string;
  files: File[];
}

const ChapterCreate = () => {
  const [activeStep, setActiveStep] = useState(0);

  const initialValues: FormValues = {
    title: '',
    description: '',
    files: [],
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = (
    values: FormValues,
    { setSubmitting, validateForm }: FormikHelpers<FormValues>
  ) => {
    validateForm().then((errors: FormikErrors<FormValues>) => {
      if (!Object.keys(errors).length) {
        handleNext();
      }
      setSubmitting(false);
    });
  };

  return (
    <DefaultLayout>
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, setFieldValue, handleSubmit, errors, touched, isValidating, isSubmitting }) => (
          <Form>
            <Grid container direction="row" justifyContent="center" spacing={2}>
              <Grid item>
                <CustomStepper
                  steps={steps}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  onNext={handleNext}
                  onBack={() => console.log('ssd')}
                />
                {activeStep === 0 && (
                  <AddInfo
                    onNext={() => handleSubmit()}
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    errors={errors}
                    touched={touched}
                    isValidating={isValidating}
                    isSubmitting={isSubmitting}
                  />
                )}
                {activeStep === 1 && (
                  <AddCanva
                    onNext={handleNext}
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                )}
                {activeStep === 2 && (
                  <ChapterReview
                    onNext={() => handleSubmit()}
                    values={values}
                  />
                )}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </DefaultLayout>
  );
};

export default ChapterCreate;
