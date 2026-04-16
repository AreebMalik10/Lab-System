import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import AddIcon from '@mui/icons-material/Add'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import BiotechIcon from '@mui/icons-material/Biotech'
import authService from '../services/authService'

const NAV_ITEMS = [
  { label: 'Dashboard',    path: '/dashboard',    icon: <DashboardOutlinedIcon fontSize="small" /> },
  { label: 'Reception',    path: '/reception',    icon: <PersonAddOutlinedIcon fontSize="small" /> },
  { label: 'Result Entry', path: '/result-entry', icon: <ScienceOutlinedIcon fontSize="small" /> },
  { label: 'Accounts',     path: '/accounts',     icon: <AccountBalanceWalletOutlinedIcon fontSize="small" /> },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    authService.logout()
    navigate('/login')
    window.location.reload()
  }

  return (
    <Box sx={{
      width: 260,
      height: '100vh',
      bgcolor: '#ffffff',
      borderRight: '1px solid #eef2f7',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      position: 'sticky',
      top: 0,
    }}>
      {/* Logo */}
      <Box sx={{ px: 3, pt: 3.5, pb: 2.5, display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Box sx={{
          width: 40, height: 40, borderRadius: 2,
          bgcolor: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(29,78,216,0.12)'
        }}>
          <BiotechIcon sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        <Box>
          <Typography sx={{ color: '#0f172a', fontWeight: 800, fontSize: 14 }}>
            Core Lab Ops
          </Typography>
          <Typography sx={{ color: '#64748b', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            Station Alpha-12
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#f1f5f9', mx: 3, mb: 1 }} />

      {/* Nav Items */}
      <List sx={{ px: 2.5, pt: 0.5, flex: 1 }}>
        {NAV_ITEMS.map(item => {
          const active = location.pathname === item.path
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.75 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  borderRadius: 1.5,
                  borderLeft: `4px solid ${active ? '#1d4ed8' : 'transparent'}`,
                  bgcolor: active ? '#eff6ff' : 'transparent',
                  '&:hover': { bgcolor: active ? '#eff6ff' : '#f8fafc' },
                  py: 1.1,
                  px: 1.25,
                }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: active ? '#1d4ed8' : '#475569' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 13,
                    fontWeight: active ? 700 : 600,
                    color: active ? '#0f172a' : '#475569',
                    textTransform: 'uppercase',
                    letterSpacing: 0.6,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>

      {/* New Analysis button */}
      <Box sx={{ px: 3, pb: 2 }}>
        <Button
          fullWidth
          startIcon={<AddIcon />}
          variant="contained"
          sx={{
            bgcolor: '#1d4ed8',
            '&:hover': { bgcolor: '#1e40af' },
            borderRadius: 2,
            py: 1.05,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.6,
            textTransform: 'none',
            boxShadow: '0 6px 18px rgba(29,78,216,0.12)'
          }}
        >
          + New Analysis
        </Button>
      </Box>

      <Divider sx={{ borderColor: '#f1f5f9', mx: 3 }} />

      {/* Settings & Logout */}
      <List sx={{ px: 2.5, py: 1 }}>
        {[
          { label: 'Settings', icon: <SettingsOutlinedIcon fontSize="small" />, onClick: undefined },
          { label: 'Logout',   icon: <LogoutOutlinedIcon fontSize="small" />,   onClick: handleLogout },
        ].map(item => (
          <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={item.onClick}
              sx={{ borderRadius: 1.5, py: 0.9, '&:hover': { bgcolor: '#f8fafc' } }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: '#64748b' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 12, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.6 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
