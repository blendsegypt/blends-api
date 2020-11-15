/*
 *
 * Middleware for authenticating admin requests
 *
 */

import { verifyAccessToken } from "../helpers/adminAuth";

export default async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    await verifyAccessToken(accessToken, false);
    next();
  } catch (error) {
    res.status(401).json({ error: "ACCESS_DENIED" });
  }
};
