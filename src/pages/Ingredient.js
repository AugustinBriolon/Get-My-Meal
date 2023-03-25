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
          <Link to='/' className='back-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Go Back Sarch for an Ingredient
          </Link>
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
      ) :
        <>
          <div className='skeleton skeleton-title'></div>
          <div className="meal-list">

            <div className="ingredient-meal-container skeleton skeleton-container"></div>
            <div className="ingredient-meal-container skeleton skeleton-container"></div>
            <div className="ingredient-meal-container skeleton skeleton-container"></div>
            <div className="ingredient-meal-container skeleton skeleton-container"></div>

          </div>
        </>
      }
    </div>
  );
}

export default Ingredient;