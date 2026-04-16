import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header'
import Home from './screens/Home/Home'
import Login from './screens/Auth/Login'
import Dashboard from './screens/Dashboard/Dashboard'
import Profile from './screens/Profile/Profile'
import Sidebar from './components/Sidebar'
import useAuth from './hooks/useAuth'
import theme from './theme'

export default function App(){
  const { user } = useAuth()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <div style={{display:'flex'}}>
          {user && <Sidebar />}
          <main style={{flex:1}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}
