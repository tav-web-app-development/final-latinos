const product = require("./src/data/Products");
const suppliers = require("./src/data/Suppliers");
const category = require("./src/data/Category");

function addProductstoDB() {
  const { addData } = require("./src/functions/Pfunction");
  product.map((obj) => addData(obj));
}

function addSupplierstoDB() {
  const { addData } = require("./src/functions/Sfuction");
  suppliers.map((obj) => addData(obj));
}

function addCategorytoDB() {
  const { addData } = require("./src/functions/Cfunction");
  category.map((obj) => addData(obj));
}

addSupplierstoDB();
addCategorytoDB();
addProductstoDB();
