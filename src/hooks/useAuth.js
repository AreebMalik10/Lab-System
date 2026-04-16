import { useState } from 'react'

export default function useAuth(){
  // initialize synchronously from localStorage so routes don't flash/redirect
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch (err) {
      return null
    }
  })

  return { user, setUser }
}

