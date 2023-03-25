import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [allIngredients, setAllIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const url = 'https://www.themealdb.com/api/json/v1/1/';
  const inputRef = useRef();

  useEffect(() => {
    fetch(url + 'list.php?i=list').then(res => res.json()).then(data => {
      setAllIngredients(data.meals);
      setIsLoading(true);
    })
  }, [isLoading, url]);

  const filteredIngredients = useMemo(() => {
    return allIngredients.filter(ingredient => {
      return ingredient.strIngredient.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [allIngredients, searchValue]);

  const handleSearchInputChange = useCallback(() => {
    setSearchValue(inputRef.current.value);
  }, []);
  return (
    <section className='section main-container'>
      <h1 className='title-3d'>Search for Ingredient</h1>

      {isLoading ? (
        <div className='ingredients-container'>
        <input type="search" className="search-bar" ref={inputRef} onInput={handleSearchInputChange} />

        {searchValue.length > 0 && (
          <div className="ingredients">

            {filteredIngredients.map((ingredient, index) => (
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
        <div className='ingredients-container skeleton-input'>
          <div className="search-bar skeleton skeleton-input"></div>
        </div>
      )}

    </section>
  );
};


export default Search;