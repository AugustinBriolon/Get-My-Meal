import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Ingredient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { ingredient } = useParams();
  const [ingredientData, setIngredientData] = useState([]);
  const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

  useEffect(() => {
    fetch(url + `${ingredient}`)
      .then(res => res.json())
      .then(data => {
        setIngredientData(data.meals);
        setIsLoading(true);
      })
  }, [ingredient]);

  return (
    <div className="ingredient-page section">
      {isLoading ? (
        <>
          <h1 className='title-3d'>{ingredient}</h1>
          <div className="meal-list">

            {ingredientData.map((meal, index) => (
              <div key={index} className="ingredient-meal-container" style={{ backgroundImage: `url(${meal.strMealThumb})` }}>
                <Link to={`/meal/${meal.strMeal}`} className='meal-link' >
                  {meal.strMeal}
                </Link>
              </div>
            ))}

          </div>
        </>
      ) : <p>Loading...</p>}
    </div>
  );
}

export default Ingredient;