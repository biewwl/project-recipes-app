import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import lS from "manager-local-storage";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { fetchDrinkDetails } from "../../helpers/fetchDrinks";
import checkLS from "../../helpers/checkLocalStorage";
import getIngredients from "../../helpers/getAllIngredients";
import finishRecipe from "../../helpers/finishRecipe";
import "./styles/DrinkProgress-mobile.css";

const copy = require("clipboard-copy");

function DrinkProgress({
  match: {
    params: { id },
  },
}) {
  const history = useHistory();

  const [drinkDetails, setDrinkDetails] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);
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

    const getDrinkDetails = async () => {
      const results = await fetchDrinkDetails(id);
      setDrinkDetails(results);
      const ingredients = getIngredients(results);
      setDrinkIngredients(ingredients);
    };
    getDrinkDetails();
  }, []);

  useEffect(() => {
    if (
      checkedIngredients.length === drinkIngredients.length &&
      checkedIngredients.length !== 0
    ) {
      setShowFinishButton(true);
    } else {
      setShowFinishButton(false);
    }
  }, [checkedIngredients, drinkIngredients]);

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
          id: drinkDetails[0].idDrink,
          type: "drink",
          nationality: "",
          category: drinkDetails[0].strCategory,
          alcoholicOrNot: drinkDetails[0].strAlcoholic,
          name: drinkDetails[0].strDrink,
          image: drinkDetails[0].strDrinkThumb,
        },
      ];
      lS("s", "favoriteRecipes", newFavorites);
    }
    setIsFavorite(!isFavorite);
  };

  const handleFinish = () => {
    finishRecipe(drinkDetails[0], "drink", id, "cocktails");
    history.push("/done-recipes");
  };

  const handleCheck = ({ target }) => {
    const existInCheckedList = checkedIngredients.some(
      (ingredient) => ingredient === target.name
    );
    const currentChecked = lS("g", "checkedIngredients");
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
    <article className="drink-progress">
      {drinkDetails.map(
        ({ strDrinkThumb, strDrink, strCategory, strInstructions }, index) => (
          <div key={index}>
            <button
              className="back-button"
              type="button"
              onClick={() => history.push(`/drinks/${id}`)}
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
                onClick={favoriteRecipe}
                className="favorite-btn"
              >
                {isFavorite && <Icon icon="line-md:heart-filled" />}
                {!isFavorite && <Icon icon="line-md:heart" />}
              </button>
            </div>
            <div className="title-and-category">
              <h2>{strDrink}</h2>
              <h4>{strCategory}</h4>
            </div>
            <div className="ingredients">
              <ul>
                {drinkIngredients.map((ingredient, i) => (
                  <li key={i} data-testid={`${i}-ingredient-step`}>
                    <label htmlFor={`ingredient-${i}`}>
                      <input
                        className="ingredient"
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
              <p>{strInstructions}</p>
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

export default DrinkProgress;

DrinkProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
