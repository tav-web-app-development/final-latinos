@Original Repo: https://github.com/TAV-College/final-project-latinos.git

# Inventory Management App

This is an Inventory Management Application designed and developed by Richard Ardila, Sebastian Graneros and Danny Becerra as a Final Project for the courses: Advanced OOP (Mordechai Zirkind) and Web Application Development (Shalom Steinmetz).

## Overview

The application consists of several components:

- **Backend Framework**: Node.js
- **SQLite3:** The database management system used to store and manage the Employee data.
- **Routers:** Express routers are used to define the endpoints of the API.
- **Express:** The web application framework used to create the API.
- **Testing Frameworks:** Testing frameworks such as Jest may be used to ensure the correctness of the application's functionality.
- **Frontend Framework**: React.js

## Scripts

We created some custom commands in order to run the app for the first time, please run the following commands in order to start the application.

### /backend directory:
- **npm run db:init** :This script initializes the database.
- **npm run addData**: This script adds dummy data to the database.
- **npm run dev**: It runs the server using nodemon.

Optional:

- **npm run test**: This script runs the test suite for the project.

### /frontend directory:
- **npm run dev**: It runs the frontend app using React.

## Category Routers

## Routes

| Endpoint              | Method | Body              | Return                                                                  | Description            |
| --------------------- | ------ | ----------------- | ----------------------------------------------------------------------- | ---------------------- |
| `/categories/create`  | POST   | { "name": "..." } | { "message": "Category created successfully" }                          | Creates a new category |
| `/categories/all`     | GET    |                   | [ { "id": 1, "name": "..." }, { "id": 2, "name": "..." } ]              | Get all categories     |
| `/categories/:pid`    | GET    |                   | { "id": 1, "name": "..." }                                              | Get category by ID     |
| `/categories/:cat_id` | DELETE |                   | { "message": "the category with an id: ... was deleted successfully." } | Delete category by ID  |

## Product Routes

| Endpoint                | Method | Body                                                                                                                              | Return                                                                              | Description           |
| ----------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | --------------------- |
| `/products/create`      | POST   | `{ "product_name": "...", "SKU": "...", "cat_id": "...", "sup_id": "...", "product_desc": "...", "quantity": ..., "price": ... }` | `{ "message": "Products data added successfully to the table" }`                    | Creates a new product |
| `/products/all`         | GET    |                                                                                                                                   | `[ { "id": 1, "product_name": "...", "SKU": "...", "cat_id": 1, ... }, ... ]`       | Get all products      |
| `/products/:pid`        | GET    |                                                                                                                                   | `{ "product": { "id": 1, "product_name": "...", "SKU": "...", "cat_id": 1, ... } }` | Get product by ID     |
| `/products/:id`         | PUT    | `{ "product_name": "...", "SKU": "...", "cat_id": "...", "sup_id": "...", "product_desc": "...", "quantity": ..., "price": ... }` | `{ "message": "Product updated successfully" }`                                     | Update product by ID  |
| `/products/:product_id` | DELETE |                                                                                                                                   | `{ "message": "the product with id '...' was deleted successfully." }`              | Delete product by ID  |

## Suplier Routes

| Endpoint              | Method | Body                                                  | Return                                                                  | Description            |
| --------------------- | ------ | ----------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------- |
| `/suppliers/create`   | POST   | `{ "name": "...", "email": "...", "contact": "..." }` | `{ "message": "Suppliers data added successfully to the table" }`       | Creates a new supplier |
| `/suppliers/all`      | GET    |                                                       | `[ { "id": 1, "name": "...", "email": "...", "contact": "..." }, ... ]` | Get all suppliers      |
| `/suppliers/:pid`     | GET    |                                                       | `{ "id": 1, "name": "...", "email": "...", "contact": "..." }`          | Get supplier by ID     |
| `/suppliers/:supp_id` | DELETE |                                                       | `{ "message": "the supplier with id '...' was deleted successfully." }` | Delete supplier by ID  |
