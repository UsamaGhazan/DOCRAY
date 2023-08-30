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
// import SocketProvider from './context/SocketProvider';
import { ContextProvider } from './context/SocketProvider';

ReactDOM.render(
  <ChakraProvider theme={theme}>
    {/* <SocketProvider> */}
    <ContextProvider>
      <Provider store={store}>
        <App />
      </Provider>{' '}
    </ContextProvider>
    {/* </SocketProvider> */}
  </ChakraProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
