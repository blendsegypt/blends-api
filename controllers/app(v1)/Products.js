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

//get products by category & branch (Homescreen in mobile application)
router.get("/category/:category_id/branch/:branch_id", async (req, res) => {
  try {
    const category_id = req.params.category_id;
    let branch_id = req.params.branch_id;
    if (branch_id === "any") {
      const branches = await DB.Branch.findAll();
      branch_id = branches[0].id;
    }
    const productsFromCategory = await DB.Product.findAll({
      where: {
        product_category_id: category_id,
        listed: true,
      },
      attributes: [
        "id",
        "name",
        "price",
        "sale_price",
        "retail",
        "product_image_url",
        "createdAt",
      ],
      order: [["createdAt", "ASC"]],
      include: [
        {
          required: false,
          model: DB.Inventory,
          attributes: ["actual_stock", "branch_id"],
          where: {
            branch_id: branch_id,
          },
        },
      ],
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
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "sale_price",
        "product_image_url",
      ],
      include: [
        {
          as: "product_tags",
          model: DB.ProductTag,
          attributes: ["label", "color"],
          through: {
            attributes: [],
          },
        },
        {
          as: "product_custom_options",
          model: DB.ProductCustomOption,
          attributes: ["label", "icon", "mandatory", "active"],
          include: [
            {
              as: "custom_options",
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
