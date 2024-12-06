import { Box, Grid2 } from '@mui/material'
import { Formulario } from '../components/QRCarga/Formulario'
import { QRCode } from '../components/QRCarga/QRCode'
import { useState } from 'react'

export const QRCargaPage = () => {

  const [qrData, setQrData] = useState('')

  return (
    <Grid2 container sx={{ height: "calc(100vh - 64px)" }}>
      <Grid2 size={{ xs: 12, md: 6 }} sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            height: '65%',
            width: '1px',
            backgroundColor: '#1976D2',
            transform: 'translateY(-50%)'
          }}
        />
        <Formulario onChange={(value) => setQrData(value)} />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }} sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <QRCode data={qrData} templateImage={'/plantilla_qr_carga.png'} /> {/* Componente QR */}
      </Grid2>
    </Grid2>
  )
}
