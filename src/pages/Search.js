import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/logo.png';
import image1 from '../images/image-1.webp';
import image2 from '../images/image-2.webp';
import image3 from '../images/image-3.webp';
import image4 from '../images/image-4.webp';
import image5 from '../images/image-5.webp';
import image6 from '../images/image-6.webp';
import image7 from '../images/image-7.webp';
import image8 from '../images/image-8.webp';

const Search = () => {
  const url = 'https://www.themealdb.com/api/json/v2/9973533/';
  const inputRef = useRef();
  const [allIngredients, setAllIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [isLoadingMeals, setIsLoadingMeals] = useState(false);
  const [myMealsFromIngredients, setMyMealsFromIngredients] = useState([]);
  // const [placeholder, setPlaceholder] = useState('');


  useEffect(() => {
    fetch(url + 'list.php?i=list').then(res => res.json()).then(data => {
      setAllIngredients(data.meals);
      setIsLoading(true);
    })
  }, [isLoading, url]);

  useEffect(() => {
    getMealsFromFilteredIngredients();
  }, [filteredIngredients]);

  const searchIngredients = useMemo(() => {
    const filteredIngredients = allIngredients.filter(ingredient => {
      return ingredient.strIngredient.toLowerCase().includes(searchValue.toLowerCase());
    });
    const sortedIngredients = filteredIngredients.sort((a, b) => {
      return a.strIngredient.localeCompare(b.strIngredient);
    });
    return sortedIngredients;
  }, [allIngredients, searchValue]);


  const handleSearchInputChange = useCallback(() => {
    setSearchValue(inputRef.current.value);
  }, []);

  const addIngredient = (e) => {
    const newIngredient = e.target.innerText;
    if (!filteredIngredients.includes(newIngredient)) {
      setFilteredIngredients([...filteredIngredients, newIngredient]);
    }
    setSearchValue('');
    inputRef.current.value = '';
  }

  const removeIngredient = (index) => {
    const newFilteredIngredients = [...filteredIngredients];
    newFilteredIngredients.splice(index, 1);
    setFilteredIngredients(newFilteredIngredients);
  }

  const getMealsFromFilteredIngredients = useCallback(() => {
    fetch(url + 'filter.php?i=' + filteredIngredients.join(',').toLowerCase())
      .then(res => res.json())
      .then(data => {
        setMyMealsFromIngredients(data.meals);
        if (data.meals) {
          setIsLoadingMeals(true);
        } else {
          setIsLoadingMeals(false);
        }
      })
  }, [filteredIngredients]);




  // useEffect(() => {
  //   const ingredientList = ["Milk", "Eggs", "Butter", "Salt", "Pepper", "Garlic", "Onion", "Tomato", "Cheese", "Bread", "Chicken", "Beef", "Pork", "Fish", "Shrimp", "Lettuce", "Carrot", "Potato", "Broccoli", "Mushroom",];
  //   const randomIngredient = ingredientList[Math.floor(Math.random() * ingredientList.length)];
  //   setPlaceholder(randomIngredient);
  // }, []);

  return (
    <section className='section main-container'>

      <div className='logo-container'>
        <img src={logo} alt="logo" className='logo img' />
      </div>

      <div className='content'>
        <div className="title-input">

          <h1 className='title-3d'>Tell us what’s in your fridge, we will tell you what to cook !</h1>

          {isLoading ? (
            <>
              <div className='ingredients-container'>
                <input type="search" className="search-bar" aria-label="search" placeholder={`Search for ingredient`} ref={inputRef} onInput={handleSearchInputChange} />

                {searchValue.length > 0 && (
                  <div className="ingredients-list">

                    {searchIngredients.map((ingredient, index) => (
                      <div key={index} className="ingredient-item">
                        <p className='ingredient-link' onClick={addIngredient}>
                          {ingredient.strIngredient}
                        </p>
                      </div>
                    ))}

                  </div>
                )}

              </div>

              {filteredIngredients.length > 0 && (
                <div className="ingredients-list-clicked">

                  {filteredIngredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-clicked">
                      {ingredient}
                      <button className='btn-remove-ingredient' onClick={() => removeIngredient(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                  ))}

                </div>
              )}

              {isLoadingMeals && filteredIngredients.length !== 0 && myMealsFromIngredients && myMealsFromIngredients.length > 0 && (
                <div className="meal-list">

                  {myMealsFromIngredients.map((meal, index) => (
                    <div key={index} className="ingredient-meal-container" style={{ backgroundImage: `url(${meal.strMealThumb})` }}>
                      <Link to={`/meal/${meal.strMeal}`} className='meal-link' >
                        {meal.strMeal}
                      </Link>
                    </div>
                  ))}

                </div>
              )}


            </>
          ) : (
            <div className='ingredients-container skeleton-input'>
              <div className="search-bar skeleton skeleton-input"></div>
            </div>
          )}
        </div>

        <div className="masonry-grid">
          <img src={image1} alt="image1" className='img' />
          <img src={image2} alt="image2" className='img' />
          <img src={image3} alt="image3" className='img' />
          <img src={image4} alt="image4" className='img' />
          <img src={image5} alt="image5" className='img' />
          <img src={image6} alt="image6" className='img' />
          <img src={image7} alt="image7" className='img' />
          <img src={image8} alt="image8" className='img' />
          <img src={logo} alt="image9" className='img' />
        </div>
      </div>

    </section>
  );
};


export default Search;