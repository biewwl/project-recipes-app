import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import lS from 'manager-local-storage';
import checkLS from '../../helpers/checkLocalStorage';
import CardDoneFavoriteRecipe from '../../components/CardDoneFavoriteRecipe';
import Header from '../../components/Header';
import './styles/DoneRecipes-mobile.css';

function DoneAndFavoriteRecipes({ page }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    checkLS();
    const getDoneRecipes = lS('g', 'doneRecipes');
    const getFavoriteRecipes = lS('g', 'favoriteRecipes');
    setRecipes(page === 'done' ? getDoneRecipes : getFavoriteRecipes);
  }, []);

  const handleFilter = ({ target }) => {
    const getDoneRecipes = lS('g', 'doneRecipes');
    const getFavoriteRecipes = lS('g', 'favoriteRecipes');
    const resultRecipes = page === 'done' ? getDoneRecipes : getFavoriteRecipes;
    if (target.name === 'all') setRecipes(resultRecipes);
    else {
      setRecipes(resultRecipes.filter((recipe) => recipe.type === target.name));
    }
  };

  return (
    <article className="done-favorites-recipes">
      <Header title={ page === 'done' ? 'Done Recipes' : 'Favorite Recipes' } />
      <section className="filters">
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ handleFilter }
          className="filter-btn"
        >
          All
        </button>
        <button
          type="button"
          name="food"
          data-testid="filter-by-food-btn"
          onClick={ handleFilter }
          className="filter-btn"
        >
          Foods
        </button>
        <button
          type="button"
          name="drink"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
          className="filter-btn"
        >
          Drinks
        </button>
      </section>
      {recipes.map((recipe, i) => (
        <CardDoneFavoriteRecipe
          key={ i }
          { ...recipe }
          index={ i }
          page={ page }
          setRecipes={ setRecipes }
        />
      ))}
    </article>
  );
}

export default DoneAndFavoriteRecipes;

DoneAndFavoriteRecipes.propTypes = {
  page: PropTypes.string,
}.isRequired;
