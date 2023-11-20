/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';

import { getAccessToken } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from 'baseui/button';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { Footer } from '@components/Footer';
import { TopBar } from '@components/TopBar';
import { Route } from 'src/constants/routes';
import { apisComic } from 'src/services/apiConfig';
import { setToken } from 'src/store/slices/auth';
import { MainComic } from 'src/views/Landing/components/MainComic';

function Home({ accessToken }: { accessToken: string }) {
  const { push } = useRouter();
  const { user } = useUser();
  const dispatch = useDispatch();

  // TODO remove after test if works on staging
  useEffect(() => {
    dispatch(setToken(accessToken));
    apisComic.getStoriettesById(1).catch(console.log);
  }, [accessToken, dispatch]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column',
        gap: '10px',
        overflow: 'auto',
      }}>
      <div style={{ marginBottom: '16rem' }}>
        <TopBar isAuthenticated={!!user} />
      </div>
      <div>
        <MainComic />
      </div>
      <Button onClick={() => push(Route.editor)}>Editor</Button>
      <Button onClick={() => push(Route.profile)}>Perfil</Button>
      <Button onClick={() => push(`${Route.visualizer}/1/1`)}>Visualizar</Button>
      <div style={{ marginTop: '15rem' }} />
      <Footer />
    </div>
  );
}
export async function getServerSideProps(ctx: any) {
  let accessToken = '';
  try {
    accessToken = (await getAccessToken(ctx.req, ctx.res)).accessToken || '';
  } catch (e) {
    console.log(e);
  }
  return { props: { accessToken } };
}
export default Home;
