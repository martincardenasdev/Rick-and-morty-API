import { useTypedSelector } from '../../redux/hooks'
import './favorites-count.css'

function FavoritesCount() {
  const favorites = useTypedSelector((state) => state.favorites)
  return (
    <div className="favorites-count">
      <span>Favorites count: {favorites.length}</span>
    </div>
  )
}

export default FavoritesCount
