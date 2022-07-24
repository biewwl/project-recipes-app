import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Card from '../../components/Card';
import fetchIngredients from '../../helpers/fetchIngredients';
import fetchFoods from '../../helpers/fetchFoods';
import RecipesContext from '../../context/RecipesContext';
import './styles/FoodExploreIngredients.css';

function FoodExploreIngredients() {
  const [foodIngredients, setFoodIngredients] = useState([]);
  const { setFetchResult } = useContext(RecipesContext);
  const history = useHistory();

  const getIngredientName = async (name) => {
    history.push('/foods');
    const result = await fetchFoods('ingredient', name);
    setFetchResult(result);
  };

  useEffect(() => {
    const getResults = async () => {
      const results = await fetchIngredients('food');
      setFoodIngredients(results);
    };
    getResults();
  }, []);

  return (
    <div>
      <Header title="Explore Ingredients" />
      <article className="food-explore-ingredients">
        {foodIngredients.map(({ name, image }, index) => (
          <button type="button" key={ index } onClick={ () => getIngredientName(name) }>
            <Card
              key={ `${index}-${name}` }
              img={ image }
              title={ name }
            />
          </button>
        ))}
      </article>
      <Footer />
    </div>
  );
}

export default FoodExploreIngredients;
