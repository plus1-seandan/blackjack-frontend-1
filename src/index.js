import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';

document.title = 'BlackJack';
ReactDOM.render(
  <ChakraProvider>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root'),
);
