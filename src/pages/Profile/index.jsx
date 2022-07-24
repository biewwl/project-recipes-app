import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import lS from 'manager-local-storage';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './styles/Profile.css';

function Profile() {
  const userEmail = lS('g', 'user') ? lS('g', 'user').email : '';
  const history = useHistory();

  const logout = () => {
    lS('r', ['user', 'mealsToken', 'cocktailsToken',
      'doneRecipes', 'inProgressRecipes', 'favoriteRecipes', 'checkedIngredients']);
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" />
      <section className="profile">
        <h3>{ userEmail }</h3>
        <div>
          <Link
            to="/done-recipes"
          >
            Done Recipes
          </Link>
          <Link
            to="/favorite-recipes"
          >
            Favorite Recipes
          </Link>
        </div>
        <button
          type="button"
          onClick={ logout }
        >
          Logout
        </button>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
