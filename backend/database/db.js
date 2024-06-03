export const createTables = `
DROP TABLE IF EXISTS Suppliers;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Products;


CREATE TABLE Suppliers (
    supp_id SERIAL PRIMARY KEY,
    supp_name VARCHAR(100) NOT NULL,
    supp_email VARCHAR(200) NOT NULL,
    supp_contact VARCHAR(100)
);


CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);


CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    SKU VARCHAR(50) NOT NULL UNIQUE,
    cat_id INTEGER NOT NULL,
    sup_id INTEGER NOT NULL,
    product_desc VARCHAR(200),
    quantity INTEGER,
    price NUMERIC,
    FOREIGN KEY (sup_id) REFERENCES Suppliers (supp_id) ON DELETE CASCADE,
    FOREIGN KEY (cat_id) REFERENCES Categories (category_id) ON DELETE CASCADE
);
`