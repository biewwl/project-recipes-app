import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import lS from "manager-local-storage";
import { fetchFoodDetails } from "../../helpers/fetchFoods";
import RecommendationCard from "../../components/RecommendationCard";
import checkLS from "../../helpers/checkLocalStorage";
import getIngredients from "../../helpers/getAllIngredients";
import { getFoodProgress } from "../../helpers/getRecipeProgress";
import favoriteRecipe from "../../helpers/favoriteRecipe";
import "./styles/FoodDetails.css";

const copy = require("clipboard-copy");

function FoodDetails({
  match: {
    params: { id },
  },
}) {
  const history = useHistory();

  const [foodDetails, setFoodDetails] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
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

    const getFoodDetails = async () => {
      const results = await fetchFoodDetails(id);
      setFoodDetails(results);
      const ingredients = getIngredients(results);
      setFoodIngredients(ingredients);
    };
    getFoodDetails();
    setStatusRecipe(getFoodProgress(id));
  }, [id]);

  const changeURL = (url) => url.replace("watch", "embed");

  const handleShare = () => {
    copy(window.location.href);
    setLinkCopied(true);
    const threeThousand = 3000;
    setTimeout(() => setLinkCopied(false), threeThousand);
  };

  const handleFavorite = () => {
    setIsFavorite(favoriteRecipe(foodDetails[0], "food", isFavorite));
  };

  const handleStart = () => {
    history.push(`/foods/${id}/in-progress`);
    const inProgressRecipes = lS("g", "inProgressRecipes");
    lS("s", "inProgressRecipes", {
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
        [id]: [],
      },
    });
  };

  return (
    <article className="food-details">
      {foodDetails.map(
        (
          { strMealThumb, strMeal, strCategory, strInstructions, strYoutube },
          index
        ) => (
          <div key={index}>
            <button
              className="back-button"
              type="button"
              onClick={() => history.push("/foods")}
            >
              <Icon icon="line-md:arrow-small-left" />
            </button>
            <img src={strMealThumb} className="recipe-photo" alt="recipe" />
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
              <h2>{strMeal}</h2>
              <h4>{strCategory}</h4>
            </div>
            <div className="ingredients">
              <ul>
                {foodIngredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <h5>Instructions</h5>
              <p>{strInstructions}</p>
            </div>
            <iframe src={changeURL(strYoutube)} title={strMeal} />
            <RecommendationCard page="foods" />
          </div>
        )
      )}
      {statusRecipe !== "done" && (
        <button
          className="start-recipe-btn"
          type="button"
          onClick={handleStart}
        >
          {statusRecipe === "notStarted" ? "Start Recipe" : "Continue Recipe"}
          <Icon icon="bx:play-circle" />
        </button>
      )}
    </article>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default FoodDetails;
