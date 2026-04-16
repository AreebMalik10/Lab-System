import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header'
import AlertProvider from './components/AlertProvider'
import Home from './screens/Home/Home'
import Login from './screens/Auth/Login'
import Dashboard from './screens/Dashboard/Dashboard'
import Profile from './screens/Profile/Profile'
import Sidebar from './components/Sidebar'
import useAuth from './hooks/useAuth'
import theme from './theme'

export default function App(){
  const { user } = useAuth()

  // small wrapper to read location inside component render
  function AppRoutes(){
    const location = useLocation()
    const onLoginPage = location.pathname === '/login'

    return (
      <>
        {user && !onLoginPage && <Header />}
        <div style={{display:'flex'}}>
          {user && !onLoginPage && <Sidebar />}
          <main style={{flex:1}}>
            <Routes>
              <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </main>
        </div>
      </>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AlertProvider>
          <AppRoutes />
        </AlertProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}
