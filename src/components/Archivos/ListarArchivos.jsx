import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

export const ListarArchivos = ({ files }) => {
    console.log(files)
    return (
        <>
            {files && files.length > 0 ? (
                <List sx={{ width: '100%' }}>
                    {files.map((file) => (
                        <ListItem key={file.id}>
                            <ListItemIcon>
                                {/* Puedes reemplazar esto por un icono real */}
                                carpetita.svg
                            </ListItemIcon>
                            <ListItemText primary={file.nombre_archivo} secondary={file.fecha_subida} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <>No hay documentos en la base de datos</>
            )}
        </>

    )
}
