import { Grid2 } from '@mui/material'
import { useState } from 'react'
import { InputSearch } from '../InputSearch'
import { KeyResults } from './KeyResults'
import { InputSelectIDC } from './InputSelectIDC'

export const MainContent = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <Grid2 container pt={2}>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <InputSelectIDC />
      </Grid2>
      <Grid2 px={2} size={{ xs: 12, md: 8 }}>
        <InputSearch setSearchTerm={ setSearchTerm } />
      </Grid2>
      <Grid2 size={12}>
        <KeyResults searchTerm={ searchTerm } />
      </Grid2>
    </Grid2>
  )
}
