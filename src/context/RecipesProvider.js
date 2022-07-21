import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [fetchResult, setFetchResult] = useState([]);
  const valueProvider = {
    fetchResult,
    setFetchResult,
  };
  return (
    <RecipesContext.Provider value={ valueProvider }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesProvider;
