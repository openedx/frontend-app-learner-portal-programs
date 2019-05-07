import React from 'react';
import { Provider } from 'react-redux';

import createStore from './src/data/store';

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
);
