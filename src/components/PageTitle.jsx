import { Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'

export const PageTitle = () => {
  const location = useLocation()

  // Determinar el título según la ruta
  const getTitle = () => {
    switch (location.pathname) {
      case '/llaves':
        return 'Dashboard de Llaves'
      case '/qr':
        return 'Códigos QR de Carga'
      default:
        return 'Dashboard'
    }
  }

  return (
    <Typography variant="subtitle1" sx={{ marginLeft: 'auto' }}>
      { getTitle() }
    </Typography>
  )
}
