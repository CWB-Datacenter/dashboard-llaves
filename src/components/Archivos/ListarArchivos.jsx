import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

export const ListarArchivos = ({ files }) => {
    // console.log(files)
    const handleDownload = (fileId) => {
        console.log(fileId)
    }
    return (
        <>
            {files && files.length > 0 ? (
                <List sx={{ width: '100%' }}>
                    {files.map((file) => (
                        <ListItem key={file.id}>
                            <ListItemIcon>
                                {/* Puedes reemplazar esto por un icono real */}
                                svg
                            </ListItemIcon>
                            <ListItemText primary={file.nombre_archivo} secondary={file.fecha_subida} />
                            <ListItemIcon onClick={ () => handleDownload(file.id) }>
                                D
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <>No hay documentos en la base de datos</>
            )}
        </>

    )
}
