import './App.css'
import CharacterModal from './rick-and-morty/character-modal/character-modal'
import RickAndMorty from './rick-and-morty/rick-and-morty'

function App() {
  return (
    <>
      <CharacterModal />
      <div className="login-warp">{/* <Login /> */}</div>
      <div className="">
        <RickAndMorty />
      </div>
    </>
  )
}

export default App
