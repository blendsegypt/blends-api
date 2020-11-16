import DB from "../../models";
import Express from "express";
const router = Express.Router();

//create new product category
router.post("/", async (req, res) => {
  try {
    const productCategory = req.body;
    const newProductCategory = await DB.ProductCategory.create(productCategory);
    return res.status(201).json({
      message: "Product Category has been succesfully created.",
      data: newProductCategory,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//list all product categories
router.get("/", async (req, res) => {
  try {
    const productCategories = await DB.ProductCategory.findAll({
      include: [DB.InternalCategory],
    });
    return res.status(200).json({
      message: "Product Categories has been succesfully retreived.",
      data: productCategories,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//get product category by ID
router.get("/:id", async (req, res) => {
  try {
    const productCategory = await DB.ProductCategory.findByPk(req.params.id);
    return res.status(200).json({
      message: "Product Category has been succesfully retreived",
      data: productCategory,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//delete product category by ID
router.delete("/:id", async (req, res) => {
  try {
    const productCategoryDeleted = await DB.ProductCategory.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (productCategoryDeleted) {
      return res.status(200).json({
        message: "Product Category has been successfully deleted",
      });
    } else {
      return res.status(404).json({
        message: "Product Category is not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//update product category by ID
router.put("/:id", async (req, res) => {
  try {
    const newProductCategory = req.body;
    const [numberOfAffectedRows] = await DB.ProductCategory.update(
      newProductCategory,
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (numberOfAffectedRows) {
      return res.status(200).json({
        message: "Product Category has been succesfully updated",
      });
    } else {
      return res.status(200).json({
        message: "Product Category not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
