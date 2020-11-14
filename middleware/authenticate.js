/*
 *
 * Middleware for authenticating requests
 *
 */

import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    if (jwt.verify(accessToken, process.env.TOKEN_SECRET)) {
      return next();
    }
  } catch (error) {
    res.status(401).json({ errors: [error.name] });
  }
};
