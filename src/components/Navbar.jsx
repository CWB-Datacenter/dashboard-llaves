import { useState } from 'react'
import { PageTitle } from './PageTitle'
import { NavLink } from 'react-router-dom'
import { AppBar, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
import QrCode2SharpIcon from '@mui/icons-material/QrCode2Sharp'
import KeySharpIcon from '@mui/icons-material/KeySharp'

export const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static' sx={{ backgroundColor: 'var(--background-purple)', boxShadow: 'none' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          aria-controls="menu-navbar"
          aria-haspopup="true"
          onClick={ handleMenuOpen }
        >
          <MoreVertSharpIcon />
        </IconButton>
        <Typography variant="subtitle1" onClick={ handleMenuOpen } sx={{cursor: 'pointer'}}>
          Menú
        </Typography>
        <Menu
          id="menu-navbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem component={NavLink} to={'/llaves'} onClick={ handleMenuClose}  style={({ isActive }) => ({ backgroundColor: isActive ? 'var(--background-grey2)' : '' })} >
            <KeySharpIcon />
            <Typography ml={2}>Llaves</Typography>
          </MenuItem>
          <MenuItem component={NavLink} to={'/qrcarga'} onClick={ handleMenuClose}  style={({ isActive }) => ({ backgroundColor: isActive ? 'var(--background-grey2)' : '' })} >
            <QrCode2SharpIcon />
            <Typography ml={2}>QR Carga</Typography>
          </MenuItem>
        </Menu>
        <PageTitle />
      </Toolbar>
    </AppBar>
  )
}
