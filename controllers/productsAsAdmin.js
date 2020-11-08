import DB from "../models";
import Express from "express";
const router = Express.Router();

//create new product
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const createdProduct = await DB.Product.create(product);
    return res.status(201).json({
      message: "Product has been created succesfully",
      data: createdProduct,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//list all products
router.get("/", async (req, res) => {
  try {
    const products = await DB.Product.findAll({
      include: [
        {
          model: DB.ProductTag,
          as: "product_tags",
          attributes: ["id", "label", "color"],
        },
        {
          model: DB.ProductCustomOption,
          as: "product_custom_options",
          attributes: ["id", "label"],
        },
        {
          model: DB.ProductCategory,
          as: "product_category",
          attributes: ["id", "name"],
        },
      ],
    });
    return res.status(200).json({
      message: "Products has been succesfully retreived",
      data: products,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//update product
router.put("/:id", async (req, res) => {
  try {
    const newProduct = req.body;
    const [numberOfAffectedRows] = await DB.Product.update(newProduct, {
      where: {
        id: req.params.id,
      },
    });
    if (numberOfAffectedRows) {
      return res.status(200).json({
        message: "Product has been succesfully updated",
      });
    } else {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

//delete product
router.delete("/:id", async (req, res) => {
  try {
    const productDeleted = await DB.Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (productDeleted) {
      res.status(200).json({
        message: "Product has been succesfully deleted",
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
