import React from "react";
import { useHistory } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchRandomFood } from "../../helpers/fetchFoods";
import "./styles/FoodsExplore.css";

function FoodsExplore() {
  const history = useHistory();

  const handleRandomFood = async () => {
    const randomFoodId = await fetchRandomFood();
    history.push(`/foods/${randomFoodId}`);
  };

  return (
    <>
      <Header title="Explore Foods" />
      <article className="foods-explore">
        <button
          type="button"
          onClick={() => history.push("/explore/foods/ingredients")}
        >
          <div className="image-ingredient" />
          <span>By Ingredient</span>
        </button>
        <button
          type="button"
          onClick={() => history.push("/explore/foods/nationalities")}
        >
          <div className="image-nationality" />
          <span>By Nationality</span>
        </button>
        <button type="button" onClick={handleRandomFood}>
          <div className="image-surprise" />
          <span>Surprise me!</span>
        </button>
      </article>
      <Footer />
    </>
  );
}

export default FoodsExplore;
