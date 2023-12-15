/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';
import useIsMobile from 'src/hooks/useIsMobile';
import { CanvaParam, apiUserProfile, UserAttributes } from 'src/services/apiConfig';

import { Container, ProfileInfoWrapp, Title, Name, UserInfo, AvatarStyles, GridUserCanva, ImageCanva } from './styles';

function MyProfile() {
  const [dataCanvaByUser, setDataCanvaByUser] = useState<CanvaParam[] | undefined>();
  const [dataUser, setDataUser] = useState<UserAttributes | undefined>();
  const { t } = useTranslation();
  const { back } = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    apiUserProfile.getCanvasByUser().then(({ data }) => {
      setDataCanvaByUser(data);
    });

    apiUserProfile.getUserProfile({}).then(({ data }) => {
      setDataUser(data);
    });
  }, []);

  return (
    <Grid item container direction="column">
      <Grid
        container
        item
        xs="auto"
        justifyContent={isMobile ? 'space-between' : 'left'}
        margin={isMobile ? '1rem' : '1rem 1rem 0 '}>
        <Button onClick={back}>{t('back')}</Button>
      </Grid>
      <Container>
        <ProfileInfoWrapp container>
          <UserInfo item xs={8}>
            <AvatarStyles alt="Profile user" src={dataUser?.image_url} />
            <Name variant="h4">{dataUser?.name}</Name>
          </UserInfo>
          <Grid item xs={4}>
            {/* to do: descomentar cuando se agregue blockchain logic */}
            {/* <Title variant="h4">Conecta tu wallet</Title>
          <Description>Conecta tu wallet para poder reclamar tus NFTs</Description> */}
          </Grid>
        </ProfileInfoWrapp>
        <Grid container>
          <Grid item xs={12}>
            <Title variant="h4">{t('yourCreations')}</Title>
          </Grid>
          {dataCanvaByUser?.map(canva => (
            <GridUserCanva item xs={4}>
              <ImageCanva src={canva.image_url} />
            </GridUserCanva>
          ))}
        </Grid>
      </Container>
    </Grid>
  );
}
export default MyProfile;
