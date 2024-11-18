import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

export const Navbar = () => {
  return (
    <AppBar position='static' sx={{ backgroundColor: 'var(--background-purple)', boxShadow: 'none' }}>
        <Toolbar>
            <Typography variant='subtitle1' sx={{ marginLeft: 'auto' }}>
                Dahsboard de llaves
            </Typography>
        </Toolbar>
    </AppBar>
  )
}
