const createTable = `-- Drop tables if they exist to ensure a clean slate
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Suppliers;
DROP TABLE IF EXISTS Categories;

-- Create Suppliers table
CREATE TABLE Suppliers (
    supp_id SERIAL PRIMARY KEY,
    supp_name VARCHAR(100) NOT NULL,
    supp_email VARCHAR(200) NOT NULL,
    supp_contact VARCHAR(100)
);

-- Create Categories table
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

-- Create Products table
CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    SKU VARCHAR(50) NOT NULL UNIQUE,
    cat_id INTEGER NOT NULL,
    sup_id INTEGER NOT NULL,
    product_desc VARCHAR(200),
    quantity INTEGER,
    price REAL,
    FOREIGN KEY (sup_id) REFERENCES Suppliers (supp_id) ON DELETE CASCADE,
    FOREIGN KEY (cat_id) REFERENCES Categories (category_id) ON DELETE CASCADE
);
`;

const inserQuery = ``;

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
