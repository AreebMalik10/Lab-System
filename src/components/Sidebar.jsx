import React from 'react'
import { Link } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import NAV from '../navigation'

export default function Sidebar(){
  return (
    <Drawer variant="permanent" anchor="left" sx={{'.MuiDrawer-paper':{width:220,boxSizing:'border-box',padding:2}}}>
      <nav>
        <List>
          {NAV.map(item => (
            <ListItem key={item.slug} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Drawer>
  )
}
