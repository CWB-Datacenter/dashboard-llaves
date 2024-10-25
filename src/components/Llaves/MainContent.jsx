import { Box } from '@mui/material'
import { InputSearch } from '../InputSearch'
import { KeyResults } from './KeyResults'
import { InputSelectIDC } from './InputSelectIDC'

export const MainContent = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
      width: '100%',
      height: '100vh'
    }}>
      <InputSelectIDC />
      <InputSearch />
      <KeyResults />
    </Box>
  )
}
