import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipesContext from '../../context/RecipesContext';
import Card from '../../components/Card';
import fetchDrinks, {
  fetchDrinksByCategory,
  fetchDrinksCategories,
} from '../../helpers/fetchDrinks';
import './styles/Drinks-mobile.css';

function Drinks() {
  const { setFetchResult, fetchResult } = useContext(RecipesContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const getDrinks = async () => {
      const results = await fetchDrinks('name', '');

      const isMeal = fetchResult[0] ? fetchResult[0].idMeal : false;

      if (fetchResult.length === 0 || isMeal) {
        setFetchResult(results);
      }
    };
    const getCategories = async () => {
      const results = await fetchDrinksCategories();
      const drinksCategories = results.map((category) => category.strCategory);
      const five = 5;
      const fiveCategories = drinksCategories.slice(0, five);
      setCategories(fiveCategories);
    };
    getCategories();
    getDrinks();
  }, []);

  const filterByCategory = async ({ target }) => {
    if (selectedCategory !== target.name) {
      const result = await fetchDrinksByCategory(target.name);
      setFetchResult(result);
      setSelectedCategory(target.name);
    } else {
      const results = await fetchDrinks('name', '');
      setFetchResult(results);
      setSelectedCategory('');
    }
  };

  const filterAllCategories = async () => {
    const results = await fetchDrinks('name', '');
    setFetchResult(results);
    setSelectedCategory('');
  };

  return (
    <div>
      <article className="drinks">
        <Header title="Drinks" />
        <section className="categories">
          <button
            className="btn btn-success"
            type="button"
            onClick={ filterAllCategories }
          >
            All Categories
          </button>
          {categories.map((category, i) => (
            <button
              className="btn btn-primary"
              key={ i }
              type="button"
              onClick={ filterByCategory }
              name={ category }
            >
              {category}
            </button>
          ))}
        </section>
        {fetchResult.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
          <Link key={ index } to={ `drinks/${idDrink}` }>
            <Card
              img={ strDrinkThumb }
              title={ strDrink }
            />
          </Link>
        ))}
      </article>
      <Footer />
    </div>
  );
}

export default Drinks;
