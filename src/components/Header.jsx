import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

export default function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: '#fff',
        borderBottom: '1px solid #e5e7eb',
        color: 'text.primary',
        zIndex: 10,
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: '56px !important', px: { xs: 2, sm: 3 } }}>
        {/* Page Title */}
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, fontSize: 17, color: '#0f172a', whiteSpace: 'nowrap', mr: 3 }}
        >
          Clinical Precision Lab
        </Typography>

        {/* Search */}
        <Box sx={{
          flex: 1,
          maxWidth: 400,
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#f1f5f9',
          borderRadius: 2,
          px: 1.5,
          py: 0.5,
          gap: 1,
        }}>
          <SearchIcon sx={{ fontSize: 18, color: '#94a3b8' }} />
          <InputBase
            placeholder="Search Patients or Lab ID..."
            sx={{ fontSize: 13, color: '#475569', flex: 1, '& input': { p: 0 } }}
          />
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Right icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small" sx={{ color: '#64748b' }}>
            <NotificationsOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: '#64748b' }}>
            <SettingsOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: '#64748b' }}>
            <HelpOutlineOutlinedIcon fontSize="small" />
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 28, alignSelf: 'center' }} />

          {/* User info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#0f172a', lineHeight: 1.3 }}>
                Alex Thompson
              </Typography>
              <Typography sx={{ fontSize: 10, color: '#94a3b8', letterSpacing: 0.4, textTransform: 'uppercase' }}>
                Lab Administrator • Alpha-12
              </Typography>
            </Box>
            <Avatar
              sx={{ width: 34, height: 34, bgcolor: '#1d4ed8', fontSize: 13, fontWeight: 700 }}
            >
              AT
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
