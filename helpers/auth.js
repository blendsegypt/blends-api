import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const comparePassword = (password, dbHash) => {
  if (bcrypt.compareSync(password, dbHash)) {
    return true;
  }
  return false;
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "10s" });
};

export { comparePassword, generateToken };
