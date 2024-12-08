import { Box, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { ddMMyy } from '../../helpers/date'

const initialState = `ID de Cliente: LOC####
Cliente: Nombre_de_la_Empresa_propietaria
Responsable: Nombre_de_la_persona_que_entrega_el_articulo
Teléfono: ####-#### / ####-####
Email: Usuario@DominioDelCliente.com
Fecha de Ingreso: ${ddMMyy()}
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
                width: '75%',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                p: 2,
            }}
        >
            <Typography variant='subtitle1'>
                Plantilla para código QR
            </Typography>
            <TextField label="Plantilla Código QR"
                multiline
                minRows={5}
                maxRows={12}
                variant="outlined"
                onChange={handleInputChange}
                fullWidth
                helperText="Agregue o elimine campos de ser requerido"
                value={inputValue}>
            </TextField>
            <Typography mt={2} variant="subtitle2" component="a" href="http://172.18.229.227/portal-idc-cwp/index.php/documentos-idc/2015-07-20-02-24-38/435-idcplt01-201406-036-politica-para-el-area-de-carga" target="_blank" rel="noopener noreferrer">
                idcplt01-201406-036_politica_para_el_area_de_carga
            </Typography>

        </Box>
    )
}
