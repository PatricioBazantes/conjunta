const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./db');
const schema = require('./schema');
const root = require('./resolvers');

const app = express();
const port = 4000;

// Configuración de CORS
app.use(cors());
app.use(bodyParser.json());

// Configuración del middleware GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor GraphQL corriendo en http://localhost:${port}/graphql`);
});

// Sincroniza la base de datos
sequelize.sync({ force: true }) // Utiliza `force: true` solo en desarrollo para reiniciar la base de datos
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });
