import { Typography, styled, TableRow, Table, TableCell } from '@mui/material';

export const CenterDivVertical = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const CenterDivHorizontal = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

export const TableRowMui = styled(TableRow)({
  background: 'rgba(217, 217, 217, 0.39)',
  '&:hover': {
    cursor: 'pointer',
  },
});
export const TableCellImg = styled(TableCell)({
  padding: 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const TableMui = styled(Table)({
  border: 'none',
  boxShadow: 'none',
  width: '80%',
  margin: 'auto',
});

export const Title = styled(Typography)(({ theme }) => ({
  margin: '0',
  color: theme.palette.text.primary,
}));

export const TitleWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '80%',
  marginBottom: '1rem',
});

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  margin: '4rem 0',
});
