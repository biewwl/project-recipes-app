import lS from 'manager-local-storage';

const getFoodProgress = (id) => {
  const doneRecipes = lS('g', 'doneRecipes');
  const inProgressRecipes = lS('g', 'inProgressRecipes');
  const statusLocalStorage = doneRecipes.some((recipe) => recipe.id === id);
  const { meals } = inProgressRecipes;
  const mealsKeys = Object.keys(meals);
  const statusMealsKeys = mealsKeys.some((mealID) => mealID === id);
  if (statusMealsKeys) return 'inProgress';
  if (statusLocalStorage) return 'done';
  return 'notStarted';
};

const getDrinkProgress = (id) => {
  const doneRecipes = lS('g', 'doneRecipes');
  const inProgressRecipes = lS('g', 'inProgressRecipes');
  const statusLocalStorage = doneRecipes.some((recipe) => recipe.id === id);
  const { cocktails } = inProgressRecipes;
  const drinksKeys = Object.keys(cocktails);
  const statusDrinksKeys = drinksKeys.some((drinkID) => drinkID === id);
  if (statusDrinksKeys) return ('inProgress');
  if (statusLocalStorage) return ('done');
  return 'notStarted';
};

export { getFoodProgress, getDrinkProgress };
