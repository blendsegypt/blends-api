import DB from "../../models";
import Express from "express";
const router = Express.Router();

//get all categories (Homescreen in mobile application)
router.get("/categories", async (req, res) => {
  try {
    //Get categories list
    const categories = await DB.ProductCategory.findAll({
      attributes: ["id", "name", "active"],
    });
    res.status(200).json({
      message: "Categories succesfully retreived",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//get products by category (Homescreen in mobile application)
router.get("/categories/:category_id", async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const productsFromCategory = await DB.Product.findAll({
      where: {
        product_category: category_id,
      },
      attributes: ["id", "name", "price", "sale_price"],
    });
    res.status(200).json({
      message: "Products succesfully retreived",
      data: productsFromCategory,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//get single product (ProductScreen in mobile application)
router.get("/:product_id", async (req, res) => {
  try {
    const product_id = req.params.product_id;
    // Retrieve product attributes, tags (exclude junction table) & custom options
    const product = await DB.Product.findByPk(product_id, {
      attributes: ["id", "name", "description"],
      include: [
        {
          model: DB.ProductTag,
          attributes: ["label", "color"],
          through: {
            attributes: [],
          },
        },
        {
          model: DB.ProductCustomOption,
          attributes: ["label", "icon", "mandatory", "active"],
          include: [
            {
              model: DB.CustomOption,
              attributes: ["label", "price", "value", "active"],
            },
          ],
        },
      ],
    });
    res.status(200).json({
      message: "Product has been succesfully retreived",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
