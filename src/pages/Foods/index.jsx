import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipesContext from '../../context/RecipesContext';
import Card from '../../components/Card';
import fetchFoods, {
  fetchFoodsByCategory,
  fetchFoodsCategories,
} from '../../helpers/fetchFoods';
import './styles/Foods.css';
import './styles/Foods-mobile.css';

function Foods({ page }) {
  const { setFetchResult, fetchResult } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const getFoods = async () => {
      const results = await fetchFoods('name', '');

      const isDrink = fetchResult[0] ? fetchResult[0].idDrink : false;

      if (fetchResult.length === 0 || isDrink) {
        setFetchResult(results);
      }
    };
    const getCategories = async () => {
      const results = await fetchFoodsCategories();
      const foodsCategories = results.map((category) => category.strCategory);
      const five = 5;
      const fiveCategories = foodsCategories.slice(0, five);
      setCategories(fiveCategories);
    };
    getCategories();
    getFoods();
  }, []);

  const filterByCategory = async ({ target }) => {
    if (selectedCategory !== target.name) {
      const result = await fetchFoodsByCategory(target.name);
      setFetchResult(result);
      setSelectedCategory(target.name);
    } else {
      const results = await fetchFoods('name', '');
      setFetchResult(results);
      setSelectedCategory('');
    }
  };

  const filterAllCategories = async () => {
    const results = await fetchFoods('name', '');
    setFetchResult(results);
    setSelectedCategory('');
  };

  return (
    <div>
      <article className="foods">
        <Header title={ page } />
        {page !== 'Explore Nationalities' && (
          <h1 className="desktop-title-page">Foods</h1>
        )}
        { page !== 'Explore Nationalities' && (
          <section className="categories">
            <button
              type="button"
              onClick={ filterAllCategories }
            >
              All Categories
            </button>
            {categories.map((category, i) => (
              <button
                key={ i }
                type="button"
                onClick={ filterByCategory }
                name={ category }
              >
                {category}
              </button>
            ))}
          </section>
        )}
        <section className="recipes">
          {fetchResult.map(({ strMealThumb, strMeal, idMeal }, index) => (
            <Link key={ index } to={ `/foods/${idMeal}` }>
              <Card
                img={ strMealThumb }
                title={ strMeal }
              />
            </Link>
          ))}
        </section>
      </article>
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  page: PropTypes.string,
}.isRequired;

export default Foods;
