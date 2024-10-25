import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

export const Navbar = () => {
  return (
    <AppBar position='fixed'>
        <Toolbar>
            <Typography variant='h6'>
                Dahsboard de llaves
            </Typography>
        </Toolbar>
    </AppBar>
  )
}
