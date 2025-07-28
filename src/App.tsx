import './App.css'
import { useAuth } from './hooks/useAuth'
import Login from './login/Login'
import RickAndMorty from './rick-and-morty/rick-and-morty'

function App() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Login />
  }

  return (
    <>
      <RickAndMorty />
    </>
  )
}

export default App
