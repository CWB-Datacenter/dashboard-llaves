import { useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Box, Button, Typography } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import { yyMMdd } from '../../helpers/date'

export const QRCode = ({ data, templateImage }) => {
  const qrRef = useRef()
  const canvasRef = useRef()

  const handleDownload = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const qrCanvas = qrRef.current.querySelector('canvas')

    // Cargar la plantilla como imagen
    const template = new Image()
    template.src = templateImage

    template.onload = () => {
      // Ajusta el tamaño del canvas a la plantilla
      canvas.width = template.width
      canvas.height = template.height

      // Dibuja la plantilla en el canvas
      context.drawImage(template, 0, 0)

      // Dibuja el QR en el canvas
      const qrSize = 300 // Tamaño del QR en píxeles
      const qrX = (canvas.width - qrSize) / 1.1 // Centrado en X
      const qrY = (canvas.height - qrSize) / 2 // Centrado en Y
      context.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize)

      // Convertir el canvas combinado en imagen descargable
      const finalImage = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = finalImage
      link.download = `${yyMMdd()}_codigoqr_carga.png`
      link.click()
    }
  }

  return (
    <Box sx={{ textAlign: 'center', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      {data ? (
        <>
        {/* Mostrar el QR en pantalla */}
        <Box p={1} sx={{ display: 'inline-block', border: '4px dashed #424242', borderRadius: 3, cursor: 'pointer' }}>
            <QRCodeCanvas
              value={data}
              size={256}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
              onClick={handleDownload}
            />
          </Box>
          {/* Canvas donde se combinará la plantilla con el QR */}
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

          {/* QR Canvas (fuente para dibujar el QR) */}
          <Box ref={qrRef} sx={{ display: 'none' }}>
            <QRCodeCanvas
              value={data}
              size={256}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
          </Box>

          <Button sx={{marginTop: 4, width: '275px'}}
            variant="outlined"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
          >
            Descargar QR
          </Button>
          <Typography mt={4} variant="subtitle2" component="a" href="http://172.18.229.227/portal-idc-cwp/index.php/documentos-idc/2015-07-20-05-14-47/488-idcfrm04-201210-009-etiquetado-de-cajas-area-de-carga" target="_blank" rel="noopener noreferrer">
            idcfrm04-201210-009_Etiquetado_de_cajas_area_de_carga
          </Typography>

        </>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Edite el texto para generar el código QR.
        </Typography>
      )}
    </Box>
  )
}
