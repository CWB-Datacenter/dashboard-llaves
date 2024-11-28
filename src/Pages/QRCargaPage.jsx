import { Grid2 } from '@mui/material'
import { Formulario } from '../components/QRCarga/Formulario'
import { QRCode } from '../components/QRCarga/QRCode'
import { useState } from 'react'

export const QRCargaPage = () => {

  const [qrData, setQrData] = useState('')

  return (
    <Grid2 container>
      <Grid2 size={6}>
        <Formulario onChange={(value) => setQrData(value)}/> {/* Componente formulario */}
      </Grid2>
      <Grid2 size={6}>
        <QRCode data={qrData}/> {/* Componente QR */}
      </Grid2>
    </Grid2>
  )
}
