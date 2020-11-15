import jwt from "jsonwebtoken";

const generateAccessToken = (admin) => {
  const payload = {
    id: admin.id,
  };
  return jwt.sign(payload, process.env.ADMIN_TOKEN_SECRET, {
    expiresIn: "12h",
  });
};

const verifyAccessToken = (accessToken, ignoreExpiration) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      accessToken,
      process.env.ADMIN_TOKEN_SECRET,
      {
        ignoreExpiration,
      },
      (error, payload) => {
        if (error) reject(["INVALID_ACCESS_TOKEN"]);
        resolve(payload.id);
      }
    );
  });
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export { generateAccessToken, validateEmail, verifyAccessToken };
