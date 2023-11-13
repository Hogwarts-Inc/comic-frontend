import React, { useState } from 'react';
import { Grid } from '@mui/material';

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
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  steps={steps}
                  onNext={handleNext}
                  onBack={() => console.log('ssd')}
                />
                {activeStep === 0 && (
                  <AddInfo
                    errors={errors}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    isSubmitting={isSubmitting}
                    isValidating={isValidating}
                    touched={touched}
                    values={values}
                    onNext={handleNext}
                  />
                )}
                {activeStep === 1 && (
                  <AddCanva
                    setFieldValue={setFieldValue}
                    values={values}
                    onNext={handleNext}
                  />
                )}
                {activeStep === 2 && (
                  <ChapterReview
                    values={values}
                    onNext={() => handleSubmit()}
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
