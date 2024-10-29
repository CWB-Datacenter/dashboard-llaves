import { Box, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { DatacenterContext } from '../../context/DatacenterContext'

export const KeyResults = ({ searchTerm }) => {
  const { state } = useContext(DatacenterContext) 
  const { selectedDatacenter } = state
  const [keys, setKeys] = useState([])

  useEffect(() => {
    const fetchKeys = async () => {
      try {
        const response = await fetch(`https://cwp-vidc-scat.cwpanama.com/llaves/api/selectLlaves.php?datacenter_id=${selectedDatacenter}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
      })
      const data = await response.json()
      setKeys(data)
      } catch (error) {
        console.error("Error al obtener llaves:", error);
      }
    }
    if (selectedDatacenter) fetchKeys()
  }, [selectedDatacenter])
  
  // Filtrar llaves en base al término de búsqueda
  const filteredKeys = keys.filter(key =>
    key.cliente_equipo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <p>Como mostrar las llaves aquí...</p>
    // <Box>
    //   { filteredKeys.length > 0 ? (
    //     filteredKeys.map(key => (
    //       <Typography key={key.id}>{key.cliente_equipo} - {key.ubicacion}</Typography>
    //     ))
    //   ) : (
    //     <Typography>No se encontraron llaves</Typography>
    //   )}
    // </Box>
  )
}
