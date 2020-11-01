import DB from "../models";
import Express from "express";
const router = Express.Router();

//create new product custom option
router.post("/", async (req, res) => {
  try {
    const productCustomOption = req.body;
    const newProductCustomOption = await DB.ProductCustomOption.create(
      productCustomOption,
      { include: [DB.CustomOption] }
    );
    return res.status(201).json({
      message: "Custom option succesfully created.",
      newProductCustomOption,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//get all product custom options
router.get("/", async (req, res) => {
  try {
    const productCustomOptions = await DB.ProductCustomOption.findAll({
      include: DB.CustomOption,
    });
    res.status(200).json({
      message: "Product custom options succesfully retreived",
      data: productCustomOptions,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//update product custom option
router.put("/:id", async (req, res) => {
  try {
    const newProductCustomOption = req.body;
    // Update Product Custom Option record
    const [numberOfAffectedRows] = await DB.ProductCustomOption.update(
      newProductCustomOption,
      {
        where: {
          id: req.params.id,
        },
        include: [DB.CustomOption],
      }
    );
    // Bulk insert new Custom Options or update them if they exist
    if (newProductCustomOption.CustomOptions) {
      await DB.CustomOption.bulkCreate(newProductCustomOption.CustomOptions, {
        fields: ["id", "label", "price", "value", "active"],
        updateOnDuplicate: ["id", "label", "price", "value", "active"],
      });
    }
    if (numberOfAffectedRows) {
      res.status(200).json({
        message: "Product custom option was succesfully updated",
      });
    } else {
      res.status(404).json({
        message: "Product custom option not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//delete product custom option
router.delete("/:id", async (req, res) => {
  try {
    const productCustomOptionDeleted = await DB.ProductCustomOption.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (productCustomOptionDeleted) {
      res.status(200).json({
        message: "Product Custom option was succesfully deleted",
      });
    } else {
      res.status(404).json({
        message: "Product custom option not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
