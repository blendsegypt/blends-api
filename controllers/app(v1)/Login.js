import DB from "../../models";
import Express from "express";
import validatePhoneNumber from "../../helpers/validatePhoneNumber";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  bcryptHash,
} from "../../helpers/auth";
const router = Express.Router();

router.post("/", async (req, res) => {
  try {
    const { phone_number, password } = req.body;
    // Validate phone number
    if (!validatePhoneNumber(phone_number) || !password) {
      return res.status(400).json({
        errors: ["INVALID_PHONE_NUMBER/PASSWORD"],
      });
    }
    // Get user record from DB
    const user = await DB.User.findOne({
      where: {
        phone_number,
      },
      attributes: [
        "id",
        "first_name",
        "last_name",
        "password_hash",
        "phone_number",
        "referral_code",
        "wallet",
      ],
      include: [
        {
          as: "addresses",
          model: DB.Address,
          include: [
            {
              model: DB.Area,
              attributes: ["id", "name"],
              include: [
                {
                  model: DB.Branch,
                  attributes: ["id"],
                  through: {
                    attributes: [],
                  },
                },
              ],
            },
          ],
        },
      ],
    });

    // If there's no records for that user then return 404
    if (!user) {
      return res.status(404).json({
        error: "INVALID_CREDENTIALS",
      });
    }

    // If wrong password (invalid phone_number/password to avoid guessing passwords)
    if (!comparePassword(password, user.password_hash)) {
      return res.status(400).json({
        error: "INVALID_CREDENTIALS",
      });
    }

    // Once reached here then phone_number/password combination is valid
    // Generate access/refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    // Delete any previous refresh tokens associated with that user
    await DB.RefreshToken.destroy({
      where: {
        user_id: user.id,
      },
    });

    // Save refresh token in the DB
    await DB.RefreshToken.create({
      user_id: user.id,
      token: bcryptHash(refreshToken),
    });

    // Attach access/refresh tokens to response headers
    res.setHeader("access-token", accessToken);
    res.setHeader("refresh-token", refreshToken);
    res.status(200).json({
      message: "User Logged In succesfully",
      data: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        referral_code: user.referral_code,
        wallet: user.wallet,
        addresses: user.addresses,
      },
    });
  } catch (errors) {
    res.status(500).json({ error_message: errors.message });
  }
});

export default router;
