const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tags = await Tag.findAll({
    include: [
      {
        model: Product,
      },
    ],
  });
  res.status(200).json(tags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  const tags = await Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
      },
    ],
  });
  res.status(200).json(tags);
});

router.post("/", async (req, res) => {
  // create a new tag
  const newTag = await Tag.create({
    tag_name: req.body.tag_name,
  });
  res.status(201).json(newTaga);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update(
    {
      tag_name: req.body.tag_name,
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
  // delete on tag by its `id` value
  await Tag.destroy({ where: { id: req.params.id } });
  res.status(202).json({ message: "deleted" });
});

module.exports = router;
