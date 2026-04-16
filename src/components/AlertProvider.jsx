import React, { createContext, useContext, useState, useCallback } from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const AlertContext = createContext(null)

export function useAlert(){
  return useContext(AlertContext)
}

export default function AlertProvider({ children }){
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState({ severity: 'success', message: '' })

  const showSuccessAlert = useCallback((message, duration = 3000) => {
    setOptions({ severity: 'success', message, duration })
    setOpen(true)
  }, [])

  const showErrorAlert = useCallback((message, duration = 4000) => {
    setOptions({ severity: 'error', message, duration })
    setOpen(true)
  }, [])

  const handleClose = useCallback((event, reason) => {
    if (reason === 'clickaway') return
    setOpen(false)
  }, [])

  return (
    <AlertContext.Provider value={{ showSuccessAlert, showErrorAlert }}>
      {children}
      <Snackbar open={open} autoHideDuration={options.duration || 3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity={options.severity} sx={{ width: '100%' }}>
          {options.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  )
}
