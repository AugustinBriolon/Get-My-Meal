import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [allIngredients, setAllIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = 'https://www.themealdb.com/api/json/v1/1/';
  const inputRef = useRef();

  useEffect(() => {
    fetch(url + 'list.php?i=list').then(res => res.json()).then(data => {
      setAllIngredients(data.meals);
      setIsLoading(true);
    })
  }, [isLoading, url]);


  const filtreIngrdients = () => {
    const searchValue = inputRef.current.value;
    const filteredIngredients = allIngredients.filter(ingredient => {
      return ingredient.strIngredient.toLowerCase().includes(searchValue.toLowerCase());
    });
    setAllIngredients(filteredIngredients);
  };


  return (
    <section className='section main-container'>
      <h1 className='title-3d'>Search for Ingredient</h1>

      {isLoading ? (
        <div className='ingredients-container'>
          <input type="search" className="search-bar" ref={inputRef} onInput={filtreIngrdients} />

          {inputRef.current && inputRef.current.value.length > 0 && (
          <div className="ingredients">

            {allIngredients.map((ingredient, index) => (
              <div key={index} className="ingredient-item">
                <Link to={`/${ingredient.strIngredient}`} className='ingredient-link' >
                  {ingredient.strIngredient}
                </Link>
              </div>
            ))}

          </div>
          )}

        </div>
      ) : (
        <p>Loading...</p>
      )}
      
    </section>
  );
};


export default Search;