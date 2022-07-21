import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import Search from '../Search';
import './styles/Header-mobile.css';
import Dropdown from '../Dropdown';

const EXPLORE_NATIONALITIES = 'Explore Nationalities';

function Header({ title }) {
  const history = useHistory();

  const [inputSearch, setInputSearch] = useState(false);

  const verifyPage = () => {
    if (
      title === 'Explore'
      || title === 'Explore Foods'
      || title === 'Explore Drinks'
      || title === 'Explore Ingredients'
      || title === EXPLORE_NATIONALITIES
      || title === 'Done Recipes'
      || title === 'Favorite Recipes'
      || title === 'Profile'
    ) {
      return false;
    }
    return true;
  };

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleSearchClick = () => {
    setInputSearch(!inputSearch);
  };

  return (
    <>
      <header>
        <button
          type="button"
          alt="profile-button"
          className="profile-button"
          onClick={ handleProfileClick }
        >
          <Icon icon="bx:user" />
        </button>
        <h1>{title}</h1>
        {verifyPage() ? (
          <button
            type="button"
            alt="search-button"
            className="search-button"
            onClick={ handleSearchClick }
          >
            <Icon icon="icons8:search" />
          </button>
        ) : (
          ''
        )}
      </header>
      {inputSearch && title !== EXPLORE_NATIONALITIES && <Search />}
      {title === EXPLORE_NATIONALITIES && <Dropdown />}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  history: PropTypes.node,
  push: PropTypes.func,
}.isRequired;

export default Header;
