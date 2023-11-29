import { createAction } from '@reduxjs/toolkit';

export const setChapterTitle = createAction<string>('chapterForm/setChapterTitle');
export const setChapterDescription = createAction<string>('chapterForm/setChapterDescription');
export const setChapterFiles = createAction<string[]>('chapterForm/setChapterFiles');
export const resetChapterCreate = createAction('chapterForm/resetChapterCreate');
export const setActiveStep = createAction<number>('chapterForm/setActiveStep');
