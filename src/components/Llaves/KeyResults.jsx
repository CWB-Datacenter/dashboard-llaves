import { Box, Typography } from '@mui/material'

export const KeyResults = ({ searchTerm }) => {
  // Simulamos datos de ejemplo para las llaves
  const keys = [
    { id: 1, nombre: 'Llave A', ubicacion: 'Locación 1' },
    { id: 2, nombre: 'Llave B', ubicacion: 'Locación 2' },
    { id: 3, nombre: 'Llave C', ubicacion: 'Locación 3' },
  ]

  // Filtrar llaves con base en el término de búsqueda
  const filteredKeys = keys.filter(key =>
    key.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box>
      {filteredKeys.length > 0 ? (
        filteredKeys.map(key => (
          <Typography key={key.id}>{key.nombre} - {key.ubicacion}</Typography>
        ))
      ) : (
        <Typography>No se encontraron llaves</Typography>
      )}
    </Box>
  )
}
