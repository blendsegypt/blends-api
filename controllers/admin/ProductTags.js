import DB from "../models";
import Express from "express";
const router = Express.Router();

//create new tag
router.post("/", async (req, res) => {
  try {
    // Handle M:N relation between Product & Tags
    // - Destruct Tag object (from request body)
    const { label, color, product_id } = req.body;
    // - Create Tag table
    const newTag = await DB.ProductTag.create({
      label,
      color,
    });
    // - Create relation table
    await newTag.addProduct(product_id);
    return res.status(201).json({
      message: "Tag was succesfully created",
      data: newTag,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//list all tags
router.get("/", async (req, res) => {
  try {
    const tags = await DB.ProductTag.findAll();
    res.status(200).json({
      message: "Tags succesfully retreived",
      data: tags,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//update tag
router.put("/:id", async (req, res) => {
  try {
    const newTag = req.body;
    const [numberOfAffectedRows] = await DB.ProductTag.update(newTag, {
      where: {
        id: req.params.id,
      },
    });
    if (numberOfAffectedRows) {
      res.status(200).json({ message: "Tag was succesfully updated" });
    } else {
      res.status(404).json({ message: "Tag is not found!" });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//delete tag
router.delete("/:id", async (req, res) => {
  try {
    const tagDeleted = await DB.ProductTag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (tagDeleted) {
      res.status(200).json({ message: "Tag was succesfully deleted" });
    } else {
      res.status(404).json({ message: "Tag was not found!" });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
