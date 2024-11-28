import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const initialState = `ID de Cliente: LOC####
Cliente: Nombre_de_la_Empresa_propietaria
Responsable: Nombre_de_la_persona_que_entrega_el_articulo
Teléfono: ####-#### / ####-####
Email: Usuario@DominioDelCliente.com
Fecha de Ingreso: dd/mm/aaaa
Marca: Dell
Modelo: Poweredge 2950
Registrado por: Nombre_de_Especialista_IDC
WO de ingreso de Equipo: WO0000000#####`

export const Formulario = ({ onChange }) => {

    const [inputValue, setInputValue] = useState(initialState)

    const handleInputChange = (event) => {
        const value = event.target.value
        setInputValue(value)
        onChange(value)
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2, // Espaciado entre elementos
                p: 2,   // Padding dentro del formulario
            }}
        >
            <Typography variant='h6' component='h3'>
                Plantilla para código QR
            </Typography>
            <TextField label="Plantilla Código QR"
                multiline
                rows={10} 
                variant="outlined"
                onChange={handleInputChange}
                fullWidth
                helperText="Agregue o elimine campos de ser requerido"
                value={inputValue}> 
            </TextField>
        </Box>
    )
}
