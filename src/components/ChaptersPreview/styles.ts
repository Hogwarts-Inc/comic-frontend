import { Typography, styled, TableRow, Table } from '@mui/material';

export const CenterDivVertical = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const CenterDivHorizontal = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

export const TableRowMui = styled(TableRow)({
  background: 'rgba(217, 217, 217, 0.39)',
});

export const TableMui = styled(Table)({
  border: 'none',
  boxShadow: 'none',
});

export const Title = styled(Typography)({
  marginBottom: '2rem',
});
