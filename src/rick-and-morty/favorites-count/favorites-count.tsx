import './favorites-count.css'

function FavoritesCount({ count }: { count: number }) {
  return (
    <div className="favorites-count">
      <span>Favorites count: {count}</span>
    </div>
  )
}

export default FavoritesCount
