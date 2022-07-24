import React from "react";
import { Route, Switch } from "react-router-dom";
import RecipesProvider from "./context/RecipesProvider";
import Login from "./pages/Login";
import Foods from "./pages/Foods";
import Drinks from "./pages/Drinks";
import Explore from "./pages/Explore";
import FoodsExplore from "./pages/FoodsExplore";
import DrinksExplore from "./pages/DrinksExplore";
import FoodExploreIngredients from "./pages/FoodExploreIngredients";
import DrinksExploreIngredients from "./pages/DrinksExploreIngredients";
import Profile from "./pages/Profile";
import DoneAndFavoriteRecipes from "./pages/DoneAndFavoriteRecipes";
import DrinkDetails from "./pages/DrinkDetails";
import FoodDetails from "./pages/FoodDetails";
import DrinkProgress from "./pages/DrinkProgress";
import FoodProgress from "./pages/FoodProgress";
import NotFound from "./pages/NotFound";
import "./App.css";
import "./colors/colors.css";

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" render={(props) => <Login {...props} />} />
        <Route exact path="/foods">
          <Foods page="Foods" />
        </Route>
        <Route exact path="/drinks" component={Drinks} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/explore/foods" component={FoodsExplore} />
        <Route exact path="/explore/drinks" component={DrinksExplore} />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={FoodExploreIngredients}
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={DrinksExploreIngredients}
        />
        <Route exact path="/explore/foods/nationalities">
          <Foods page="Explore Nationalities" />
        </Route>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/done-recipes">
          <DoneAndFavoriteRecipes page="done" />
        </Route>
        <Route exact path="/favorite-recipes">
          <DoneAndFavoriteRecipes page="favorite" />
        </Route>
        <Route exact path="/foods/:id" component={FoodDetails} />
        <Route exact path="/drinks/:id" component={DrinkDetails} />
        <Route exact path="/foods/:id/in-progress" component={FoodProgress} />
        <Route exact path="/drinks/:id/in-progress" component={DrinkProgress} />
        <Route path="*" component={NotFound} />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
