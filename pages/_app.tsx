/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppProps } from 'next/app';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@styles/styles.css';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Route } from 'src/constants/routes';
import Container from 'src/Container';
import { getUserQueuePosition } from 'src/helpers/chaptersQueue';
import Provider from 'src/Provider';
import { RootState } from 'src/store/rootReducer';
import { setChapterQueue } from 'src/store/slices/chapter-queue';

const QueueHandler = () => {
  const { chapterId, isWaiting } = useSelector((state: RootState) => state.chapterQueue);
  const { push } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    let interval: any;
    if (isWaiting) {
      interval = setInterval(async () => {
        const {
          data: { position: userCurrentPosition },
        } = await getUserQueuePosition(chapterId);

        if (userCurrentPosition === 1) {
          push(`${Route.chapter}/${chapterId}`);
          console.log(3);

          dispatch(setChapterQueue({ chapterId, isWaiting: false, position: userCurrentPosition, isCreating: true }));
        }
      }, 3000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isWaiting]);
  return <></>;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider>
        <QueueHandler />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    </UserProvider>
  );
}

export default MyApp;
