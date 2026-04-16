import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

export default function Header(){
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{borderBottom:1,borderColor:'divider',bgcolor:'background.paper'}}>
      <Toolbar sx={{justifyContent:'space-between'}}>
        <Typography variant="h6" component={Link} to="/" sx={{textDecoration:'none',color:'text.primary'}}>
          LabSystem
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
