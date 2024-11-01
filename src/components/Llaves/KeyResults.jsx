import { Box, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { KeysContext } from '../../context/llaves/KeysContext'

export const KeyResults = ({ searchTerm }) => {
  const { state } = useContext(KeysContext)
  const { keys, loading } = state

  // Filtrar llaves en base al término de búsqueda
  const filteredKeys = keys.filter(key =>
    key.cliente_equipo.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <Box>
      {loading ? (
        <Typography>Cargando llaves...</Typography>
      ) : searchTerm ? ( // Solo muestra resultados si hay un término de búsqueda
        filteredKeys.length > 0 ? (
          filteredKeys.map(key => (
            <Typography key={key.id}>{key.codigo} - {key.cliente_equipo} - {key.nombre_ubicacion}</Typography>
          ))
        ) : (
          <Typography>No se encontraron resultados</Typography>
        )
      ) : null} {/* No muestra nada si no hay búsqueda */}
    </Box>
  )
}
