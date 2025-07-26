
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchRecipes = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      const data = await res.json()
      if (data.meals) {
        setRecipes(data.meals)
      } else {
        setRecipes([])
        setError('No recipes found.')
      }
    } catch (err) {
      setError('Failed to fetch recipes.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>🍽️ Recipe Finder</h1>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name (e.g., chicken)"
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            width: '60%',
            maxWidth: '400px',
            marginRight: '0.5rem',
          }}
        />
        <button
          onClick={searchRecipes}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </div>

      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {recipes.map((meal) => (
          <div
            key={meal.idMeal}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              margin: '1rem',
              width: '250px',
              textAlign: 'center',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={{ width: '100%', borderRadius: '6px' }}
            />
            <h3>{meal.strMeal}</h3>
            <Link to={`/recipe/${meal.idMeal}`} style={{ color: '#007bff', textDecoration: 'none' }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
