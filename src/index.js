import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
// импорт компонента Provider
import { Provider } from 'react-redux';
// импорт объекта глобального состояния
import { store, persistor } from './redux/store';

import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <React.StrictMode>
    <PersistGate persistor={persistor} loading={null}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
  document.getElementById('root'),
);
