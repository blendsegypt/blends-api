import DB from "../../models";
import Express from "express";
const router = Express.Router();

//Get all banners
router.get("/", async (req, res) => {
  try {
    const banners = await DB.Banner.findAll({
      attributes: ["banner_image_url", "product_id"],
    });
    res.status(200).json({
      message: "Banners succesfully retrieved",
      data: banners,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

export default router;
