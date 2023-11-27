/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';

import { StoriettesParam, apisChapters } from 'src/services/apiConfig';

import {
  Title,
  TableRowMui,
  CenterDivHorizontal,
  TableMui,
  CenterDivVertical,
  TableCellImg,
  TitleWrapper,
  Container,
} from './styles';

function ChapterPreviewer() {
  const [page, setPage] = useState(0);
  const [dataChapter, setDataChapter] = useState<StoriettesParam[]>([]);
  const [rowPage, setRowPage] = useState(5);

  useEffect(() => {
    apisChapters.getChapters().then(({ data }) => setDataChapter(data));
  }, []);

  const handleChangePagina = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeFilasPorPagina = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short', year: 'numeric' } as Intl.DateTimeFormatOptions;
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Container>
      {/* To do: add chapter name */}
      <TitleWrapper>
        <Title variant="h4">Nombre historieta</Title>
        {/* To do: add search bar comonent */}
        <Typography style={{ margin: '0' }}>Search bar</Typography>
      </TitleWrapper>
      <TableMui>
        <TableBody>
          {dataChapter.slice(page * rowPage, page * rowPage + rowPage).map((row, index) => (
            <TableRowMui key={row.id}>
              {/* To do: this cell is going to be changed once the canvas has the img */}
              <TableCellImg>
                <img src={row.canvas[0]?.image_url} height={100} alt="url" />
              </TableCellImg>
              <TableCell>{row.title}</TableCell>
              <TableCell />
              <TableCell>{formatDate(row.updated_at).toString()}</TableCell>
              {/* To do: this cell is going to be changed once the chapter has reactions */}
              <TableCell>
                <CenterDivVertical>
                  <FavoriteBorderOutlinedIcon />
                  <div>30</div>
                </CenterDivVertical>
              </TableCell>
              <TableCell>{`#${index + 1}`}</TableCell>
            </TableRowMui>
          ))}
        </TableBody>
      </TableMui>
      <CenterDivHorizontal>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataChapter.length}
          rowsPerPage={rowPage}
          page={page}
          onPageChange={handleChangePagina}
          onRowsPerPageChange={handleChangeFilasPorPagina}
        />
      </CenterDivHorizontal>
    </Container>
  );
}
export default ChapterPreviewer;
