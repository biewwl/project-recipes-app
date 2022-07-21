import React, { useState, useEffect, useContext } from 'react';
import './styles/Dropdown-mobile.css';
import fetchFoods, { fetchByNationality, fetchByArea } from '../../helpers/fetchFoods';
import RecipesContext from '../../context/RecipesContext';

const Dropdown = () => {
  const [nation, setNation] = useState([]);
  const { setFetchResult } = useContext(RecipesContext);

  const filterAllCategories = async () => {
    const results = await fetchFoods('name', '');
    setFetchResult(results);
  };

  const handleSearch = async ({ target }) => {
    if (target.value === 'All') {
      filterAllCategories();
    } else {
      const result = await fetchByArea(target.value);
      const doze = 12;
      setFetchResult(result.slice(0, doze));
    }
  };

  useEffect(() => {
    const getNationality = async () => {
      const resultFetch = await fetchByNationality();
      setNation(resultFetch);
    };
    getNationality();
  }, []);

  return (
    <section>
      <select data-testid="explore-by-nationality-dropdown" onChange={ handleSearch }>
        <option data-testid="All-option">All</option>
        {nation.map((area, index) => (
          <option
            key={ index }
            data-testid={ `${area}-option` }
            value={ area }
            onClick={ handleSearch }
          >
            {area}
          </option>))}
      </select>
    </section>

  );
};

export default Dropdown;
