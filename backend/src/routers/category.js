const router = require("express").Router();
const {
  addData,
  getAllCategories,
  getCategoryById,
  deleteById,
} = require("../functions/Cfunction");

router.post("/categories/create", async (req, res) => {
  
  const category_name = req.body?.name

  try {
    const result = await addData(category_name);
    if (result) {
      res.status(200).json({ message: "Category created succesfully" });
    } else {
      res.status(400).json({
        message:
          "Unable to create category",
      });
    }
  } catch (err) {
    console.error("[router.post('/categories')] Error:", err.message);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

router.get("/categories/all", async (req, res) => {
  const CategoriesTable = await getAllCategories();
  res.json(CategoriesTable);
});

router.get("/categories/:pid", async (req, res) => {
  const id = req.params.pid;
  if (id !== undefined) {
    const category = await getCategoryById(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } else {
    res.status(400).json({ message: "missing id, pls insert again" });
  }
});

router.delete("/categories/:cat_id", async (req, res) => {
  const id = req.params.cat_id;
  try {
    const result = await deleteById(id);
    if (result) {
      res.status(200).json({
        message: `the category with an id: ${id} was deleted successfully.`,
      });
    } else {
      res.status(400).json({
        message: "Couldn't delete this category, please check carefully the id",
      });
    }
  } catch (err) {
    console.error("[categoryRouter] Error deleting category:", err);
    res.status(500).json({ message: "Interval error" });
  }
});

module.exports = router;
