import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchRandomDrink } from '../../helpers/fetchDrinks';
import './styles/DrinksExplore.css';
import './styles/DrinksExplore-mobile.css';

function DrinksExplore() {
  const history = useHistory();

  const handleRandomDrink = async () => {
    const randomDrinkId = await fetchRandomDrink();
    history.push(`/drinks/${randomDrinkId}`);
  };

  return (
    <>
      <Header title="Explore Drinks" />
      <article className="drinks-explore">
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
        >
          <div className="image-ingredient" />
          <span>By Ingredient</span>
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ handleRandomDrink }
        >
          <div className="image-surprise" />
          <span>Surprise me!</span>
        </button>
      </article>
      <Footer />
    </>
  );
}

export default DrinksExplore;
