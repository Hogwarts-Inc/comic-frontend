/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
import React, { useEffect } from 'react';

import { Box, Grid } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import { TFunction } from 'i18next';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import DefaultLayout from '@components/DefaultLayout';
import CustomStepper from '@components/Stepper';
import { ChapterData } from 'src/interfaces/common';
import { apisCanvas, apisChapters } from 'src/services/apiConfig';
import { RootState } from 'src/store/rootReducer';
import { resetChapterCreate, setActiveStep } from 'src/store/slices/chapter-create/actions';
import { selectActiveStep, selectChapterData } from 'src/store/slices/chapter-create/selectors';
import { AddCanva } from 'src/views/ChapterCreate/AddCanva/AddCanva';
import { AddInfo } from 'src/views/ChapterCreate/AddInfo/AddInfo';
import { ChapterReview } from 'src/views/ChapterCreate/ChapterReview/ChapterReview';

const createValidationSchema = (t: TFunction) => Yup.object({
  title: Yup.string().required(t('chapterCreate.validations.title')),
  description: Yup.string().required(t('chapterCreate.validations.description')),
});

const ChapterCreate = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { chapterData, activeStep, id } = useSelector((state: RootState) => ({
    chapterData: selectChapterData(state),
    activeStep: selectActiveStep(state),
    id: state.auth.id,
  }));

  const steps = t('chapterCreate.stepperLabels', { returnObjects: true }) as string[];
  const validationSchema = createValidationSchema(t);

  useEffect(() => {
    dispatch(resetChapterCreate());

    return () => {
      dispatch(resetChapterCreate());
    };
  }, [dispatch]);

  const onSubmit = async (_: ChapterData, { setSubmitting }: FormikHelpers<ChapterData>) => {
    setSubmitting(true);
    try {
      const chapterResponse = await apisChapters.postChapters({
        title: chapterData.title,
        description: chapterData.description,
        active: true,
        storiette_id: 1,
      });
      const chapterId = chapterResponse.data.id;

      await apisCanvas.postCanva({ chapter_id: chapterId, images: chapterData.files, user_profile_id: id });
      dispatch(resetChapterCreate());

      router.push('/');
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
                <Grid item>
                  <Box sx={{ height: '8%' }} />
                  <CustomStepper
                    activeStep={activeStep}
                    setActiveStep={(step) => dispatch(setActiveStep(step))}
                    steps={steps}
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
                      values={chapterData}
                      onNext={handleNext}
                    />
                  )}
                  {activeStep === 1 && <AddCanva
                    setFieldValue={setFieldValue}
                    values={chapterData}
                    onNext={handleNext}
                  />}
                  {activeStep === 2 && <ChapterReview values={chapterData} onNext={handleSubmit} />}
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
