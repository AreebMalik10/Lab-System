import api from '../api'

const HARDCODED = {
  email: 'admin@example.com',
  password: 'password123',
  name: 'Admin User'
}

const authService = {
  login: async ({email,password}) => {
    // simple hardcoded auth for local scaffold/demo
    if (email === HARDCODED.email && password === HARDCODED.password) {
      const user = { email, name: HARDCODED.name }
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }

    // fallback: try real API if configured
    try {
      const res = await api.post('/auth/login',{email,password})
      localStorage.setItem('user', JSON.stringify(res.data))
      return res.data
    } catch (err) {
      throw err
    }
  },
  logout: () => {
    localStorage.removeItem('user')
  }
}

export default authService
