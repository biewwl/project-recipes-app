async function fetchIngredients(type) {
  let result = [];

  const urlFood = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const urlDrink = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

  const url = type === 'food' ? urlFood : urlDrink;
  const data = await fetch(url);
  result = await data.json();

  result = type === 'food' ? result.meals : result.drinks;

  const allIngredient = result
    .map(
      ({ strIngredient, strIngredient1 }) => (type === 'food'
        ? strIngredient : strIngredient1),
    );

  const DOZE = 12;

  const namesIngredientes = allIngredient.slice(0, DOZE);

  let arrayResult = [];

  namesIngredientes.forEach(async (name) => {
    const imageFood = `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
    const imageDrink = `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
    const image = type === 'food' ? imageFood : imageDrink;

    arrayResult = [
      ...arrayResult,
      {
        name,
        image,
      },
    ];
  });

  return arrayResult;
}

export default fetchIngredients;
