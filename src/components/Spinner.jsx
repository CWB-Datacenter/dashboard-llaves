import { Box, CircularProgress } from "@mui/material"

export const Spinner = () => {
  return (
    <Box textAlign={'center'} >
        <CircularProgress size={25} thickness={3}/>
    </Box>
  )
}
