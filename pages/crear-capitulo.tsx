/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Grid } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import { TFunction } from 'i18next';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import DefaultLayout from '@components/DefaultLayout';
import CustomStepper from '@components/Stepper';
import { Route } from 'src/constants/routes';
import withAuth from 'src/hoc/withAuth';
import { ChapterData } from 'src/interfaces/common';
import { apisCanvas, apisChapters, apisComic } from 'src/services/api';
import { RootState } from 'src/store/rootReducer';
import { resetCanvaCreate, setActiveStep } from 'src/store/slices/canva-creator/reducer';
import { selectActiveStep, selectCanvaData } from 'src/store/slices/canva-creator/selectors';
import { AddCanva } from 'src/views/ChapterCreate/AddCanva/AddCanva';
import { AddInfo } from 'src/views/ChapterCreate/AddInfo/AddInfo';
import { DataReview } from 'src/views/ChapterCreate/ChapterReview/DataReview';

const createValidationSchema = (t: TFunction) =>
  Yup.object({
    title: Yup.string().required(t('chapterCreate.validations.title')),
    description: Yup.string().required(t('chapterCreate.validations.description')),
  });

const ChapterCreate = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { chapterData, activeStep } = useSelector((state: RootState) => ({
    chapterData: selectCanvaData(state),
    activeStep: selectActiveStep(state),
  }));

  const steps = t('chapterCreate.stepperLabels', { returnObjects: true }) as string[];
  const validationSchema = createValidationSchema(t);

  const onSubmit = async (_: ChapterData, { setSubmitting }: FormikHelpers<ChapterData>) => {
    setSubmitting(true);
    try {
      const { data } = await apisComic.getStoriettes();
      const chapterResponse = await apisChapters.postChapters({
        title: chapterData.title,
        description: chapterData.description,
        active: true,
        storiette_id: data[0].id,
      });
      const chapterId = chapterResponse.data.id;

      await apisCanvas.postCanva({ chapter_id: chapterId, images: chapterData.files });
      router.push(Route.home);
      dispatch(resetCanvaCreate());
    } catch (e) {
      console.error(e); // TODO handle error with alert
    }
    setSubmitting(false);
  };

  return (
    <DefaultLayout>
      <Formik<ChapterData> initialValues={chapterData} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({
          errors,
          isSubmitting,
          isValidating,
          touched,
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
            setSubmitting(true);
            const validateErrors = await validateForm();

            if (Object.keys(validateErrors).length === 0) {
              dispatch(setActiveStep(activeStep + 1));
            } else {
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
                <Grid container item style={{ padding: '2rem 0', width: '80%' }}>
                  <CustomStepper
                    activeStep={activeStep}
                    setActiveStep={step => dispatch(setActiveStep(step))}
                    steps={steps}
                  />
                  <Grid container item style={{ paddingTop: '1rem' }}>
                    {activeStep === 0 && (
                      <AddInfo
                        errors={errors}
                        handleBlur={handleBlur}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        isValidating={isValidating}
                        touched={touched}
                        validateField={validateField}
                        values={chapterData}
                        onNext={handleNext}
                      />
                    )}
                    {activeStep === 1 && (
                      <AddCanva
                        context="chapter"
                        setFieldValue={setFieldValue}
                        values={chapterData}
                        onNext={handleNext}
                      />
                    )}
                    {activeStep === 2 && (
                      <DataReview
                        isSubmitting={isSubmitting}
                        context="chapter"
                        values={chapterData}
                        onNext={handleSubmit}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </DefaultLayout>
  );
};

export default withAuth(ChapterCreate);
