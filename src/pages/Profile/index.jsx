import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import lS from 'manager-local-storage';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './styles/Profile-mobile.css';

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
        <h3 data-testid="profile-email">{ userEmail }</h3>
        <div>
          <Link
            to="/done-recipes"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </Link>
          <Link
            to="/favorite-recipes"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </Link>
        </div>
        <button
          type="button"
          data-testid="profile-logout-btn"
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
