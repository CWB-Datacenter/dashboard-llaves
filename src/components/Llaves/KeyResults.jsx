import { Box, Typography } from '@mui/material'
import { useContext } from 'react'
import { KeysContext } from '../../context/llaves/KeysContext'

export const KeyResults = ({ searchTerm }) => {
  const { state } = useContext(KeysContext)
  const { keys, loading } = state

  // Asegúrate de que `keys` siempre sea un arreglo
  const safeKeys = Array.isArray(keys) ? keys : []

  // Filtrar llaves en base al término de búsqueda
  const filteredKeys = safeKeys.filter(key =>
    (key.cliente_equipo ? key.cliente_equipo.toLowerCase() : '').includes(searchTerm.toLowerCase())
  )

  return (
    <Box>
      {loading ? (
        <Typography>Cargando llaves...</Typography>
      ) : safeKeys.length === 0 && !searchTerm ? (
        // Mostrar mensaje si no hay llaves en la base de datos y no hay término de búsqueda
        <Typography>No hay llaves en la base de datos</Typography>
      ) : searchTerm ? (
        filteredKeys.length > 0 ? (
          filteredKeys.map(key => (
            <Typography key={key.id}>
              {key.codigo} - {key.cliente_equipo} - {key.nombre_ubicacion}
            </Typography>
          ))
        ) : (
          <Typography>No se encontraron resultados</Typography>
        )
      ) : null} {/* No muestra nada si no hay búsqueda */}
    </Box>
  )
}
