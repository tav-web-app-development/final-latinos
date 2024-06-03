require("dotenv").config();
const port = process.env.PORT ?? 3000;
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

client.connect();

client.query('SELECT NOW()', (err, res) => {
  if (err) {
      console.error(err);
  } else {
      console.log('Connection successful:', res.rows);
  }
  client.end();
});


app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
