import { useContext, useState } from 'react'
import { DatacenterContext } from '../../context/DatacenterContext'
import { KeysContext } from '../../context/llaves/KeysContext'

export const CargarArchivos = () => {
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
            const response = await fetch(`https://cwp-vidc-scat.cwpanama.com/llaves/llaves.php`, {
                method: 'POST',
                body: formData,
            })
            if (!response.ok) throw new Error('Upload failed')
            
            const result = await response.json()
            console.log('Respuesta del servidor:', result) // Verifica la respuesta en la consola
            await fetchKeys(selectedDatacenter)
        } catch (error) {
            console.error('Error en la carga:', error) // Imprime el error en consola
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />
            <button type="submit">Upload Excel</button>
        </form>
    )
}
