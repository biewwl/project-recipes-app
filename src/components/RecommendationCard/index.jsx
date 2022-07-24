import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchFoods from '../../helpers/fetchFoods';
import fetchDrinks from '../../helpers/fetchDrinks';
import Card from '../Card';
import './styles/RecommendationCard.css';

function RecommendationCard({ page }) {
  const [fetchResult, setFetchResult] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const results = await page === 'foods' ?
      await fetchDrinks('name', '') :
      await fetchFoods('name', '');
      const cardsAmount = 6;
      const slicedResults = results.slice(0, cardsAmount);
      setFetchResult(slicedResults);
    }
    getRecipes();
  }, [page]);

  return (
    <section className="recommendation-card">
      {fetchResult.map((recipe, index) => {
        const image = page === 'drinks'
          ? recipe.strMealThumb
          : recipe.strDrinkThumb;
        const title = page === 'drinks'
          ? recipe.strMeal
          : recipe.strDrink;
        const id = page === 'drinks'
          ? recipe.idMeal
          : recipe.idDrink;
        const link = page === 'drinks'
          ? '/foods'
          : '/drinks';
        return (
          <Link key={ index } to={ `${link}/${id}` }>
            <Card
              img={ image }
              title={ title }
            />
          </Link>
        );
      })}
    </section>
  );
}

RecommendationCard.propTypes = {
  recipe: PropTypes.string,
}.isRequired;

export default RecommendationCard;
