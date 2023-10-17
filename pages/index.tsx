import React from 'react';

import { Button } from 'baseui/button';
import { useRouter } from 'next/router';

import { TopBar } from '@components/TopBar';
import { Route } from 'src/constants/routes';

const Home = () => {
  const { push } = useRouter();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column',
        gap: '10px',
      }}>
      {/* To do: add authentication */}
      <TopBar isAuthenticated={false} />
      Inicio
      <Button onClick={() => push(Route.editor)}>Editor</Button>
      <Button onClick={() => push(Route.profile)}>Perfil</Button>
      <Button onClick={() => push(`${Route.visualizer}/1/1`)}>Visualizar</Button>
    </div>
  );
};

export default Home;
