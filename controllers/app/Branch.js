import DB from "../../models";
import Express from "express";
const router = Express.Router();

// Get branch status
router.get("/:branch_id", async (req, res) => {
  try {
    const branch_id = req.params.branch_id;
    // If branch_id is not a number
    if (isNaN(branch_id)) {
      return res.status(400).json({
        message: "Invalid branch ID",
      });
    }
    const branch = await DB.Branch.findOne({
      where: {
        id: branch_id,
      },
      attributes: ["id", "status"],
      include: [
        {
          as: "working_hours",
          model: DB.WorkingHours,
        },
      ],
    });

    // If branch doesn't exist
    if (!branch) {
      return res.status(404).json({
        message: "Branch not found",
      });
    }

    res.status(200).json({
      message: "Branch retrieved succesfully",
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

export default router;
