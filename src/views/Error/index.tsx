import React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { Route } from 'src/constants/routes';
import { HttpStatusCode } from 'src/utils/http-status-codes';

import {
  StyledContainer,
  StyledNotFoundIcon,
  StyledTypography,
  StyledButton,
  StyledForbiddenIcon,
  StyledInternalServerErrorIcon,
  StyledUnauthorizedIcon,
  StyledButtonLogIn,
} from './styles';

const ErrorIcon = ({ errorType }: { errorType: HttpStatusCode }) => {
  const { NotFound, Forbidden, Unauthorized } = HttpStatusCode;

  switch (errorType) {
    case Unauthorized:
      return <StyledUnauthorizedIcon />;
    case Forbidden:
      return <StyledForbiddenIcon />;
    case NotFound:
      return <StyledNotFoundIcon />;
    default:
      return <StyledInternalServerErrorIcon />;
  }
};

const ErrorComponent = ({ errorType }: { errorType: HttpStatusCode }) => {
  const { t } = useTranslation();
  const { push } = useRouter();

  return (
    <StyledContainer>
      <ErrorIcon errorType={errorType} />
      <StyledTypography variant="h4">{t(`${errorType}`)}</StyledTypography>
      {errorType === HttpStatusCode.Unauthorized && (
        <StyledButtonLogIn onClick={() => push(Route.login)} size="medium">
          {t('common.login')}
        </StyledButtonLogIn>)}
      <StyledButton aria-label="home" href="/">
        {t('goToLanding')}
      </StyledButton>
    </StyledContainer>
  );
};

export default ErrorComponent;
