import { useContext, useState } from 'react'
import { DatacenterContext } from '../../context/DatacenterContext'
import { KeysContext } from '../../context/llaves/KeysContext'

export const CargarArchivos = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null)
    const { state } = useContext(DatacenterContext)
    const { fetchKeys } = useContext(KeysContext)
    const { selectedDatacenter } = state

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!file) {
            alert('Seleccione un archivo')
            return
        }
        if (!selectedDatacenter) {
            alert('No se ha seleccionado un datacenter')
            return
        }

        const formData = new FormData()
        formData.append('excelFile', file)
        formData.append('datacenterId', Number(selectedDatacenter))

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/llaves/llaves.php`, {
                method: 'POST',
                body: formData,
            })
            if (!response.ok) throw new Error('Upload failed')
            
            const result = await response.json()
            setFile(null)
            event.target.reset()
            // console.log('Respuesta del servidor:', result)
            await fetchKeys(selectedDatacenter)
            if (onUploadSuccess) onUploadSuccess() // Se llama la función desde <Sidebar> para actualizar listado de docs
        } catch (error) {
            console.error('Error en la carga:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
            <button type="submit">Upload Excel</button>
        </form>
    )
}
