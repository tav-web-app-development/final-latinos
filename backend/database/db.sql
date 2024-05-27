PRAGMA foreign_keys = OFF;
DROP TABLE IF EXISTS Suppliers;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Products;

CREATE TABLE Suppliers(
    supp_id INTEGER PRIMARY KEY AUTOINCREMENT,
    supp_name character varying(100) NOT NULL,
    supp_email character varying(200) NOT NULL,
    supp_contact character varying(100) 
);

CREATE TABLE Categories(
    category_id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_name character varying(100) NOT NULL UNIQUE
);

CREATE TABLE Products(
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name character varying(50) NOT NULL,
    SKU character varying(50) NOT NULL UNIQUE,
    cat_id INTEGER NOT NULL,
    sup_id INTEGER NOT NULL,
    product_desc character varying(200),
    quantity INTEGER,
    price REAL,
    FOREIGN KEY (sup_id) REFERENCES Suppliers (supp_id) ON DELETE CASCADE,
    FOREIGN KEY (cat_id) REFERENCES Categories (category_id) ON DELETE CASCADE
);
