import React from 'react';

import { useTranslation } from 'react-i18next';

import { StyledContainer, StyledNotFoundIcon, StyledTypography, StyledButton } from './styles';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <StyledNotFoundIcon />
      <StyledTypography variant="h4">{t('pageNotFound')}</StyledTypography>
      <StyledButton aria-label="home" href="/">
        {t('goToLanding')}
      </StyledButton>
    </StyledContainer>
  );
};

export default NotFound;
