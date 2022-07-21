import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import fetchIngredients from '../../helpers/fetchIngredients';
import RecipesContext from '../../context/RecipesContext';
import fetchDrinks from '../../helpers/fetchDrinks';
import './styles/DrinksExploreIngredients-mobile.css';

function DrinksExploreIngredients() {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const { setFetchResult } = useContext(RecipesContext);
  const history = useHistory();

  const getIngredientName = async (name) => {
    history.push('/drinks');
    const result = await fetchDrinks('ingredient', name);
    setFetchResult(result);
  };

  useEffect(() => {
    const getResults = async () => {
      const results = await fetchIngredients('drink');
      setDrinkIngredients(results);
    };
    getResults();
  }, []);
  return (
    <div>
      <Header title="Explore Ingredients" />
      <article className="drinks-explore-ingredients">
        {drinkIngredients.map(({ name, image }, index) => (
          <button
            type="button"
            key={ index }
            onClick={ () => getIngredientName(name) }
          >
            <Card
              key={ `${index}-${name}` }
              img={ image }
              title={ name }
              index={ index }
              testid="ingredient-card"
              titleTestId="card-name"
            />
          </button>
        ))}
      </article>
      <Footer />
    </div>
  );
}

export default DrinksExploreIngredients;
