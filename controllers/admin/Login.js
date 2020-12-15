import DB from "../../models";
import Express from "express";
import { comparePassword } from "../../helpers/auth";
import { validateEmail, generateAccessToken } from "../../helpers/adminAuth";
const router = Express.Router();

const accessDenied = (res) => {
  return res.status(400).json({
    errors: "ACCESS_DENIED",
  });
};

// admins login endpoint
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate admin email
    if (!validateEmail(email)) {
      return accessDenied(res);
    }
    // validate admin password
    if (typeof password !== "string") {
      return accessDenied(res);
    }
    const admin = await DB.Admin.findOne({
      where: {
        email,
      },
    });
    // validate if email exists
    if (!admin) {
      return accessDenied(res);
    }
    // validate admin's password
    if (!comparePassword(password, admin.password_hash)) {
      return accessDenied(res);
    }
    // email and password validated
    const accessToken = generateAccessToken(admin);
    res.status(200).json({
      message: "Logged in succesfully",
      token: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

export default router;
