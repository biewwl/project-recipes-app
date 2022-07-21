import lS from 'manager-local-storage';

const favoriteRecipe = (infos, type, status) => {
  const id = type === 'food' ? infos.idMeal : infos.idDrink;
  const favorites = lS('g', 'favoriteRecipes');
  if (status) {
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    lS('s', 'favoriteRecipes', newFavorites);
  } else {
    lS('s', 'favoriteRecipes', [
      ...favorites,
      {
        id,
        type,
        nationality: type === 'food' ? infos.strArea : '',
        category: infos.strCategory,
        alcoholicOrNot: type === 'food' ? '' : infos.strAlcoholic,
        name: type === 'food' ? infos.strMeal : infos.strDrink,
        image: type === 'food' ? infos.strMealThumb : infos.strDrinkThumb,
      },
    ]);
  }

  return !status;
};

export default favoriteRecipe;
