import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './styles/Explore.css';

function Explore() {
  const history = useHistory();

  return (
    <>
      <Header title="Explore" />
      <article className="explore">
        <button
          type="button"
          onClick={ () => history.push('/explore/foods') }
          className="explore-foods"
        >
          <div className="food-img" />
          <span>Explore Foods</span>
        </button>
        <button
          type="button"
          onClick={ () => history.push('/explore/drinks') }
          className="explore-drinks"
        >
          <div className="drink-img" />
          <span>Explore Drinks</span>
        </button>
      </article>
      <Footer />
    </>
  );
}

export default Explore;
