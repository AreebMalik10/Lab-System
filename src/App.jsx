import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Header from './components/Header'
import AlertProvider from './components/AlertProvider'
const Home = lazy(() => import('./screens/Home/Home'))
const Login = lazy(() => import('./screens/Auth/Login'))
const Dashboard = lazy(() => import('./screens/Dashboard/Dashboard'))
const Reception = lazy(() => import('./screens/Reception/Reception'))
const Profile = lazy(() => import('./screens/Profile/Profile'))
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
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          {user && !onLoginPage && <Sidebar />}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {user && !onLoginPage && <Header />}
            <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, width: '100%' }}>
              <Suspense fallback={<div style={{padding:20}}>Loading...</div>}>
              <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
                <Route path="/reception" element={user ? <Reception /> : <Navigate to="/login" replace />} />
                <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" replace />} />
                <Route path="/home" element={<Home />} />
              </Routes>
              </Suspense>
              </div>
            </main>
          </div>
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
