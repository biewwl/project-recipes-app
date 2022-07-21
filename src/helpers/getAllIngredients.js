const getIngredients = (results) => {
  const foodResults = Object.entries(results[0]);
  const justIngredients = [];
  let justMeasures = [];
  foodResults.forEach((e) => {
    if (e[0].includes('strIngredient')) {
      justIngredients.push(e[1]);
    }
  });
  foodResults.forEach((e) => {
    if (e[0].includes('strMeasure')) {
      justMeasures.push(e[1]);
    }
  });
  justMeasures = justMeasures.map((measure) => {
    if (measure !== null && measure !== '') return measure;
    return '';
  });
  const ingredientsAndMeasures = justIngredients
    .filter((ingredient) => ingredient !== null && ingredient !== '')
    .map((ingredient, i) => `${justMeasures[i]} ${ingredient}`);
  return ingredientsAndMeasures;
};

export default getIngredients;
