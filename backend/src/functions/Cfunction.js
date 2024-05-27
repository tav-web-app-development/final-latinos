const product = require("../data/Products");
const { db } = require("./init");

async function addData(category_name) {
 
  const stmnt = db.prepare(
    "INSERT INTO Categories(category_name) VALUES (?)"
  );
  try {
    const info = await stmnt.run(category_name);
    return info;
  } catch (err) {
    console.error(
      "data.categories.addData] Unable to add Category",
      err.message
    );
    return undefined;
  }
}

async function getAllCategories() {
  const stmnt = db.prepare("SELECT * FROM Categories ");
  const info = await stmnt.all();
  return info;
}

async function getCategoryById(pid) {
  const stmnt = db.prepare("SELECT * FROM Categories WHERE category_id=? ");
  const info = stmnt.get(pid);
  return info;
}

async function deleteById(pid) {
  return new Promise((resolve, reject) => {
    const stmnt = db.prepare("DELETE FROM Categories WHERE category_id= ?");
    try {
      stmnt.run(pid);
      resolve(true);
    } catch (err) {
      console.error(
        "[data.category.deleteById] Unable to delete cateogry from the Categories table",
        err
      );
      reject(err);
    }
  });
}

module.exports = {
  addData,
  getAllCategories,
  getCategoryById,
  deleteById,
};
