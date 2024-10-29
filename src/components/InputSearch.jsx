import { TextField } from '@mui/material'
import React from 'react'

export const InputSearch = ({ setSearchTerm  }) => {
  
  const handleSearchChange = (event) => {
    // console.log(event.target.value)
    setSearchTerm(event.target.value)
  }
  
  return (
    <TextField label="Buscar llaves" variant='outlined' onChange={ handleSearchChange }/>
  )
}
