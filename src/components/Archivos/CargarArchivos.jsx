import { useContext, useState } from 'react'
import { DatacenterContext } from '../../context/DatacenterContext'
import { KeysContext } from '../../context/llaves/KeysContext'
import { Button, FormControl, TextField, Typography } from '@mui/material'

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
        if (!file) return alert('Seleccione un archivo')
        if (!selectedDatacenter) return alert('No se ha seleccionado un datacenter')

        const formData = new FormData()
        formData.append('excelFile', file)
        formData.append('datacenterId', Number(selectedDatacenter))

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/llaves/llaves.php`, {
                method: 'POST',
                body: formData,
            })
            if (!response.ok) throw new Error('Upload failed')
            setFile(null)
            event.target.reset()
            await fetchKeys(selectedDatacenter)
            if (onUploadSuccess) onUploadSuccess() // Se llama la función desde <Sidebar> para actualizar listado de docs
        } catch (error) {
            console.error('Error en la carga:', error)
        }
    }

    return (
       <form onSubmit={ handleSubmit }>
            <FormControl fullWidth margin="normal">
                <Typography variant="h6" gutterBottom>
                    Cargar Archivo de Llaves
                </Typography>
                <TextField
                    type="file"
                    onChange={ handleFileChange }
                    accept=".xlsx, .xls"
                    helperText="Seleccione un archivo Excel (.xlsx, .xls)"
                />
                <Button variant="outlined" type="submit">
                    Subir registro
                </Button>
            </FormControl>
        </form>
    )
}
