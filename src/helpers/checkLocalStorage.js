import lS from 'manager-local-storage';

const checkLS = () => {
  const getLocalStorage = lS('g', 'doneRecipes');
  const inProgressRecipes = lS('g', 'inProgressRecipes');
  const isFavorite = lS('g', 'favoriteRecipes');
  const checkedIngredients = lS('g', 'checkedIngredients');

  if (getLocalStorage === null) lS('s', 'doneRecipes', []);
  if (inProgressRecipes === null) {
    lS('s', 'inProgressRecipes', {
      cocktails: {},
      meals: {},
    });
  }
  if (isFavorite === null) lS('s', 'favoriteRecipes', []);
  if (checkedIngredients === null) lS('s', 'checkedIngredients', {});
};

export default checkLS;
