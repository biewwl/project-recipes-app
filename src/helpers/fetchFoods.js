async function fetchFoods(type, query) {
  let result = { meals: [] };

  if (type === 'ingredient') {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`,
    );
    const dados = await data.json();
    result = dados;
  } else if (type === 'name') {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    );
    const dados = await data.json();
    result = dados;
  } else if (type === 'firstLetter') {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`,
    );
    const dados = await data.json();
    result = dados;
  }

  if (result.meals === null) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    return [];
  }
  return result.meals;
}

export async function fetchFoodsCategories() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson.meals;
}

export async function fetchFoodsByCategory(category) {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson.meals;
}

export async function fetchFoodDetails(id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson.meals;
}

export async function fetchRandomFood() {
  const fetchAPI = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const jsonAPI = await fetchAPI.json();
  const { meals } = jsonAPI;
  return meals[0].idMeal;
}

export async function fetchByNationality() {
  const fetchAPI = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  const jsonAPI = await fetchAPI.json();
  const { meals } = jsonAPI;
  const nations = meals.map(({ strArea }) => strArea);
  return nations;
}

export async function fetchByArea(area) {
  const fetchAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  const jsonAPI = await fetchAPI.json();
  console.log(jsonAPI);
  const { meals } = jsonAPI;
  return meals;
}
export default fetchFoods;
