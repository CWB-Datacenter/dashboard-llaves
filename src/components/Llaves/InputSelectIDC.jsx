import React, { useContext, useEffect, useState } from 'react'
import { DatacenterContext } from '../../context/DatacenterContext'
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material'
import { KeysContext } from '../../context/llaves/KeysContext'

export const InputSelectIDC = () => {
    const { state, dispatch } = useContext(DatacenterContext) // Solo usamos selectedDatacenter del contexto
    const { fetchKeys } = useContext(KeysContext)
    const [datacenters, setDatacenters] = useState([]) // Estado local para datacenters

    // Función para cargar datacenters y selectedDatacenter desde la API
    const loadDatacenters = async () => {
        try {
            const response = await fetch(`https://cwp-vidc-scat.cwpanama.com/llaves/api/selectDatacenter.php`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
            })
            const data = await response.json()
            // return console.log(data)
            setDatacenters(data.datacenters) 
            dispatch({ type: 'SET_DATACENTER', payload: data.selectedDatacenter }) 
            fetchKeys(data.selectedDatacenter)
        } catch (error) {
            console.error('Error al cargar los datacenters:', error)
        }
    }

    // Cargar los datacenters cuando el componente se monta
    useEffect(() => {
        loadDatacenters()
    }, [])

    // Maneja el cambio de selección en el <Select>
    const handleChange = (event) => {
        dispatch({ type: 'SET_DATACENTER', payload: Number(event.target.value) })
        fetchKeys(Number(event.target.value))
    }

    return (
        <FormControl>
        <Select label="Seleccione Datacenter" value={state.selectedDatacenter || ''} onChange={handleChange}>
            {datacenters.map((dc) => (
                <MenuItem key={dc.id} value={dc.id}>
                    {dc.datacenter}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
    )
}
