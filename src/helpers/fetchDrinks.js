async function fetchDrinks(type, query) {
  let result = { drinks: [] };

  if (type === 'ingredient') {
    const data = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`,
    );
    const dados = await data.json();
    result = dados;
  } else if (type === 'name') {
    const data = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`,
    );
    const dados = await data.json();
    result = dados;
  } else if (type === 'firstLetter') {
    const data = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`,
    );
    const dados = await data.json();
    result = dados;
  }

  if (result.drinks === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    return [];
  }

  return result.drinks;
}

export async function fetchDrinksCategories() {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson.drinks;
}

export async function fetchDrinksByCategory(category) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson.drinks;
}

export async function fetchDrinkDetails(id) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson.drinks;
}

export async function fetchRandomDrink() {
  const fetchAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const jsonAPI = await fetchAPI.json();
  const { drinks } = jsonAPI;
  return drinks[0].idDrink;
}

export default fetchDrinks;
