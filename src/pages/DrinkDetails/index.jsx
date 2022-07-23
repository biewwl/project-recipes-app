import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import lS from "manager-local-storage";
import { fetchDrinkDetails } from "../../helpers/fetchDrinks";
import checkLS from "../../helpers/checkLocalStorage";
import RecommendationCard from "../../components/RecommendationCard";
import "./styles/DrinkDetails-mobile.css";
import getIngredients from "../../helpers/getAllIngredients";
import { getDrinkProgress } from "../../helpers/getRecipeProgress";
import favoriteRecipe from "../../helpers/favoriteRecipe";

const copy = require("clipboard-copy");

function DrinkDetails({
  match: {
    params: { id },
  },
}) {
  const history = useHistory();

  const [drinkDetails, setDrinkDetails] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const [statusRecipe, setStatusRecipe] = useState("notStarted");
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkLS();

    const statusFavoriteRecipe = () => {
      const favoriteRecipes = lS("g", "favoriteRecipes");
      const checkFavorite = favoriteRecipes.some(
        (favorite) => favorite.id === id
      );
      setIsFavorite(checkFavorite);
    };
    statusFavoriteRecipe();

    const getDrinkDetails = async () => {
      const results = await fetchDrinkDetails(id);
      setDrinkDetails(results);
      const ingredients = getIngredients(results);
      setDrinkIngredients(ingredients);
    };
    getDrinkDetails();
    setStatusRecipe(getDrinkProgress(id));
  }, []);

  const handleShare = () => {
    copy(window.location.href);
    setLinkCopied(true);
    const threeThousand = 3000;
    setTimeout(() => setLinkCopied(false), threeThousand);
  };

  const handleFavorite = () => {
    setIsFavorite(favoriteRecipe(drinkDetails[0], "drink", isFavorite));
  };

  const handleStart = () => {
    history.push(`/drinks/${id}/in-progress`);
    const inProgressRecipes = lS("g", "inProgressRecipes");
    lS("s", "inProgressRecipes", {
      ...inProgressRecipes,
      cocktails: {
        ...inProgressRecipes.cocktails,
        [id]: [],
      },
    });
  };

  return (
    <article className="drink-details">
      {drinkDetails.map(
        ({ strDrinkThumb, strDrink, strAlcoholic, strInstructions }, index) => (
          <div key={index}>
            <button
              className="back-button"
              type="button"
              onClick={() => history.push("/drinks")}
            >
              <Icon icon="line-md:arrow-small-left" />
            </button>
            <img src={strDrinkThumb} className="recipe-photo" alt="recipe" />
            <div className="share-and-favorites">
              <button type="button" onClick={handleShare} className="share-btn">
                {linkCopied && <Icon icon="line-md:confirm" />}
                {!linkCopied && <Icon icon="line-md:external-link" />}
              </button>
              <button
                type="button"
                onClick={handleFavorite}
                className="favorite-btn"
              >
                {isFavorite && <Icon icon="line-md:heart-filled" />}
                {!isFavorite && <Icon icon="line-md:heart" />}
              </button>
            </div>
            <div className="title-and-category">
              <h2>{strDrink}</h2>
              <h4>{strAlcoholic}</h4>
            </div>
            <div className="ingredients">
              <ul>
                {drinkIngredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <h5>Instructions</h5>
              <p>{strInstructions}</p>
            </div>
            <RecommendationCard page="drinks" />
          </div>
        )
      )}
      {statusRecipe !== "done" && (
        <button
          className="start-recipe-btn"
          type="button"
          onClick={handleStart}
        >
          <span>
            {statusRecipe === "notStarted" ? "Start Recipe" : "Continue Recipe"}
          </span>
          <Icon icon="bx:play-circle" />
        </button>
      )}
    </article>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default DrinkDetails;
