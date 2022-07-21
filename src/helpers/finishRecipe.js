import lS from 'manager-local-storage';
import getCurrentDate from './getCurrentDate';

function finishRecipe(infos, type, id, localStorageKey) {
  const doneRecipes = lS('g', 'doneRecipes');
  const inProgressRecipes = lS('g', 'inProgressRecipes');
  const tags = infos.strTags
    ? infos.strTags.split(',')
    : [];
  const currentRecipeInfo = {
    id,
    type,
    nationality: type === 'food' ? infos.strArea : '',
    category: type === 'food' ? infos.strCategory : '',
    alcoholicOrNot: type === 'food' ? '' : infos.strAlcoholic,
    name: type === 'food' ? infos.strMeal : infos.strDrink,
    image: type === 'food' ? infos.strMealThumb : infos.strDrinkThumb,
    doneDate: getCurrentDate(),
    tags,
  };
  const newProgressCocktails = { ...inProgressRecipes.cocktails };
  delete newProgressCocktails[id];
  if (doneRecipes.every((recipe) => recipe.id !== id)) {
    lS('s', 'doneRecipes', [...doneRecipes, currentRecipeInfo]);
    lS('s', 'inProgressRecipes', {
      ...inProgressRecipes,
      [localStorageKey]: newProgressCocktails,
    });
  }
}

export default finishRecipe;
