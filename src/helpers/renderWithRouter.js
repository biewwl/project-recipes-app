import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import RecipesContext from '../context/RecipesContext';

const valueProvider = {
  fetchResult: [],
  setFetchResult: (newFetchResult) => {
    valueProvider.fetchResult = newFetchResult;
  },
};

const renderWithRouter = (component, value = valueProvider) => {
  const history = createMemoryHistory();
  return ({
    ...render(
      <RecipesContext.Provider value={ value }>
        <Router history={ history }>{component}</Router>
      </RecipesContext.Provider>,
    ),
    history,
  });
};

export default renderWithRouter;
