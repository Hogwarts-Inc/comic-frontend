import React from 'react';

import { Button } from 'baseui/button';
import { useRouter } from 'next/router';

import ChapterPreviewer from '@components/ChaptersPreview';
import { Footer } from '@components/Footer';
import { TopBar } from '@components/TopBar';
import { Route } from 'src/constants/routes';
// import { MainComic } from 'src/views/Landing/components/MainComic';

function Home() {
  const { push } = useRouter();
  // TODO: Change this component when all the components for the landing page are ready
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
      {/* To do: add authentication */}
      <div style={{ marginBottom: '16rem' }}>
        <TopBar isAuthenticated={false} />
      </div>
      <div style={{ marginTop: '5rem', marginBottom: '5rem', width: '80%' }}>
        <ChapterPreviewer />
      </div>
      <Button onClick={() => push(Route.editor)}>Editor</Button>
      <Button onClick={() => push(Route.profile)}>Perfil</Button>
      <Button onClick={() => push(`${Route.visualizer}/1/1`)}>Visualizar</Button>
      <div style={{ marginTop: '15rem' }} />
      <Footer />
    </div>
  );
}

export default Home;
