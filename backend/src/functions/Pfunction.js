const {db} = require("./init");

async function getAllProducts() {
  const stmnt = db.prepare(`
  SELECT 
    Products.product_id, 
    Products.product_name,
    Products.SKU,
    Products.product_desc,
    Products.cat_id,
    Products.sup_id,
    Categories.category_name, 
    Suppliers.supp_name,
    Products.quantity,
    Products.price
  FROM Products
  JOIN Categories ON Products.cat_id = Categories.category_id
  JOIN Suppliers ON Products.sup_id = Suppliers.supp_id
`);
  const info = await stmnt.all();
  return info;
}

async function getProductById(pid) {
  const stmnt = db.prepare("SELECT * FROM Products WHERE product_id=? ");
  try {
    const info = await stmnt.get(pid);
    return info
  } catch (error) {
    console.error(
      "[data.products.getProductById] Product nor found",
      err.message
    );
    return undefined;
  }
  
  
}

async function addData(productData) {
  if (
    !productData ||
    typeof productData !== "object" ||
    Object.keys(productData).length === 0
  ) {
    console.error(
      "Invalid input: productData is missing, not an object, or empty."
    );
    return undefined;
  }

  const preparedProduct = [
    productData.product_name,
    productData.SKU,
    productData.cat_id,
    productData.sup_id,
    productData.product_desc,
    parseInt(productData.quantity, 10),
    productData.price,
  ];

  const stmnt = db.prepare(
    "INSERT INTO Products (product_name, SKU, cat_id, sup_id, product_desc, quantity, price) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );

  try {
    const info = await stmnt.run(preparedProduct);
    return info;
  } catch (err) {
    console.error(
      "[data.products.insertNewProduct] Unable to insert new product to the table",
      err.message
    );
    return undefined;
  }
}

async function deleteById(pid) {
  return new Promise((resolve, reject) => {
    const stmnt = db.prepare("DELETE FROM Products WHERE product_id = ?");
    try {
      stmnt.run(pid);
      resolve(true);
    } catch (err) {
      console.error(
        "[data.product.deleteSupplierById] Unable to delete product from the Procuts table",
        err
      );
      reject(err);
      
    }
  });
}

async function updateProductById(pid, newData) {
  
  const { product_name, SKU, cat_id, sup_id, product_desc, quantity, price } = newData
  const stmnt = db.prepare(`UPDATE Products SET product_name = ?, SKU = ?, cat_id = ?, sup_id = ?, product_desc = ?, quantity = ?, price = ? WHERE product_id = ?`);

  try {
      stmnt.run(
        product_name,
        SKU,
        cat_id,
        sup_id,
        product_desc,
        quantity,
        price,
        pid
      );
      return {message: 'Product updated succesfuly'}
  } catch (err) {
      console.error(
        "[data.product.updateProductById] Unable to update product in the Products table",
        err
      );
      return {message: 'Unable to update product'}
  }

}

module.exports = {
  getAllProducts,
  getProductById,
  addData,
  deleteById,
  updateProductById,
};
