import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient'; // Importa el cliente desde el archivo de configuración
import App from './App';


// Renderiza la aplicación con el proveedor de Apollo
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
