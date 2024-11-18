import React, { useContext } from 'react'
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material'
import { KeysContext } from '../../context/llaves/KeysContext'
import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'

const columns = [
  { id: 'codigo', label: 'Código', minWidth: 100 },
  { id: 'cliente_equipo', label: 'Cliente Equipo', minWidth: 170 },
  { id: 'posicion', label: 'Posición', minWidth: 170 },
  { id: 'nombre_ubicacion', label: 'Ubicación', minWidth: 170 },
]

export const KeyResults = ({ searchTerm }) => {
  const { state } = useContext(KeysContext)
  const { keys, loading } = state
  const safeKeys = Array.isArray(keys) ? keys : []

  // Filtrar llaves en base al término de búsqueda
  const filteredKeys = safeKeys.filter(key => {
    const searchValue = searchTerm.toLowerCase()
    return (
      (key.codigo ? key.codigo.toLowerCase() : '').includes(searchValue) ||
      (key.cliente_equipo ? key.cliente_equipo.toLowerCase() : '').includes(searchValue) ||
      (key.posicion ? key.posicion.toLowerCase() : '').includes(searchValue) ||
      (key.nombre_ubicacion ? key.nombre_ubicacion.toLowerCase() : '').includes(searchValue)
    )
  })
  
  // Paginación de la tabla
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Box>
      {loading ? (
        <Typography>Cargando llaves...</Typography>
      ) : (
        <Paper sx={{ width: '100%', boxShadow: 'none' }}>
          <TableContainer sx={{ backgroundColor: 'var(--background-grey)', cursor: 'pointer' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell sx={{ backgroundColor: 'var(--background-grey)' }}
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
                    <TableRow
                      sx={{
                        textTransform: 'capitalize',
                        opacity: key.cliente_equipo?.toLowerCase() === 'libre' ? 0.3 : 1, // Aplica opacidad si el cliente_equipo es "Libre"
                      }}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={key.id}
                    >
                      {columns.map((column) => {
                        let value = key[column.id]
                        // Mostrar el ícono si la columna es 'nombre_ubicacion'
                        if (column.id === 'nombre_ubicacion') {
                          value = (
                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                              {value}
                              {value?.toLowerCase() === 'planta alta' && (
                                <NorthIcon sx={{ fontSize: '.95em', color: 'green', marginLeft: 0.5 }} />
                              )}
                              {value?.toLowerCase() === 'planta baja' && (
                                <SouthIcon sx={{ fontSize: '.95em', color: 'red', marginLeft: 0.5 }} />
                              )}
                            </Box>
                          )
                        }
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align || 'left'}
                            sx={{
                              fontWeight: column.id === 'codigo' || column.id === 'posicion' ? 'bold' : 'normal',
                              color: column.id === 'codigo' ? '#8e24aa' : column.id === 'posicion' ? '#42a5f5' : 'inherit',
                            }}
                          >
                            {value !== undefined && value !== null ? value : '-'}
                          </TableCell>
                        )
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
          <TablePagination sx={{ backgroundColor: 'var(--background-grey)' }}
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
  )
}
