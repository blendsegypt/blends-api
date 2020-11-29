import DB from "../../models";
import Express from "express";
const router = Express.Router();

router.post("/", async (req, res) => {
  try {
    const user_id = res.locals.user_id;
    const user = await DB.User.findOne({
      where: {
        id: user_id,
      },
    });
    // If there's no records for that user then return 404
    if (!user) {
      return res.status(404).json({
        error: "INVALID_CREDENTIALS",
      });
    }
    // Delete any previous refresh tokens associated with that user
    await DB.RefreshToken.destroy({
      where: {
        user_id: user.id,
      },
    });
    res.status(200).json({
      message: "User logged out succesfully",
    });
  } catch (errors) {
    res.status(500).json({ error_message: errors.message });
  }
});

export default router;
