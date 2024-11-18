import { useContext, useEffect, useState } from 'react'
import { CargarArchivos } from './CargarArchivos'
import { ListarArchivos } from './ListarArchivos'
import { DatacenterContext } from '../../context/DatacenterContext'
import { Box } from '@mui/material'

export const Sidebar = () => {
  const [files, setFiles] = useState([])
  const { state } = useContext(DatacenterContext)
  const { selectedDatacenter } = state

  const loadFiles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/llaves/api/selectArchivos.php?datacenter_id=${selectedDatacenter}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const files = await response.json()
      setFiles(files)
      // console.log(files)
    } catch (error) {
      console.error("Error al obtener documentos/registros de llaves:", error)
    }
  }

  useEffect(() => {
    if(selectedDatacenter) loadFiles()
  }, [selectedDatacenter])
  

  return (
    <Box p={1} pb={6} sx={
      {backgroundColor: 'var(--background-grey2)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        boxShadow: { xs: 'none', md: '-2px 0 5px rgba(0, 0, 0, 0.02)'}
      }}>
      <ListarArchivos files={ files }/>
      <CargarArchivos onUploadSuccess={ loadFiles }/>
    </Box>
  )
}
