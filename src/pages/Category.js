import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Category = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const url = 'https://www.themealdb.com/api/json/v2/9973533/filter.php?c=';

  useEffect(() => {
    fetch(url + `${category}`)
      .then(res => res.json())
      .then(data => {
        setCategoryData(data.meals);
        setIsLoading(true);
      })
  }, [category]);

  return (
    <div className="ingredient-page section">
      {isLoading ? (
        <>
          <Link to='/' className='back-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Go Back Sarch for an Ingredient
          </Link>
          <h1 className='title-3d'>{category}</h1>

          <div className="meal-list">

            {categoryData.map((meal, index) => (
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

export default Category;