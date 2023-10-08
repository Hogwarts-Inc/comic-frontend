import styled from '@emotion/styled';

import { Colors } from '@styles/colors';

export const Separator = styled('div')({
  border: `1px solid ${Colors.gray}`,
  background: Colors.white,
  boxShadow: `0px 35px 4px 0px ${Colors.blackTransparent}`,
  width: '1.625rem',
});
