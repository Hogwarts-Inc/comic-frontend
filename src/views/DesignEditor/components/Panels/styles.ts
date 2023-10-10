import styled from '@emotion/styled';

import theme from '../../../../styles/theme';

export const Separator = styled('div')({
  border: `1px solid ${theme.palette.background.default}`,
  background: theme.palette.common.white,
  boxShadow: `0px 35px 4px 0px ${theme.customPalette.blackTransparent.main}`,
  width: '1.625rem',
});
