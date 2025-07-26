
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function RecipeDetails() {
  const { id } = useParams()
  const [meal, setMeal] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.meals[0])
        setLoading(false)
      })
  }, [id])

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>
  if (!meal) return <p style={{ textAlign: 'center' }}>Recipe not found.</p>

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient) ingredients.push(`${ingredient} - ${measure}`)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>{meal.strMeal}</h1>
      <div style={{ textAlign: 'center' }}>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          style={{ width: '300px', borderRadius: '10px' }}
        />
      </div>
      <h3>Category: {meal.strCategory}</h3>
      <h4>Area: {meal.strArea}</h4>

      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ing, index) => (
          <li key={index}>{ing}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{meal.strInstructions}</p>
    </div>
  )
}

export default RecipeDetails
