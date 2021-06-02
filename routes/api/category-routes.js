const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const data = await Category.findAll();
  res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findOne({
    where: {
      id: req.params.id,
    },
  });
  category
    ? res.status(200).json(category)
    : res.status(404).json({ message: "no category with that id" });
});

router.post("/", async (req, res) => {
  // create a new category
  const result = await Category.create({
    category_name: req.body.category_name,
  });
  result
    ? res.status(201).json(result)
    : res.status(409).json({ message: "failed to create cateory" });
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  res.status(202).json({ message: "updated" });
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({ where: { id: req.params.id } });
  res.status(202).json({ message: "deleted" });
});

module.exports = router;
