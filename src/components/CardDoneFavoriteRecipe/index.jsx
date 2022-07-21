import React, { useState } from 'react';
import PropTypes from 'prop-types';
import lS from 'manager-local-storage';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import './styles/CardDoneRecipe-mobile.css';
import like from '../../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function CardDoneFavoriteRecipe({
  id,
  index,
  image,
  category,
  nationality,
  name,
  doneDate,
  tags,
  type,
  alcoholicOrNot,
  page,
  setRecipes,
}) {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleShare = () => {
    const link = page === 'done'
      ? window.location.href.replace(
        'done-recipes',
        `${type === 'food' ? 'foods' : 'drinks'}/${id}`,
      )
      : window.location.href.replace(
        'favorite-recipes',
        `${type === 'food' ? 'foods' : 'drinks'}/${id}`,
      );
    copy(link);
    setLinkCopied(true);
    const threeThousand = 3000;
    setTimeout(() => setLinkCopied(false), threeThousand);
  };

  const favoriteRecipe = () => {
    const favorites = lS('g', 'favoriteRecipes');
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    lS('s', 'favoriteRecipes', newFavorites);
    setRecipes(newFavorites);
  };

  return (
    <section className="card-done-recipe">
      <section>
        <Link to={ type === 'food' ? `/foods/${id}` : `/drinks/${id}` }>
          <img src={ image } alt="" data-testid={ `${index}-horizontal-image` } />
          <section>
            <h1 data-testid={ `${index}-horizontal-name` }>{name}</h1>
            <span
              className="done-favorite-category"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot}
            </span>
            <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>
            <section className="tags-section">
              {page === 'done'
                && tags.map((tag, i) => (
                  <span key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
                    {tag}
                  </span>
                ))}
            </section>
          </section>
        </Link>
        <section className="buttons">
          <button
            src={ shareIcon }
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ handleShare }
            className="share-btn"
          >
            {linkCopied ? <span>Link copied!</span> : <span>Share</span>}
          </button>
          {page === 'favorite' && (
            <button
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ like }
              type="button"
              onClick={ favoriteRecipe }
              className="favorite-btn"
            >
              <img src={ like } alt="isFavorite" />
            </button>
          )}
        </section>
      </section>
    </section>
  );
}

export default CardDoneFavoriteRecipe;

CardDoneFavoriteRecipe.propTypes = {
  index: PropTypes.number,
  image: PropTypes.string,
  category: PropTypes.string,
  nationality: PropTypes.string,
  name: PropTypes.string,
  doneDate: PropTypes.string,
  tags: PropTypes.shape({
    push: PropTypes.func,
  }),
  type: PropTypes.string,
  alcoholicOrNot: PropTypes.string,
  page: PropTypes.string,
}.isRequired;
