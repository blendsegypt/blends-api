import DB from "../models";
import Express from "express";
const router = Express.Router();

//create new product
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    //Product creation requires a transaction to add inventory records for each branch (for retail products)
    let productCreated = false;
    let createdProduct;
    productCreated = await DB.sequelize.transaction(async (t) => {
      // Create Product
      createdProduct = await DB.Product.create(product, {
        transaction: t,
      });
      if (product.product_tags) {
        // Set Product Tags
        await createdProduct.setProduct_tags(product.product_tags, {
          transaction: t,
        });
      }
      // Add inventory record for retail products
      if (product.retail) {
        const inventories = [];
        const branches = await DB.Branch.findAll({
          attributes: ["id", "name"],
          transaction: t,
        });
        branches.forEach((branch) => {
          inventories.push({
            product_id: createdProduct.id,
            branch_name: branch.name,
            branch_id: branch.id,
            product_name: createdProduct.name,
            actual_stock: 0,
            safe_stock: 0,
            min_stock: 0,
          });
        });
        await DB.Inventory.bulkCreate(inventories);
      }
      return true;
    });
    if (productCreated) {
      return res.status(201).json({
        message: "Product has been created succesfully",
        data: createdProduct,
      });
    } else {
      return res.status(500).json({
        error_message: "An Error occured during transaction",
      });
    }
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
    //update tags
    const product = await DB.Product.findByPk(req.params.id);
    if (newProduct.product_tags) {
      await product.setProduct_tags(newProduct.product_tags);
    }
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
    await DB.Inventory.destroy({
      where: {
        product_id: req.params.id,
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
