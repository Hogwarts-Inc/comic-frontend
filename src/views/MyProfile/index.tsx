/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import { Avatar, Grid } from '@mui/material';

import { CanvaParam, apiUserProfile, User } from 'src/services/apiConfig';

import { Container, Description, ProfileInfoWrapp, Title, Name, TitleRight } from './styles';

function MyProfile() {
  const [dataCanvaByUser, setDataCanvaByUser] = useState<CanvaParam[] | undefined>();
  const [dataUser, setDataUser] = useState<User | undefined>();

  useEffect(() => {
    apiUserProfile.getCanvasByUser().then(({ data }) => {
      setDataCanvaByUser(data);
    });

    apiUserProfile.getUserProfile({}).then(({ data }) => {
      setDataUser(data);
    });
  }, []);

  return (
    <Container>
      <ProfileInfoWrapp container>
        <Grid
          item
          xs={8}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar alt="Profile user" src={dataUser?.picture} sx={{ width: '8vw', height: '8vw' }} />
          <Name variant="h4">{dataUser?.name}</Name>
        </Grid>
        <Grid item xs={4}>
          {/* to do: descomentar cuando se agregue blockchain logic */}
          {/* <Title variant="h4">Conecta tu wallet</Title>
          <Description>Conecta tu wallet para poder reclamar tus NFTs</Description> */}
        </Grid>
      </ProfileInfoWrapp>
      <Grid container>
        <Grid item xs={12}>
          <Title variant="h4">Tus creaciones</Title>
        </Grid>
        {dataCanvaByUser?.map(canva => (
          <Grid item xs={4} style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <img src={canva.image_url} style={{ width: '99%', height: 'auto' }} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default MyProfile;
