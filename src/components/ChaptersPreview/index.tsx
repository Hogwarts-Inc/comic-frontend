/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { CircularProgress } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import Button from '@components/Button';
import { Route } from 'src/constants/routes';
import { StoriettesParam, apisChapters, apisComic } from 'src/services/apiConfig';

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
  const { t } = useTranslation();
  const { push } = useRouter();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [dataChapter, setDataChapter] = useState<StoriettesParam[]>([]);
  const [dataComic, setDataComic] = useState<StoriettesParam[]>([]);
  const [rowPage, setRowPage] = useState(5);

  useEffect(() => {
    apisChapters.getChapters().then(({ data }) => {
      setDataChapter(data);
      setLoading(false);
    });
    apisComic.getStoriettes().then(({ data }) => {
      setDataComic(data);
    });
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

  const handleClick = (id: number) => {
    push(`${Route.chapter}/${id}`);
  };

  return loading ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </div>
  ) : (
    <Container>
      <TitleWrapper>
        <Title variant="h4">{dataComic[0]?.title}</Title>
        <Button variantType="gradient" size="medium" onClick={() => push(`${Route.chapterCreate}`)}>
          {t('chaptersPreview.createChapter')}
        </Button>
      </TitleWrapper>
      <TableMui>
        <TableBody>
          {dataChapter.slice(page * rowPage, page * rowPage + rowPage).map((row, index) => (
            <TableRowMui key={row.id} onClick={() => handleClick(row.id)}>
              <TableCellImg>
                <img src={row.canvas[0]?.image_url} height={100} alt="url" />
              </TableCellImg>
              <TableCell>{row.title}</TableCell>
              <TableCell />
              <TableCell>{formatDate(row.updated_at).toString()}</TableCell>
              <TableCell>
                <CenterDivVertical>
                  <FavoriteBorderOutlinedIcon />
                  <div>{row.chapter_like_count}</div>
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
