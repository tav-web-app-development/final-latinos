const { client } = require("../../server");

async function addData(supplier) {
  if (!supplier || typeof supplier !== "object" || Object.keys(supplier).length === 0) {
    console.error("Invalid input: supplier data is missing, not an object, or empty.");
    return undefined;
  }
  const { name, email, contact } = supplier;
  try {
    const result = await client.query(
      "INSERT INTO Suppliers(supp_name, supp_email, supp_contact) VALUES ($1, $2, $3)",
      [name, email, contact]
    );
    return result;
  } catch (error) {
    console.error("[data.supplier.addData] Unable to add employees in Suppliers table:", error.message);
    return undefined;
  }
}

async function getAllSuppliers() {
  try {
    const result = await client.query("SELECT * FROM Suppliers");
    return result.rows;
  } catch (error) {
    console.error("[data.suppliers.getAllSuppliers] Error:", error.message);
    return [];
  }
}

async function getSupplierById(pid) {
  try {
    const result = await client.query("SELECT * FROM Suppliers WHERE supp_id = $1", [pid]);
    return result.rows[0];
  } catch (error) {
    console.error("[data.suppliers.getSupplierById] Error:", error.message);
    return undefined;
  }
}

async function deleteSupplierById(pid) {
  try {
    await client.query("DELETE FROM Suppliers WHERE supp_id = $1", [pid]);
    return true;
  } catch (error) {
    console.error("[data.suppliers.deleteSupplierById] Unable to delete supplier from the Suppliers table:", error.message);
    return false;
  }
}

module.exports = {
  addData,
  getAllSuppliers,
  getSupplierById,
  deleteSupplierById,
};