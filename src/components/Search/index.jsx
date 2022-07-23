import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import fetchFoods from '../../helpers/fetchFoods';
import fetchDrinks from '../../helpers/fetchDrinks';
import RecipesContext from '../../context/RecipesContext';
import './styles/Search-mobile.css';

function Search() {
  const history = useHistory();
  const { setFetchResult } = useContext(RecipesContext);
  const [type, setType] = useState('');
  const [query, setQuery] = useState('');

  const handleChangeType = ({ target }) => {
    setType(target.value);
  };

  const handleChangeQuery = ({ target }) => {
    if (type === 'firstLetter' && target.value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      setQuery(target.value);
    }
  };

  const handleSearch = async () => {
    if (history.location.pathname === '/foods') {
      const result = await fetchFoods(type, query);
      if (result.length > 0) {
        setFetchResult(result);
        if (result.length === 1) {
          history.push(`/foods/${result[0].idMeal}`);
        }
      }
    }
    if (history.location.pathname === '/drinks') {
      const result = await fetchDrinks(type, query);
      if (result.length > 0) {
        setFetchResult(result);
        if (result.length === 1) {
          history.push(`/drinks/${result[0].idDrink}`);
        }
      }
    }
  };

  return (
    <section className="search">
      <input
        type="search"
        value={ query }
        onChange={ handleChangeQuery }
        placeholder="Search for a recipe..."
      />

      <label htmlFor="ingredient">
        <input
          id="ingredient"
          type="radio"
          name="radio-input"
          value="ingredient"
          onChange={ handleChangeType }
        />
        Ingredients
      </label>
      <label htmlFor="name">
        <input
          id="name"
          type="radio"
          name="radio-input"
          value="name"
          onChange={ handleChangeType }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          id="first-letter"
          type="radio"
          name="radio-input"
          value="firstLetter"
          onChange={ handleChangeType }
        />
        First Letter
      </label>

      <button
        type="button"
        onClick={ handleSearch }
        disabled={ type === '' || query === '' }
      >
        Search
      </button>
    </section>
  );
}

export default Search;
