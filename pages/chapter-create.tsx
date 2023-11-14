import React, { useState } from 'react';

import { Grid } from '@mui/material';
import { Formik, Form, FormikErrors, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import DefaultLayout from '@components/DefaultLayout';
import CustomStepper from '@components/Stepper';
import { apisCanvas, apisChapters } from 'src/services/apiConfig';
import { AddCanva } from 'src/views/ChapterCreate/AddCanva/AddCanva';
import { AddInfo } from 'src/views/ChapterCreate/AddInfo/AddInfo';
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

const initialValues: FormValues = {
  title: '',
  description: '',
  files: [],
};

const ChapterCreate = () => {
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const createObjectURL = (file: File) => URL.createObjectURL(file);

  const onSubmit = (values: FormValues, { setSubmitting, validateForm }: FormikHelpers<FormValues>) => {
    validateForm().then(async (errors: FormikErrors<FormValues>) => {
      if (!Object.keys(errors).length) {
        try {
          const chapterResponse = await apisChapters.postChapters({
            title: values.title,
            description: values.description,
            active: true,
            storiette_id: 1,
          });
          const chapterId = chapterResponse.data.id;
          for (const file of values.files) {
            await apisCanvas.postCanva({ chapter_id: chapterId, image: createObjectURL(file) });
          }
          router.push('/');
        } catch (e) {
          // TODO handle error
        }
      }
      setSubmitting(false);
    });
  };

  return (
    <DefaultLayout>
      <Formik<FormValues> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          errors,
          touched,
          isValidating,
          isSubmitting,
        }) => (
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
                {activeStep === 1 && <AddCanva setFieldValue={setFieldValue} values={values} onNext={handleNext} />}
                {activeStep === 2 && <ChapterReview values={values} onNext={handleSubmit} />}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </DefaultLayout>
  );
};

export default ChapterCreate;
