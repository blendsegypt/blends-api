import DB from "../../models";
import Express from "express";
const router = Express.Router();

// Get list of areas and branch associated (Upon first launch of application)
router.get("/", async (req, res) => {
  try {
    const areas = await DB.Area.findAll({
      attributes: ["id", "name", "area_fence"],
      include: [
        {
          model: DB.Branch,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });
    return res.status(200).json({
      message: "Areas retrieved succesfully",
      data: areas,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

export default router;
