require("dotenv").config();
const port = process.env.PORT ?? 3000;
const createTable = require("./database");
const app = require("./src/App");
const { Client } = require("pg");

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL");
    return client.query(createTable);
  })
  .then(() => {
    console.log("Table created succesfully");
  })
  .catch((err) => {
    console.error("Error executing query", err.stack);
  })
  .finally(() => {
    client.end();
  });

app.listen(port, async () => {
  console.log(`app running at http://localhost:${port}`);
});
