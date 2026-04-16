import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import NAV from '../navigation'

export default function Header(){
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{borderBottom:1,borderColor:'divider',bgcolor:'background.paper'}}>
      <Toolbar sx={{justifyContent:'space-between'}}>
        <Typography variant="h6" component={Link} to="/" sx={{textDecoration:'none',color:'text.primary'}}>
          LabSystem
        </Typography>
        <Box sx={{display:'flex',gap:1}}>
          {NAV.slice(-1).map(item => (
            <Button key={item.slug} component={Link} to={item.path} variant="outlined" size="small">{item.label}</Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
