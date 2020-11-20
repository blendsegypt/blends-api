import DB from "../../models";
import Express from "express";
const router = Express.Router();

//Add a new banner
router.post("/", async (req, res) => {
  try {
    const banner = req.body;
    const newBanner = await DB.Banner.create(banner);
    res.status(201).json({
      message: "New banner succesfully created",
      data: newBanner,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

//Get all banners
router.get("/", async (req, res) => {
  try {
    const banners = await DB.Banner.findAll();
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

//Update a banner
router.put("/:id", async (req, res) => {
  try {
    const updatedBanner = req.body;
    const [numberOfAffectedRows] = await DB.Banner.update(updatedBanner, {
      where: {
        id: req.params.id,
      },
    });
    if (!numberOfAffectedRows) {
      res.status(404).json({
        message: "Banner not found!",
      });
    }
    return res.status(200).json({
      message: "Banner updated succesfully",
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

//Delete a banner
router.delete("/:id", async (req, res) => {
  try {
    const bannerDeleted = await DB.Banner.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!bannerDeleted) {
      return res.status(404).json({
        message: "Banner not found!",
      });
    }
    return res.status(200).json({
      message: "Banner deleted succesfully",
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

export default router;
