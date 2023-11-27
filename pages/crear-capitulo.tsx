import React, { useState } from 'react';

import { Box, Grid } from '@mui/material';
import { Formik, Form, FormikErrors, FormikHelpers } from 'formik';
import { TFunction } from 'i18next';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import DefaultLayout from '@components/DefaultLayout';
import CustomStepper from '@components/Stepper';
import { ChapterData } from 'src/interfaces/common';
import { apisCanvas, apisChapters } from 'src/services/apiConfig';
import { AddCanva } from 'src/views/ChapterCreate/AddCanva/AddCanva';
import { AddInfo } from 'src/views/ChapterCreate/AddInfo/AddInfo';
import { ChapterReview } from 'src/views/ChapterCreate/ChapterReview/ChapterReview';

const createValidationSchema = (t: TFunction) => Yup.object({
  title: Yup.string().required(t('chapterCreate.validations.title')),
  description: Yup.string().required(t('chapterCreate.validations.description')),
  // canvas: Yup.string().required(t('chapterCreate.validations.canvas')),
});

const initialValues: ChapterData = {
  title: '',
  description: '',
  files: [],
};

const ChapterCreate = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const steps = t('chapterCreate.stepperLabels', { returnObjects: true }) as string[];
  const validationSchema = createValidationSchema(t);

  const [activeStep, setActiveStep] = useState(0);

  const createObjectURL = (file: File) => URL.createObjectURL(file);

  const onSubmit = (values: ChapterData, { setSubmitting, validateForm }: FormikHelpers<ChapterData>) => {
    validateForm().then(async (errors: FormikErrors<ChapterData>) => {
      if (!Object.keys(errors).length) {
        try {
          const chapterResponse = await apisChapters.postChapters({
            title: values.title,
            description: values.description,
            active: true,
            storiette_id: 1,
          });
          const chapterId = chapterResponse.data.id;
          const imageUrls = values.files.map(file => createObjectURL(file));

          await apisCanvas.postCanva({ chapter_id: chapterId, images: imageUrls });

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
      <Formik<ChapterData> initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({
          errors,
          isSubmitting,
          isValidating,
          touched,
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          setSubmitting,
          setTouched,
          validateField,
          validateForm,
        }) => {
          const handleNext = async () => {
            const validateErrors = await validateForm();

            if (Object.keys(validateErrors).length === 0) {
              setActiveStep(prevActiveStep => prevActiveStep + 1);
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const fieldsToTouch = Object.keys(validateErrors).reduce((acc: any, key) => {
                acc[key] = true;
                return acc;
              }, {});
              setTouched(fieldsToTouch);
            }

            setSubmitting(false);
          };

          return (
            <Form>
              <Grid container direction="row" justifyContent="center">
                <Grid item>
                  <Box sx={{ height: '8%' }} />
                  <CustomStepper
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    steps={steps}
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
                      validateField={validateField}
                      values={values}
                      onNext={handleNext}
                    />
                  )}
                  {activeStep === 1 && <AddCanva
                    setFieldValue={setFieldValue}
                    values={values}
                    onNext={handleNext}
                  />}
                  {activeStep === 2 && <ChapterReview values={values} onNext={handleSubmit} />}
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </DefaultLayout>
  );
};

export default ChapterCreate;
