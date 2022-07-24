import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import lS from "manager-local-storage";
import { Icon } from "@iconify/react";
import "./styles/CardDoneRecipe.css";

const copy = require("clipboard-copy");

function CardDoneFavoriteRecipe({
  id,
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
    const link =
      page === "done"
        ? window.location.href.replace(
            "done-recipes",
            `${type === "food" ? "foods" : "drinks"}/${id}`
          )
        : window.location.href.replace(
            "favorite-recipes",
            `${type === "food" ? "foods" : "drinks"}/${id}`
          );
    copy(link);
    setLinkCopied(true);
    const threeThousand = 3000;
    setTimeout(() => setLinkCopied(false), threeThousand);
  };

  const favoriteRecipe = () => {
    const favorites = lS("g", "favoriteRecipes");
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    lS("s", "favoriteRecipes", newFavorites);
    setRecipes(newFavorites);
  };

  return (
    <section className="card-done-recipe">
      <section>
        <Link to={type === "food" ? `/foods/${id}` : `/drinks/${id}`}>
          <img src={image} alt="" />
          <section>
            <h1>{name}</h1>
            <span className="done-favorite-category">
              {type === "food"
                ? `${nationality} - ${category}`
                : alcoholicOrNot}
            </span>
            {page === 'done' && <span>{doneDate}</span>}
            <section className="tags-section">
              {page === "done" &&
                tags.map((tag, i) => <span key={i}>{tag}</span>)}
            </section>
          </section>
        </Link>
        <section className="buttons">
          <button
            type="button"
            onClick={handleShare}
            className="share-btn"
          >
            {!linkCopied && <Icon icon="line-md:external-link" />}
            {linkCopied && <span>Link copied!</span>}
          </button>
          {page === "favorite" && (
            <button
              type="button"
              onClick={favoriteRecipe}
              className="favorite-btn"
            >
              <Icon icon="line-md:heart-filled" />
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
