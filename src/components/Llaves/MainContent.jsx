import { Box } from '@mui/material'
import { useState } from 'react'
import { InputSearch } from '../InputSearch'
import { KeyResults } from './KeyResults'
import { InputSelectIDC } from './InputSelectIDC'

export const MainContent = () => {
  const [searchTerm, setSearchTerm] = useState('')

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
      <InputSearch setSearchTerm={ setSearchTerm } />
      <KeyResults searchTerm={ searchTerm }/>
    </Box>
  )
}
