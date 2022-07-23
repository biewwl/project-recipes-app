import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import lS from "manager-local-storage";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { fetchFoodDetails } from "../../helpers/fetchFoods";
import checkLS from "../../helpers/checkLocalStorage";
import getIngredients from "../../helpers/getAllIngredients";
import finishRecipe from "../../helpers/finishRecipe";
import "./styles/FoodProgress-mobile.css";

const copy = require("clipboard-copy");

function FoodProgress({
  match: {
    params: { id },
  },
}) {
  const history = useHistory();

  const [foodDetails, setFoodDetails] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [showFinishButton, setShowFinishButton] = useState(false);

  useEffect(() => {
    checkLS();
    if (lS("g", "checkedIngredients")[id]) {
      setCheckedIngredients(lS("g", "checkedIngredients")[id]);
    }
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
  }, []);

  useEffect(() => {
    if (
      checkedIngredients.length === foodIngredients.length &&
      checkedIngredients.length !== 0
    ) {
      setShowFinishButton(true);
    } else {
      setShowFinishButton(false);
    }
  }, [checkedIngredients, foodIngredients]);

  const handleShare = () => {
    copy(window.location.href.replace("/in-progress", ""));
    setLinkCopied(true);
    const threeThousand = 3000;
    setTimeout(() => setLinkCopied(false), threeThousand);
  };

  const favoriteRecipe = () => {
    const favorites = lS("g", "favoriteRecipes");
    if (isFavorite) {
      const newFavorites = favorites.filter((favorite) => favorite.id !== id);
      lS("s", "favoriteRecipes", newFavorites);
    } else {
      const newFavorites = [
        ...favorites,
        {
          id: foodDetails[0].idMeal,
          type: "food",
          nationality: foodDetails[0].strArea,
          category: foodDetails[0].strCategory,
          alcoholicOrNot: "",
          name: foodDetails[0].strMeal,
          image: foodDetails[0].strMealThumb,
        },
      ];
      lS("s", "favoriteRecipes", newFavorites);
    }
    setIsFavorite(!isFavorite);
  };

  const handleFinish = () => {
    history.push("/done-recipes");
    finishRecipe(foodDetails[0], "food", id, "meals");
  };

  const handleCheck = ({ target }) => {
    const currentChecked = lS("g", "checkedIngredients");
    const existInCheckedList = checkedIngredients.some(
      (ingredient) => ingredient === target.name
    );
    if (existInCheckedList) {
      const newCheckedList = checkedIngredients.filter(
        (ingredient) => ingredient !== target.name
      );
      setCheckedIngredients(newCheckedList);
      lS("s", "checkedIngredients", {
        ...currentChecked,
        [id]: newCheckedList,
      });
    } else {
      const newCheckedList = [...checkedIngredients, target.name];
      setCheckedIngredients(newCheckedList);
      lS("s", "checkedIngredients", {
        ...currentChecked,
        [id]: newCheckedList,
      });
    }
  };

  const isChecked = (ingredientName) =>
    checkedIngredients.some((ingredient) => ingredient === ingredientName);

  return (
    <article className="food-progress">
      {foodDetails.map(
        ({ strMealThumb, strMeal, strCategory, strInstructions }, index) => (
          <div key={index}>
            <button
              className="back-button"
              type="button"
              onClick={() => history.push(`/foods/${id}`)}
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
                onClick={favoriteRecipe}
                className="favorite-btn"
              >
                {isFavorite && <Icon icon="line-md:heart-filled" />}
                {!isFavorite && <Icon icon="line-md:heart" />}
              </button>
            </div>
            <div className="title-and-category">
              <h2 data-testid="recipe-title">{strMeal}</h2>
              <h4 data-testid="recipe-category">{strCategory}</h4>
            </div>
            <div className="ingredients">
              <ul>
                {foodIngredients.map((ingredient, i) => (
                  <li key={i} data-testid={`${i}-ingredient-step`}>
                    <label htmlFor={`ingredient-${i}`}>
                      <input
                        name={ingredient}
                        onChange={handleCheck}
                        checked={isChecked(ingredient)}
                        type="checkbox"
                        id={`ingredient-${i}`}
                      />
                      {ingredient}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="instructions">
              <h5>Instructions</h5>
              <p data-testid="instructions">{strInstructions}</p>
            </div>
          </div>
        )
      )}
      {showFinishButton && (
        <button
          className="finish-recipe-btn"
          type="button"
          onClick={handleFinish}
        >
          Finish Recipe
        </button>
      )}
    </article>
  );
}

export default FoodProgress;

FoodProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
