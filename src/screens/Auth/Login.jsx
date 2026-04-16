import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authService'

export default function Login(){
  const [email,setEmail]=useState('admin@example.com')
  const [password,setPassword]=useState('password123')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      await authService.login({email,password})
      navigate('/')
    }catch(err){
      alert('Login failed: check credentials')
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <p>Use <strong>admin@example.com</strong> / <strong>password123</strong></p>
      <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:8,maxWidth:320}}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}
