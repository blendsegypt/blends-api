/*
 *
 * Middleware for authenticating requests
 *
 */

import { verifyAccessToken } from "../helpers/auth";

export default async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const user_id = await verifyAccessToken(accessToken, false);
    res.locals.user_id = user_id;
    next();
  } catch (error) {
    res.status(401).json({ errors: [error.name] });
  }
};
