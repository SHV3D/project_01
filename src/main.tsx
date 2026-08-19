import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StoreProvider } from './store/StoreContext';
import { rootStore } from './store/RootStore';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={rootStore}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
