import { Box, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { DatacenterContext } from '../../context/DatacenterContext'

export const KeyResults = ({ searchTerm }) => {
  const { state } = useContext(DatacenterContext) 
  const { selectedDatacenter } = state
  const [keys, setKeys] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchKeys = async () => {
      if (!selectedDatacenter) return
      setLoading(true)
      try {
        const response = await fetch(`https://cwp-vidc-scat.cwpanama.com/llaves/api/selectLlaves.php?datacenter_id=${selectedDatacenter}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
      })
      const data = await response.json()
      console.log(data)
      setKeys(data)
      } catch (error) {
        console.error("Error al obtener llaves:", error)
        setKeys([])
      }
      setLoading(false)
    }
    if (selectedDatacenter) fetchKeys()
  }, [selectedDatacenter])
  
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
