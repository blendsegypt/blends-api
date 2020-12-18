import DB from "../../models";
import Express from "express";
import crypto from "crypto";
const router = Express.Router();

function base64decode(data) {
  while (data.length % 4 !== 0) {
    data += "=";
  }
  data = data.replace(/-/g, "+").replace(/_/g, "/");
  return new Buffer.from(data, "base64").toString("utf-8");
}

function parseSignedRequest(signedRequest, secret) {
  const encoded_data = signedRequest.split(".", 2);
  // decode the data
  const sig = encoded_data[0];
  const json = base64decode(encoded_data[1]);
  const data = JSON.parse(json);
  if (!data.algorithm || data.algorithm.toUpperCase() != "HMAC-SHA256") {
    throw Error(
      "Unknown algorithm: " + data.algorithm + ". Expected HMAC-SHA256"
    );
  }
  const expected_sig = crypto
    .createHmac("sha256", secret)
    .update(encoded_data[1])
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace("=", "");
  if (sig !== expected_sig) {
    throw Error("Invalid signature: " + sig + ". Expected " + expected_sig);
  }
  return data;
}

// Facebook user data deletion endpoint (Required to provide login by Facebook)
router.post("/", async (req, res) => {
  try {
    const fbData = parseSignedRequest(req.body.signed_request);
    const { user_id } = fbData;
    if (!user_id) {
      return res.status(400).json({
        message: "User ID not supplied",
      });
    }
    const user = await DB.User.delete({
      where: {
        uid: user_id,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }
    return res.status(200).json({
      message: "User data has been succesfully deleted",
      url: "",
      confirmation_code: user_id,
    });
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

export default router;
