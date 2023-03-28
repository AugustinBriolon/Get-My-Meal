import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";

const Ingredient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { meal } = useParams();
  const [mealData, setMealtData] = useState([]);
  const url = 'https://www.themealdb.com/api/json/v2/9973533/search.php?s=';
  const ingredients = [];
  const measures = [];
  const strInstructions = useRef();

  useEffect(() => {
    fetch(url + `${meal}`)
      .then(res => res.json())
      .then(data => {
        setMealtData(data.meals[0]);
        setIsLoading(true);
      })
  }, [meal]);

  for (let i = 1; i <= 20; i++) {
    if (mealData[`strIngredient${i}`]) {
      ingredients.push(mealData[`strIngredient${i}`]);
      measures.push(mealData[`strMeasure${i}`]);
    }
  }

  if (strInstructions.current) {
    const p = strInstructions.current;
    const text = p.textContent;
    const newText = text.replace(/\./g, '.<br><br>');
    p.innerHTML = newText;
  }


  return (
    <section className="meal-page section">
      {isLoading ? (
        <>
          <Link to='/' className='back-btn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Go Back Sarch for an Ingredient
          </Link>
          <h1 className='title-3d'>{meal}</h1>
          <h2 className="title-category">Category: {mealData.strCategory}</h2>


          <div className="meal-container">

            <div className="meal-img-container">
              <img src={mealData.strMealThumb} alt="" className="meal-img" />
            </div>

            <div className="meal-infos-methode">
              <p ref={strInstructions} className="meal-instructions">{mealData.strInstructions}</p>
            </div>

            <div className="meal-ingredient-container">

              {ingredients.map((ingredient, index) => (
                <div key={index} className="meal-ingredient">
                  <Link to={`/${ingredient}`} className='ingredient-link' >
                    {ingredient.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Link>
                  <div className="line"></div>
                  <p className="meal-ingredient-measure">{measures[index]}</p>
                </div>
              ))}

            </div>

            {
              mealData.strYoutube &&
              <div className="meal-video-container">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube-nocookie.com/embed/${mealData.strYoutube.slice(32)}?rel=0&amp;loop=1&playlist=${mealData.strYoutube.slice(32)}&autoplay=1&mute=1`}
                  title="YouTube video player"
                  allowFullScreen
                ></iframe>
              </div>
            }

          </div>
        </>
      ) :
        <>
          <div className='skeleton skeleton-long-title'></div>
          <div className="skeleton skeleton-category"></div>

          <div className="meal-container">

            <div className="meal-img-container skeleton"></div>

            <div className="meal-infos-methode">
              <div className="skeleton skeleton-sentence"></div>
              <div className="skeleton skeleton-sentence"></div>
              <div className="skeleton skeleton-sentence"></div>
              <div className="skeleton skeleton-sentence"></div>
              <div className="skeleton skeleton-sentence"></div>
              <div className="skeleton skeleton-sentence"></div>
            </div>

            <div className="meal-ingredient-container">
              <div className="meal-ingredient skeleton skeleton-case"></div>
              <div className="meal-ingredient skeleton skeleton-case"></div>
              <div className="meal-ingredient skeleton skeleton-case"></div>
              <div className="meal-ingredient skeleton skeleton-case"></div>
              <div className="meal-ingredient skeleton skeleton-case"></div>
              <div className="meal-ingredient skeleton skeleton-case"></div>
            </div>

            <div className="meal-video-container skeleton skeleton-iframe"></div>

          </div>
        </>
      }
    </section>
  );
}

export default Ingredient;