import { useContext, useState } from 'react'
import { DatacenterContext } from '../../context/DatacenterContext'
import { KeysContext } from '../../context/llaves/KeysContext'
import { Box, Button, FormControl, Typography } from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

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
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal" sx={{ textAlign: 'center' }}>
                <input
                    type="file"
                    id="file-input"
                    style={{ display: 'none' }} // Oculta el input nativo
                    onChange={handleFileChange}
                    accept=".xlsx, .xls"
                />
                <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <DriveFolderUploadIcon sx={{ fontSize: '4em', color: '0' }} />
                        <Typography variant="h6">
                            Seleccionar archivo
                        </Typography>
                    </Box>
                </label>
                {file && (
                    <Typography variant="body2" sx={{ marginTop: 1, width: '100%', maxWidth: '400px', alignSelf: 'center' }}>
                        Archivo seleccionado: {file.name}
                    </Typography>
                )}
                <Button color='secondary' variant="outlined" type="submit" sx={{ marginTop: 2, width: '100%', maxWidth: '300px', alignSelf: 'center' }}>
                    Subir registro
                </Button>
            </FormControl>
        </form>
    )
}
