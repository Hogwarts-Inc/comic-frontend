import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { MainComicGrid, Title } from './styles';
import { Carousel } from '@components/Carousel/Carousel';
import { apisCanvas } from 'src/services/apiConfig';

export const MainComic = (): JSX.Element => {
    const theme = useTheme();
    const isXSScreen = useMediaQuery(theme.breakpoints.only('xs'));
    const { t } = useTranslation();

    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchCanva = async () => {
            try {
                const response = await apisCanvas.getCanva();
                const imageUrls = response.data.map((obj: any) => obj.image_url);
                setImages(imageUrls);
            } catch (error) {
                console.error('Error fetching canvas:', error);
            }
        };

        fetchCanva();
    }, []);


    return (
        <MainComicGrid container={true} >
            <Grid item xs={12} lg={8}>
                <Title lg={!isXSScreen}> {t('mainComic.title')}</Title>
                <Carousel images={images} />
            </Grid>
        </MainComicGrid>
    );

};
