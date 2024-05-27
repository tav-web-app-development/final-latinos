const { db } = require("./init");

async function addData(supplier) {
  if (
    !supplier ||
    typeof supplier !== "object" ||
    Object.keys(supplier).length === 0
  ) {
    console.error(
      "Invalid input: supplier data is missing, not an object, or empty."
    );
    return undefined;
  }
  const preparedSuppliersData = [
    supplier.name,
    supplier.email,
    supplier.contact,
  ];
  const stmnt = db.prepare(
    "INSERT INTO Suppliers(supp_name,supp_email,supp_contact) VALUES (?,?,?)"
  );

  try {
    const info = await stmnt.run(preparedSuppliersData);
    return info;
  } catch (err) {
    console.error(
      "[data.supplier.addData] Unable to add employees in Suppliers table",
      err.message
    );
    return undefined;
  }
}

async function getAllSuppliers() {
  const stmnt = db.prepare("SELECT * FROM Suppliers");
  const info = await stmnt.all();
  return info;
}

async function getSupplierById(pid) {
  const stmnt = db.prepare("SELECT * FROM Suppliers WHERE supp_id= ? ");
  const info = await stmnt.get(pid);
  return info;
}

async function deleteSupplierById(pid) {
  return new Promise((resolve, reject) => {
    const stmnt = db.prepare("DELETE FROM Suppliers WHERE supp_id= ?");
    try {
      stmnt.run(pid);
      resolve(true);
    } catch (err) {
      console.error(
        "[data.suppliers.deleteSupplierById] Unable to delete supplier from the Suppliers table",
        err
      );
      reject(err);
    }
  });
}

module.exports = {
  addData,
  getAllSuppliers,
  getSupplierById,
  deleteSupplierById,
};
