const client = require("../../server");



async function getAllProducts() {
  try {
    const result = await client.query(`
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
    return result.rows;
  } catch (error) {
    console.error("[data.products.getAllProducts] Error:", error.message);
    return [];
  }
}

async function getProductById(pid) {
  try {
    const result = await client.query("SELECT * FROM Products WHERE product_id = $1", [pid]);
    return result.rows[0];
  } catch (error) {
    console.error("[data.products.getProductById] Error:", error.message);
    return undefined;
  }
  
  
}

async function addData(productData) {
  
  const { product_name, SKU, cat_id, sup_id, product_desc, quantity, price } = productData;
  try {
    const result = await client.query(
      "INSERT INTO Products (product_name, SKU, cat_id, sup_id, product_desc, quantity, price) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [product_name, SKU, cat_id, sup_id, product_desc, quantity, price]
    );
    return result;
  } catch (error) {
    console.error("[data.products.addData] Error:", error.message);
    return undefined;
  }
}

async function deleteById(pid) {
  try {
    await client.query("DELETE FROM Products WHERE product_id = $1", [pid]);
    return true;
  } catch (error) {
    console.error("[data.products.deleteById] Error:", error.message);
    return false;
  }
}

async function updateProductById(pid, newData) {
  
  const { product_name, SKU, cat_id, sup_id, product_desc, quantity, price } = newData;
  try {
    await client.query(
      "UPDATE Products SET product_name = $1, SKU = $2, cat_id = $3, sup_id = $4, product_desc = $5, quantity = $6, price = $7 WHERE product_id = $8",
      [product_name, SKU, cat_id, sup_id, product_desc, quantity, price, pid]
    );
    return { message: "Product updated successfully" };
  } catch (error) {
    console.error("[data.products.updateProductById] Error:", error.message);
    return { message: "Unable to update product" };
  }

}

module.exports = {
  getAllProducts,
  getProductById,
  addData,
  deleteById,
  updateProductById,
};
