// apolloClient.js

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Crea una instancia del cliente de Apollo
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Reemplaza con la URI de tu servidor GraphQL
  cache: new InMemoryCache(),
});

// Exporta el cliente y el proveedor
export { client, ApolloProvider };
