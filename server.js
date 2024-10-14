const express = require('express');
const app = express();
const routes = require('./src/routes/routes');
const { loadCSVInMemory } = require('./src/services/csv');

app.use(express.json());

loadCSVInMemory();

app.use('/api', routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor http://localhost:${port}`);
});