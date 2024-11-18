import React, { useContext } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { KeysContext } from '../../context/llaves/KeysContext';

const columns = [
  { id: 'codigo', label: 'Código', minWidth: 100 },
  { id: 'cliente_equipo', label: 'Cliente Equipo', minWidth: 170 },
  { id: 'posicion', label: 'Posición', minWidth: 170 },
  { id: 'nombre_ubicacion', label: 'Ubicación', minWidth: 170 },
];

export const KeyResults = ({ searchTerm }) => {
  const { state } = useContext(KeysContext);
  const { keys, loading } = state;
  const safeKeys = Array.isArray(keys) ? keys : [];

  // Filtrar llaves en base al término de búsqueda
  const filteredKeys = safeKeys.filter(key =>
    (key.cliente_equipo ? key.cliente_equipo.toLowerCase() : '').includes(searchTerm.toLowerCase())
  );

  // Paginación de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      {loading ? (
        <Typography>Cargando llaves...</Typography>
      ) : (
        <Paper sx={{ width: '100%', boxShadow: 'none' }}>
          <TableContainer sx={{backgroundColor: 'var(--background-grey)', cursor: 'pointer'}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell sx={{backgroundColor: 'var(--background-grey)'}}
                      key={column.id}
                      align={column.align || 'left'}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {(searchTerm ? filteredKeys : safeKeys)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((key) => (
                    <TableRow sx={{textTransform: 'capitalize'}} hover role="checkbox" tabIndex={-1} key={key.id}>
                      {columns.map((column) => {
                        const value = key[column.id];
                        return (
                          <TableCell key={column.id} align={column.align || 'left'}>
                            {value !== undefined && value !== null ? value : '-'}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                {(searchTerm ? filteredKeys.length === 0 : safeKeys.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      No se encontraron resultados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination sx={{backgroundColor: 'var(--background-grey)'}}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={searchTerm ? filteredKeys.length : safeKeys.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Box>
  );
};
