import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import lS from "manager-local-storage";
import checkLS from "../../helpers/checkLocalStorage";
import CardDoneFavoriteRecipe from "../../components/CardDoneFavoriteRecipe";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./styles/DoneRecipes.css";
import "./styles/DoneRecipes-mobile.css";

function DoneAndFavoriteRecipes({ page }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    checkLS();
    const getDoneRecipes = lS("g", "doneRecipes");
    const getFavoriteRecipes = lS("g", "favoriteRecipes");
    setRecipes(page === "done" ? getDoneRecipes : getFavoriteRecipes);
  }, [page]);

  const handleFilter = ({ target }) => {
    const getDoneRecipes = lS("g", "doneRecipes");
    const getFavoriteRecipes = lS("g", "favoriteRecipes");
    const resultRecipes = page === "done" ? getDoneRecipes : getFavoriteRecipes;
    if (target.name === "all") setRecipes(resultRecipes);
    else {
      setRecipes(resultRecipes.filter((recipe) => recipe.type === target.name));
    }
  };

  return (
    <article className="done-favorites-recipes">
      <Header title={page === "done" ? "Done Recipes" : "Favorite Recipes"} />
      <h1 className="desktop-title-page">
        {page === "done" ? "Done Recipes" : "Favorite Recipes"}
      </h1>
      <section className="filters">
        <button
          type="button"
          name="all"
          onClick={handleFilter}
          className="filter-btn"
        >
          All
        </button>
        <button
          type="button"
          name="food"
          onClick={handleFilter}
          className="filter-btn"
        >
          Foods
        </button>
        <button
          type="button"
          name="drink"
          onClick={handleFilter}
          className="filter-btn"
        >
          Drinks
        </button>
      </section>
      <section className="done-favorites">
        {recipes.map((recipe, i) => (
          <CardDoneFavoriteRecipe
            key={i}
            {...recipe}
            index={i}
            page={page}
            setRecipes={setRecipes}
          />
        ))}
      </section>
      <Footer />
    </article>
  );
}

export default DoneAndFavoriteRecipes;

DoneAndFavoriteRecipes.propTypes = {
  page: PropTypes.string,
}.isRequired;
