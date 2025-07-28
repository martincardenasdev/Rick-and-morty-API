import { createContext, useState, type ReactNode } from 'react'

type AuthContextType = {
  isLoggedIn: boolean
  login: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: window.localStorage.getItem('loggedIn') === 'true',
  login: () => {
    window.localStorage.setItem('loggedIn', 'true')
  },
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem('loggedIn') === 'true'
    } catch (error) {
      console.error(
        'Error accessing localStorage, cannot tell if the user is logged in or not:',
        error
      )
      return false
    }
  })

  const login = () => {
    try {
      window.localStorage.setItem('loggedIn', 'true')
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Error setting login status:', error)
    }
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
