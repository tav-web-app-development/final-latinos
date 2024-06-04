const client = require("../../server");


async function addData(category_name) {
  try {
    const result = await client.query(
      "INSERT INTO Categories(category_name) VALUES ($1)",
      [category_name]
    );
    return result;
  } catch (error) {
    console.error("[data.categories.addData] Unable to add Category:", error.message);
    return undefined;
  }
}

async function getAllCategories() {
  try {
    const result = await client.query("SELECT * FROM Categories");
    return result.rows;
  } catch (error) {
    console.error("[data.categories.getAllCategories] Error:", error.message);
    return [];
  }
}

async function getCategoryById(pid) {
  try {
    const result = await client.query("SELECT * FROM Categories WHERE category_id = $1", [pid]);
    return result.rows[0];
  } catch (error) {
    console.error("[data.categories.getCategoryById] Error:", error.message);
    return undefined;
  }
}

async function deleteById(pid) {
  try {
    await client.query("DELETE FROM Categories WHERE category_id = $1", [pid]);
    return true;
  } catch (error) {
    console.error("[data.categories.deleteById] Unable to delete category from the Categories table:", error.message);
    return false;
  }
}

module.exports = {
  addData,
  getAllCategories,
  getCategoryById,
  deleteById,
};
