import { Icon } from '@iconify/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Footer.css';
import './styles/Footer-mobile.css';

const Footer = () => {
  const history = useHistory();

  return (
    <footer>
      <button
        className="foods-button"
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <Icon icon="fluent:food-pizza-20-regular" />
        <span>Foods</span>
      </button>
      <div className="container-explore">
        <button
          className="explore-button"
          type="button"
          onClick={ () => history.push('/explore') }
        >
          <Icon icon="eos-icons:compass" />
        </button>
      </div>
      <button
        className="drinks-button"
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <Icon icon="fluent:drink-margarita-20-regular" />
        <span>Drinks</span>
      </button>
    </footer>
  );
};

export default Footer;
