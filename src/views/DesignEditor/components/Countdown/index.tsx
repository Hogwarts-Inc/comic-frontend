/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';

import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Countdown from 'react-countdown';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Route } from 'src/constants/routes';
import { handleRemoveFromQueue } from 'src/helpers/chaptersQueue';
import useIsMobile from 'src/hooks/useIsMobile';
import { RootState } from 'src/store/rootReducer';

const Renderer = ({ minutes, seconds, completed }: { completed: boolean; minutes: number; seconds: number }) => {
  const { t } = useTranslation();
  const { chapterId } = useSelector((stateValue: RootState) => stateValue.chapterQueue);
  const { push } = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (completed) {
      (async () => {
        await push(`${Route.chapter}/${chapterId}`);
        await handleRemoveFromQueue(chapterId);
      })();
    }
  }, [push, completed]);

  useEffect(() => {
    const text = t('editor.timeWarning', { minutes: minutes + 1, s: minutes + 1 > 1 ? 's' : '' });
    if (minutes === 4) {
      toast.warning(text);
    }
    if (minutes === 0) {
      toast.error(text);
    }
  }, [minutes, t]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h5" color={minutes === 0 ? (isMobile ? 'yellow' : 'red') : isMobile ? 'white' : undefined}>
        {completed ? t('editor.timeFinished') : `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}{' '}
      </Typography>
    </div>
  );
};

export default () => {
  const { timeleft } = useSelector((stateValue: RootState) => stateValue.chapterQueue);
  return <Countdown renderer={props => <Renderer {...props} />} date={timeleft} />;
};
