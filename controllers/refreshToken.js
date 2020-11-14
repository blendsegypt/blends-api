import DB from "../models";
import Express from "express";
const router = Express.Router();
import {
  verifyAccessToken,
  generateRefreshToken,
  generateAccessToken,
  bcryptHash,
} from "../helpers/auth";
import bcrypt from "bcryptjs";

//refresh access token using refresh token
router.post("/", async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    const accessToken = req.headers.authorization.split(" ")[1];
    // Validate access token (ignore expiry date since its probably expired) (decode and find user_id)
    const user_id = await verifyAccessToken(accessToken);
    // If access token is invalid
    if (!user_id) {
      return res.status(401).json({
        errors: ["INVALID_ACCESS_TOKEN"],
      });
    }
    // Validate refresh token
    if (!refreshToken) {
      return res.status(400).json({
        errors: ["NO_REFRESH_TOKENS"],
      });
    }
    // Validate refresh token in DB (delete if exists)
    const refreshTokenExists = await DB.RefreshToken.findOne({
      where: {
        user_id,
      },
    });
    // If refresh token doesn't match req refresh token
    if (!bcrypt.compareSync(refreshToken, refreshTokenExists.token)) {
      return res.status(401).json({
        errors: ["INVALID_REFRESH_TOKEN"],
      });
    }

    //Once reached here then access/refresh tokens are valid
    //Delete old refresh token
    refreshTokenExists.destroy();
    //Generate new tokens
    const newAccessToken = generateAccessToken({ id: user_id });
    const newRefreshToken = generateRefreshToken();
    //Create a record for new refresh token
    await DB.RefreshToken.create({
      user_id,
      token: bcryptHash(newRefreshToken),
    });
    // Attach new access/refresh tokens to response headers
    res.setHeader("access-token", newAccessToken);
    res.setHeader("refresh-token", newRefreshToken);
    res.status(200).json({
      message: "Token refreshed",
    });
  } catch (errors) {
    res.status(401).json({
      errors: errors,
    });
  }
});

export default router;
