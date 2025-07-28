import { useEffect } from 'react'
import CharactersTable from './characters-table/characters-table'
import { useDispatch } from 'react-redux'
import { fetchCharacters } from '../redux/actions'
import FavoritesCount from './favorites-count/favorites-count'
import Search from './search/search'
import './rick-and-morty.css'
import CharacterModal from './character-modal/character-modal'

function RickAndMorty() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCharacters())
  }, [dispatch])

  return (
    <>
      <CharacterModal />
      <div className="rick-and-morty">
        <Search />
        <CharactersTable />
        <FavoritesCount />
      </div>
    </>
  )
}

export default RickAndMorty
