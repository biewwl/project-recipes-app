import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fetchFoods from '../../helpers/fetchFoods';
import fetchDrinks from '../../helpers/fetchDrinks';
import Card from '../Card';
import './styles/RecommendationCard-mobile.css';

function RecommendationCard({ page }) {
  const [fetchResult, setFetchResult] = useState([]);

  useEffect(() => {
    if (page === 'drinks') {
      const getFoods = async () => {
        const results = await fetchFoods('name', '');
        const seis = 6;
        const slicedResults = results.slice(0, seis);
        setFetchResult(slicedResults);
      };
      getFoods();
    } else if (page === 'foods') {
      const getDrinks = async () => {
        const results = await fetchDrinks('name', '');
        const seis = 6;
        const slicedResults = results.slice(0, seis);
        setFetchResult(slicedResults);
      };
      getDrinks();
    }
  }, []);

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
              testid="recomendation-card"
              img={ image }
              index={ index }
              title={ title }
              titleTestId="recomendation-title"
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
