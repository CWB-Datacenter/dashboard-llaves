import { useContext, useEffect, useState } from 'react'
import { DatacenterContext } from '../../context/DatacenterContext'
import { MenuItem, TextField } from '@mui/material'
import { KeysContext } from '../../context/llaves/KeysContext'

export const InputSelectIDC = () => {
    const { state, setSelectedDatacenter } = useContext(DatacenterContext) 
    const { fetchKeys } = useContext(KeysContext)
    const [datacenters, setDatacenters] = useState([]) // Estado local para datacenters

    const loadDatacenters = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/llaves/api/selectDatacenter.php`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json()
            // return console.log(data)
            setDatacenters(data.datacenters) // manejo de datacenters local para el select (estado local)
            setSelectedDatacenter(data.selectedDatacenter) // Establece en el estado el datacenter seleccionado
            fetchKeys(data.selectedDatacenter)
        } catch (error) {
            console.error('Error al cargar los datacenters:', error)
        }
    }

    useEffect(() => {
        loadDatacenters()
    }, [])

    const handleChange = (event) => {
        const selectedDatacenterId = Number(event.target.value)
        setSelectedDatacenter(selectedDatacenterId)
        fetchKeys(selectedDatacenterId)
    }

    return (
        <TextField
            select
            label="Datacenter"
            value={ state.selectedDatacenter || '' }
            onChange={ handleChange }
            helperText="Cambiar datacenter"
            variant="standard"
            fullWidth
            // sx={{width: '50%'}}
        >
            {datacenters.map((dc) => (
                <MenuItem key={dc.id} value={dc.id}>
                    {dc.datacenter}
                </MenuItem>
            ))}
        </TextField>
    )
}
