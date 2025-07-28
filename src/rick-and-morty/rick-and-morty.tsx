import { useEffect } from 'react'
import CharactersTable from './characters-table/characters-table'
import { useDispatch } from 'react-redux'
import { fetchCharacters } from '../redux/actions'
import { useTypedSelector } from '../redux/hooks'
import FavoritesCount from './favorites-count/favorites-count'
import Search from './search/search'
import './rick-and-morty.css'

function RickAndMorty() {
  const dispatch = useDispatch()
  const {
    characters,
    searchCharacters,
    favorites,
    selectedCharacters,
    isLoading,
  } = useTypedSelector((state) => state)

  const charactersFactory = () => {
    if (searchCharacters && searchCharacters.length > 0) {
      return searchCharacters
    }

    return characters
  }

  useEffect(() => {
    dispatch(fetchCharacters())
  }, [dispatch])

  return (
    <div className="rick-and-morty">
      <Search characterIds={selectedCharacters} />
      <CharactersTable
        characters={charactersFactory()}
        favorites={favorites}
        selectedCharacters={selectedCharacters}
        isLoading={isLoading}
      />
      <FavoritesCount count={favorites.length} />
    </div>
  )
}

export default RickAndMorty
