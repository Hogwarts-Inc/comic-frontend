import React from 'react';

import { HttpStatusCode } from 'axios';
import { useTranslation } from 'react-i18next';

import { StyledContainer, StyledNotFoundIcon, StyledTypography, StyledButton, StyledForbiddenIcon } from './styles';

const ErrorIcon = ({ errorType }: { errorType: HttpStatusCode }) => {
  const { NotFound, Forbidden } = HttpStatusCode;

  switch (errorType) {
    case NotFound:
      return <StyledNotFoundIcon />;
    case Forbidden:
      return <StyledForbiddenIcon />;
    default:
      return null;
  }
};

const ErrorComponent = ({ errorType }: { errorType: HttpStatusCode }) => {
  const { t } = useTranslation();

  return (
    <StyledContainer>
      <ErrorIcon errorType={errorType} />
      <StyledTypography variant="h4">{t(`${errorType}`)}</StyledTypography>
      <StyledButton aria-label="home" href="/">
        {t('goToLanding')}
      </StyledButton>
    </StyledContainer>
  );
};

export default ErrorComponent;
