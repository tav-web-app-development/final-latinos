const createTable = require("../../database/db");
const { Client } = require("pg");

const client = new Client({
  connectionString:
    "postgres://sebastian_12:TUyquMzARc7ly23aRP1LmR8DNaRwxAnI@dpg-cpf4anrtg9os73b7bfng-a/main_9tbv",
  ssl: { rejectUnauthorized: false },
});

async function initialzeDB() {
  try {
    await client.connect();
    console.log("Connected to the database");
    await client.query(createTable);
    console.log("Tables created successfully");
  } catch (err) {
    console.error("Error connecting to the database or creating tables:", err);
  } finally {
    await client.end();
    console.log("Database connection closed");
  }
}

initialzeDB();
module.exports = {
  initialzeDB,
};

// require("dotenv").config();
// const fs = require("fs");
// const db = require('better-sqlite3')(process.env.DB_SOURCE, {});

// async function init() {
//     const script = fs.readFileSync("./database/db.sql", "utf-8");
//     await db.exec(script);
// }

// module.exports = {
//   db,
//   init,
// };
