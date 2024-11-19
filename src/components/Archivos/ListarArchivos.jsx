import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'

export const ListarArchivos = ({ files }) => {
    const handleDownload = async (fileId) => {
        window.location.href = `${import.meta.env.VITE_SERVER_URL}/llaves/api/descargarArchivos.php?file_id=${fileId}`
    }
    // Encuentra el archivo más reciente
    const latestFile = Array.isArray(files) && files.length > 0
        ? files.reduce((latest, file) => {
            return new Date(file.fecha_subida) > new Date(latest.fecha_subida) ? file : latest
        }, files[0])
        : null

    return (
        <>
            {files && files.length > 0 ? (
                <List>
                    {files.map((file) => (
                        <ListItem
                            key={file.id} >
                            <ListItemIcon sx={{ minWidth: 'auto', marginRight: 2 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#1d6f42" height='1.6em' width='1.6em' viewBox="0 0 384 512">
                                    <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM155.7 250.2L192 302.1l36.3-51.9c7.6-10.9 22.6-13.5 33.4-5.9s13.5 22.6 5.9 33.4L221.3 344l46.4 66.2c7.6 10.9 5 25.8-5.9 33.4s-25.8 5-33.4-5.9L192 385.8l-36.3 51.9c-7.6 10.9-22.6 13.5-33.4 5.9s-13.5-22.6-5.9-33.4L162.7 344l-46.4-66.2c-7.6-10.9-5-25.8 5.9-33.4s25.8-5 33.4 5.9z" />
                                </svg>
                            </ListItemIcon>
                            <ListItemText
                                primary={file.nombre_archivo}
                                secondary={
                                    <>
                                        {file.fecha_subida}
                                        {file === latestFile && (
                                            <Typography variant="caption" sx={{ marginLeft: 1, color: 'var(--background-purple)', fontStyle: 'italic' }}>
                                                Versión actual
                                            </Typography>
                                        )}
                                    </>
                                }
                                sx={{
                                    '& .MuiListItemText-primary': {
                                        fontSize: '.8em',
                                        fontStyle: 'italic',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    },
                                    '& .MuiListItemText-secondary': {
                                        fontWeight: 'bold',
                                    },
                                }}
                            />
                            <ListItemIcon
                                onClick={() => handleDownload(file.id)}
                                sx={{ minWidth: 'auto', marginRight: 0, cursor: 'pointer' }}
                            >
                                <FileDownloadIcon sx={{ ':hover': { fill: 'var(--background-purple)' } }} />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>

            ) : (
                <Box mt={2} sx={{ textAlign: 'center' }}>
                    <Typography variant="body2">No hay documentos en la base de datos</Typography>
                </Box>
            )}
        </>

    )
}
