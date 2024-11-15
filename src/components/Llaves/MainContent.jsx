import { Grid2 } from '@mui/material'
import { useState } from 'react'
import { InputSearch } from '../InputSearch'
import { KeyResults } from './KeyResults'
import { InputSelectIDC } from './InputSelectIDC'

export const MainContent = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    // <Grid2 container sx={{height: { xs: 'auto', md: '90%' }}}>
    <Grid2 container sx={{height: '100%', display: 'flex', flexDirection:'row', alignContent: 'space-evenly'}}>
      <Grid2 size={6} p={2}>
        <InputSelectIDC />
      </Grid2>
      <Grid2 size={12} p={2}>
        <InputSearch setSearchTerm={ setSearchTerm } />
      </Grid2>
      <Grid2 px={2} size={12} sx={{ height: { xs: 'auto', md: '77%' }, overflow: 'auto'}}>
        <KeyResults searchTerm={ searchTerm } />
      </Grid2>
    </Grid2>
  )
}
