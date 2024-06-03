require("dotenv").config();
const port = process.env.PORT ?? 3000;
const createTables = require("./database/db");
const app = require("./src/App");
const { Client } = require('pg');



//Conexion to DB
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
    return client.query(createTables);
  })
  .then(() => {
    console.log('Tables created successfully');
  })
  .catch(err => {
    console.error('Error executing query', err.stack);
  })
  .finally(() => {
    client.end();
  });


app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
