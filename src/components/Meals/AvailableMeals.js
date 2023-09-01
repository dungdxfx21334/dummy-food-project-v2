import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'
import { useEffect, useState, useCallback } from 'react'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(null)

  const fetchingMeals = useCallback(async () => {
    const response = await fetch(
      'https://meal-http-4df27-default-rtdb.asia-southeast1.firebasedatabase.app/DUMMY_MEALS.json'
    )

    if (!response.ok) {
      throw new Error('Something went wrong!')
    }
    const data = await response.json()

    setMeals(Object.values(data)[0].meals)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchingMeals().catch(error => {
      setHasError(error.message)
      setIsLoading(false)
    })
  }, [fetchingMeals])

  if (hasError) {
    return <p className={classes.hasError}>{hasError}</p>
  }

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      {isLoading && <p className={classes.loading}>Loading...</p>}
      {!isLoading && (
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      )}
    </section>
  )
}

export default AvailableMeals
