import React from 'react'
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'

export default function CustomValidationTextInput({
  name,
  control,
  label,
  rules = {},
  type = 'text',
  autoFocus = false,
  autoComplete = undefined,
}){
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          type={type}
          label={label}
          fullWidth
          margin="normal"
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ''}
        />
      )}
    />
  )
}
