import { useContext, useState } from 'react'
import { DatacenterContext } from '../../context/DatacenterContext'
import { KeysContext } from '../../context/llaves/KeysContext'
import { Box, Button, FormControl, Typography } from '@mui/material'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

export const CargarArchivos = ({ onUploadSuccess, datacenter }) => {
    const [file, setFile] = useState(null)
    const { state } = useContext(DatacenterContext)
    const { fetchKeys } = useContext(KeysContext)
    const { selectedDatacenter } = state

    const handleFileChange = (event) => {
        const file = event.target.files[0]

        // Verificar que el archivo sea de tipo Excel
        const validExtensions = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
        if (file && !validExtensions.includes(file.type)) return alert('Solo se permiten archivos Excel (.xlsx, .xls)')

        // Verificar que el nombre del archivo comience con el código especificado
        const expectedPrefix = `${import.meta.env.VITE_REGISTRO_LLAVES.toLowerCase()}`
        if (file && !file.name.toLowerCase().startsWith(expectedPrefix)) return alert(`Unicamente archivos con el código "${expectedPrefix}"`)

        // Verificar que unicamente se suba el archivo correcto según el datacenter seleccionado:
        if (datacenter === 1 && !file.name.toLowerCase().startsWith(import.meta.env.VITE_REGISTRO_LLAVES_BAL.toLowerCase()))
            return alert(`El registro de llaves no corresponde a balboa, o el nombre del registro ha sido modificado`)

        if (datacenter === 2 && !file.name.toLowerCase().startsWith(import.meta.env.VITE_REGISTRO_LLAVES_PP.toLowerCase()))
            return alert(`El registro de llaves no corresponde a PP, o el nombre del registro ha sido modificado`)

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
                <label htmlFor="file-input" style={{ cursor: 'pointer', alignSelf: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <DriveFolderUploadIcon sx={{ fontSize: '4em', '&:hover': { fontSize: '4.06em' } }} />
                        <Typography variant="h6">
                            Seleccionar archivo
                        </Typography>
                    </Box>
                </label>
                {file ? (
                    <Typography variant="body2" sx={{ marginTop: 1, width: '100%', maxWidth: '400px', alignSelf: 'center', height: '2.5em' }}>
                        Archivo seleccionado: {file.name}
                    </Typography>
                ) : (
                    <Typography variant="body2" sx={{ marginTop: 1, width: '100%', maxWidth: '400px', alignSelf: 'center', height: '2.5em' }}>
                        Seleccione un archivo Excel (.xlsx, .xls).
                    </Typography>
                )}
                <Button color='secondary' variant="outlined" type="submit" sx={{ marginTop: 1, width: '100%', maxWidth: '300px', alignSelf: 'center' }}>
                    Subir registro
                </Button>
            </FormControl>
        </form>
    )
}
