const router = require("express").Router();
const {
  addData,
  getAllSuppliers,
  getSupplierById,
  deleteSupplierById,
} = require("../functions/Sfuction");

router.post("/suppliers/create", async (req, res) => {
  const supplier = {
    name: req.body?.name,
    email: req.body?.email,
    contact: req.body?.contact,
  };
  try {
    const result = await addData(supplier);
    if (result) {
      res.json({ message: "Suppliers data added successfully to the table" });
    } else {
      res.status(400).json({
        message:
          "Something happened when try to add the data, pls check the code",
      });
    }
  } catch (err) {
    console.error("[router.post('/suppliers')] Error:", err.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.get("/suppliers/all", async (req, res) => {
  const Supplierstable = await getAllSuppliers();
  if (Supplierstable) {
    res.json(Supplierstable);
  } else {
    res
      .status(404)
      .json({ message: "SuppliersTable not found, pls check the data " });
  }
});

router.get("/suppliers/:pid", async (req, res) => {
  const id = req.params.pid;
  if (id !== undefined) {
    const supplier = await getSupplierById(id);
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).json({ message: "Supplier not found" });
    }
  } else {
    res.status(400).json({ message: "missing id, pls check if id is integer" });
  }
});

router.delete("/suppliers/:supp_id", async (req, res) => {
  const id = req.params.supp_id;
  try {
    const result = await deleteSupplierById(id);
    if (result) {
      res.json({
        message: `the supplier with id '${id}' was deleted successfully.`,
      });
    } else {
      res.status(400).json({
        message: "Couldn't delete this supplier, please check carefully the id",
      });
    }
  } catch (err) {
    console.error("[supplierRouter] Error deleting supplier:", err);
    res.status(500).json({ message: "Interval error" });
  }
});

module.exports = router;
