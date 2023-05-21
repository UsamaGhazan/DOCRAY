import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import './index.css';
import theme from './theme';
import { store } from './store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>{' '}
  </ChakraProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
