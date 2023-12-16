/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Button from '@components/Button';
import { Route } from 'src/constants/routes';
import useIsMobile from 'src/hooks/useIsMobile';
import { CanvaParam, apiUserProfile, UserAttributes } from 'src/services/apiConfig';
import { RootState } from 'src/store/rootReducer';

import { Container, ProfileInfoWrapp, Title, Name, UserInfo, AvatarStyles, GridUserCanva, ImageCanva } from './styles';

function MyProfile() {
  const [dataCanvaByUser, setDataCanvaByUser] = useState<CanvaParam[] | undefined>();
  const token = useSelector((state: RootState) => state.auth.token);
  const [dataUser, setDataUser] = useState<UserAttributes | undefined>();
  const { t } = useTranslation();
  const { back } = useRouter();
  const isMobile = useIsMobile();
  const { push } = useRouter();

  useEffect(() => {
    if (!token) return;
    apiUserProfile.getCanvasByUser().then(({ data }) => {
      setDataCanvaByUser(data.map(canva => ({ ...canva, id: canva.canva_id })));
    });

    apiUserProfile.getUserProfile({ token }).then(({ data }) => {
      setDataUser(data);
    });
  }, [token]);

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
      <Container container item xs>
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
        <Grid container xs direction="column">
          <Grid item>
            <Title variant="h4">{t('yourCreations')}</Title>
          </Grid>
          <Grid item container xs marginBottom="1rem">
            {dataCanvaByUser?.length ? (
              dataCanvaByUser?.map(canva => (
                <GridUserCanva item xs={4}>
                  <ImageCanva onClick={() => push(`${Route.visualizer}/${canva.id}`)} src={canva.image_url} />
                </GridUserCanva>
              ))
            ) : (
              <Title variant="h6" alignSelf="center">
                {t('noCreations')}
              </Title>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
export default MyProfile;
