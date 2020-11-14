import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const comparePassword = (password, dbHash) => {
  if (bcrypt.compareSync(password, dbHash)) {
    return true;
  }
  return false;
};

const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "20s" });
};

const generateRefreshToken = () => {
  return jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: "30d" });
};

const verifyAccessToken = (accessToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      accessToken,
      process.env.TOKEN_SECRET,
      {
        ignoreExpiration: true,
      },
      (error, payload) => {
        if (error) reject(["INVALID_ACCESS_TOKEN"]);
        resolve(payload.id);
      }
    );
  });
};

const bcryptHash = (text) => {
  return bcrypt.hashSync(text);
};

export {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  bcryptHash,
  verifyAccessToken,
};
