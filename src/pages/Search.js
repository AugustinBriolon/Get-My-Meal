import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [allIngredients, setAllIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const url = 'https://www.themealdb.com/api/json/v1/1/';
  const inputRef = useRef();
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [searchMyIngredientsArray, setSearchMyIngredientsArray] = useState([]);

  useEffect(() => {
    fetch(url + 'list.php?i=list').then(res => res.json()).then(data => {
      setAllIngredients(data.meals);
      setIsLoading(true);
    })
  }, [isLoading, url]);

  const searchMyIngredients = useMemo(() => {
    return allIngredients.filter(ingredient => {
      return ingredient.strIngredient.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [allIngredients, searchValue]);

  const handleSearchInputChange = useCallback(() => {
    setSearchValue(inputRef.current.value);
  }, []);

  const addIngredient = (e) => {
    setFilteredIngredients([...filteredIngredients, e.target.innerText]);
    setSearchMyIngredientsArray([...new Set(filteredIngredients)]);
  }

  const removeIngredient = (index) => {
    const newFilteredIngredients = [...searchMyIngredientsArray];
    newFilteredIngredients.splice(index, 1);
    setSearchMyIngredientsArray(newFilteredIngredients);
  }

  return (
    <section className='section main-container'>
      <h1 className='title-3d'>Search for Ingredient</h1>

      {isLoading ? (
        <>
          <div className='ingredients-container'>
            <input type="search" className="search-bar" ref={inputRef} onInput={handleSearchInputChange} />

            {searchValue.length > 0 && (
              <div className="ingredients-list">

                {searchMyIngredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <p className='ingredient-link' onClick={addIngredient}>
                      {ingredient.strIngredient}
                    </p>
                  </div>
                ))}

              </div>
            )}

          </div>

          {searchMyIngredientsArray.length > 0 && (
            <div className="ingredients-list-clicked">

              {searchMyIngredientsArray.map((ingredient, index) => (
                <div key={index} className="ingredient-clicked">
                  {ingredient}
                  <button className='btn-remove-ingredient' onClick={() => removeIngredient(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
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

    </section>
  );
};


export default Search;