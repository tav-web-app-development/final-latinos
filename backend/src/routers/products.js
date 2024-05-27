const router = require("express").Router();
const {
  getAllProducts,
  getProductById,
  addData,
  deleteById,
  updateProductById,
} = require("../functions/Pfunction");

router.post("/products/create", async (req, res) => {
  const productsData = {
    product_name: req.body?.product_name,
    SKU: req.body?.SKU,
    cat_id: req.body?.cat_id,
    sup_id: req.body?.sup_id,
    product_desc: req.body?.product_desc,
    quantity: req.body?.quantity,
    price: req.body?.price,
  };

  try {
    const result = await addData(productsData);
    if (result) {
      res.status(200).json({ message: "Products data added successfully to the table" });
    } else {
      res.status(400).json({ message });
    }
  } catch (err) {
    console.error("[router.post('/products')] Error:", err.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.get("/products/all", async (req, res) => {
  const Productstable = await getAllProducts();
  if (Productstable) {
    res.json(Productstable);
  } else {
    res.status(404).json({
      message: "Productstable not found, pls check the data",
    });
  }
});

router.get("/products/:pid", async (req, res) => {
  const id = req.params.pid;
  if (id !== undefined) {
    const product = await getProductById(id);
    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  }
});

router.put("/products/:id", async (req, res) => {
  const pid = req.params.id;
  const newData = {
    product_name: req.body.product_name,
    SKU: req.body.SKU,
    cat_id: req.body.cat_id,
    sup_id: req.body.sup_id,
    product_desc: req.body.product_desc,
    quantity: req.body.quantity,
    price: req.body.price,
  };

  try {
    const result = await updateProductById(pid, newData);
    if (result) {
      res.status(200).json({ message: "Product updated successfully" });
    } else {
      res.status(400).send({ message: "Failed to update product" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.delete("/products/:product_id", async (req, res) => {
  const id = req.params.product_id;
  try {
    const result = await deleteById(id);
    if (result) {
      res.json({
        message: `the product with id '${id}' was deleted successfully.`,
      });
    } else {
      res.status(400).json({
        message: "Couldn't delete this product , please check carefully the id",
      });
    }
  } catch (err) {
    console.error("[productRouter] Error deleting product:", err);
    res.status(500).json({ message: "Interval error" });
  }
});

module.exports = router;
