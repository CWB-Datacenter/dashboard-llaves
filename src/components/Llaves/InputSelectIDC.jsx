import { FormControl, MenuItem, Select } from '@mui/material'
import React, { useState } from 'react'

export const InputSelectIDC = () => {
    
    const [selectedDatacenter, setSelectedDatacenter] = useState(1)

    const handleChange = (event) => {
        setSelectedDatacenter(event.target.value)
        console.log(event.target.value)
    }

    return (
        <FormControl>
            <Select label="Seleccione Datacenter" value={selectedDatacenter} onChange={handleChange}>
                <MenuItem value={1}>IDC Balboa</MenuItem>
                <MenuItem value={2}>IDC Panamá Pacífico</MenuItem>
            </Select>
        </FormControl>
    )
}
