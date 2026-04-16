import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authService'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useForm } from 'react-hook-form'
import CustomValidationTextInput from '../../components/CustomValidationTextInput'
import { showSuccessAlert, showErrorAlert } from '../../utils/alerts'

export default function Login(){
  const { control, handleSubmit } = useForm({
    defaultValues: { email: 'admin@example.com', password: 'password123' }
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function submit(e){
    // `e` here is the validated form data
    const data = e
    setLoading(true)
    try{
      await authService.login({ email: data.email, password: data.password })
      showSuccessAlert('Login successful')
      navigate('/dashboard')
    }catch(err){
      showErrorAlert('Wrong Credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box component="main" sx={{display:'flex', height:'100vh', width:'100vw', position:'fixed', top:0, left:0, overflow:'hidden'}}>

      {/* Left — branding panel, hidden on mobile */}
      <Box sx={{
        flex: 1,
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        px: { sm: 6, md: 10 },
        color: '#fff',
        backgroundImage: `linear-gradient(rgba(3,102,214,0.85), rgba(3,102,214,0.85)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAntp4skYjvU5bx3JzUezEoR0tqTj-zbPNlEvw6cXqBVUnTEWfS8X53Dbh2sLk9CcWR9HbGC95UVN0anXsF7yfyWT0kivUycG714Q_FNPyfLQAIQuIuSP51gfSWePqmrZOYgFNvRxHcu30cnMXjXgUCJxIiYJiCKi4DuIZQM07N8w5t-t2Q4FrCGjbikZw0OXuA__q5ZlENg5WBZDZe4pq5JQDgSX6EhWoyMHIlp5yTeWu1zfjg-i8BGUO8IZ8IgJGXFJvOpXXme8WF")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <Box sx={{width:'100%', maxWidth:520}}>
          <Typography variant="subtitle2" sx={{fontWeight:700, mb:2, opacity:0.95}}>Clinical Precision</Typography>
          <Typography variant="h3" sx={{fontWeight:800, mb:2, lineHeight:1.05}}>Advancing pathology through digital intelligence.</Typography>
          <Typography variant="body1" sx={{opacity:0.95}}>Securely access the unified laboratory management environment for high-throughput diagnostic analysis.</Typography>
        </Box>
      </Box>

      {/* Right — login form panel */}
      <Box component={Paper} elevation={6} square sx={{
        width: { xs: '100%', sm: '50%' },
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
      }}>
        <Box sx={{width:'100%', maxWidth: 480, px: { xs: 3, sm: 5, md: 6 }, py: 4, display:'flex', flexDirection:'column', alignItems:'center'}}>
          <Avatar sx={{m:1, bgcolor:'primary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Welcome Back</Typography>
          <Typography variant="body2" sx={{mt:1, mb:2}}>Please enter your credentials to access the system.</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(submit)} sx={{mt:1, width:'100%'}}>
            <CustomValidationTextInput
              name="email"
              control={control}
              label="Email"
              autoFocus
              autoComplete="email"
              rules={{
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' }
              }}
            />
            <CustomValidationTextInput
              name="password"
              control={control}
              label="Password"
              type="password"
              autoComplete="current-password"
              rules={{ required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } }}
            />
            {/* <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between', mt:1}}>
              <Box sx={{display:'flex', alignItems:'center', gap:1}}>
                <input type="checkbox" id="remember" />
                <label htmlFor="remember" style={{fontSize:13, color:'rgba(0,0,0,0.7)'}}>Remember this workstation</label>
              </Box>
              <Button variant="text" size="small">Forgot Password?</Button>
            </Box> */}
            <Button type="submit" fullWidth variant="contained" sx={{mt:3, mb:2, py:1.5, borderRadius:2, boxShadow:3, backgroundColor:'primary.main'}} disabled={loading}>{loading ? 'Signing in...' : 'Login'}</Button>
            <Box sx={{mt:2, textAlign:'center', color:'text.secondary'}}>
              <Typography variant="caption">© 2024 Clinical Precision Systems &nbsp;&nbsp; 
                {/* <Button variant="text" size="small">Privacy Policy</Button> <Button variant="text" size="small">Technical Support</Button> */}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

    </Box>
  )
}
