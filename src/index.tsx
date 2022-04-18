import React from 'react';
import ReactDOM from 'react-dom';
import App from './core/App';
import {StoreContext} from './core/context/useStore';
import {store} from "./store";

import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
      <StoreContext.Provider value={store}>
    <App />
      </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
