import React, { useState, useEffect, useContext } from "react";
import fetchFoods, {
  fetchByNationality,
  fetchByArea,
} from "../../helpers/fetchFoods";
import RecipesContext from "../../context/RecipesContext";
import "./styles/Dropdown.css";

const Dropdown = () => {
  const [nation, setNation] = useState([]);
  const { setFetchResult } = useContext(RecipesContext);

  const filterAllCategories = async () => {
    const results = await fetchFoods("name", "");
    setFetchResult(results);
  };

  const handleSearch = async ({ target }) => {
    if (target.value === "All") {
      filterAllCategories();
    } else {
      const result = await fetchByArea(target.value);
      const doze = 12;
      setFetchResult(result.slice(0, doze));
    }
  };

  useEffect(() => {
    const getNationality = async () => {
      const resultFetch = await fetchByNationality();
      setNation(resultFetch);
    };
    getNationality();
  }, []);

  return (
    <section>
      <select onChange={handleSearch}>
        <option>All</option>
        {nation.map((area, index) => (
          <option key={index} value={area} onClick={handleSearch}>
            {area}
          </option>
        ))}
      </select>
    </section>
  );
};

export default Dropdown;
