import { useContext, useEffect, useState } from 'react'
import { CargarArchivos } from './CargarArchivos'
import { ListarArchivos } from './ListarArchivos'
import { DatacenterContext } from '../../context/DatacenterContext'

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
    <div className='sidebar'>
      <ListarArchivos files={ files }/>
      <CargarArchivos onUploadSuccess={ loadFiles }/>
    </div>
  )
}
