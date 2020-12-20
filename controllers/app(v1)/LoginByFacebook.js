import DB from "../../models";
import Express from "express";
import fetch from "node-fetch";
import {
  generateAccessToken,
  generateRefreshToken,
  bcryptHash,
} from "../../helpers/auth";
import {
  generateReferralCode,
  validateReferral,
  applyReferral,
} from "../../helpers/referrals";
const router = Express.Router();

// Login by Facebook (check if user exists or not then return appropriate response)
router.post("/", async (req, res) => {
  try {
    const fbToken = req.body.fbToken;
    let fbInfo = await fetch(
      `https://graph.facebook.com/v9.0/me?fields=id&access_token=${fbToken}`
    );
    fbInfo = await fbInfo.json();

    // Search in the DB if user exists
    const user = await DB.User.findOne({
      where: {
        uid_provider: "facebook",
        uid: fbInfo.id,
      },
      attributes: [
        "id",
        "uid",
        "uid_provider",
        "first_name",
        "last_name",
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

    // If user doesnt exist, return 404 to continue user registeration flow
    if (!user) {
      return res.status(404).json({
        message: "No user found, continue with registeration",
      });
    }

    // If user already exists then continue user login flow
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
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

// Finish registeration using Facebook
router.post("/finish", async (req, res) => {
  try {
    let referralValid = false;
    const user = Object.assign({}, req.body);
    // Send a Graph request to get user first/last names and ID
    let fbInfo = await fetch(
      `https://graph.facebook.com/v9.0/me?fields=id,first_name,last_name&access_token=${user.fbToken}`
    );
    fbInfo = await fbInfo.json();
    user.first_name = fbInfo.first_name;
    user.last_name = fbInfo.last_name;
    user.uid = fbInfo.id;
    // Check if user has verified his phone number using OTP
    const OTPrecord = await DB.OTP.findOne({
      where: {
        phone_number: user.phone_number,
      },
    });
    if (!OTPrecord || !OTPrecord.verified) {
      return res.status(400).json({
        errors: "PHONE_NOT_VERIFIED",
      });
    }
    // Remove OTP record
    await OTPrecord.destroy();
    // apply referal to users
    if (
      user.hasOwnProperty("referring_user_code") &&
      user.referring_user_code !== ""
    ) {
      const [referralErrors, referringUser] = await validateReferral(
        user.referring_user_code
      );
      if (referralErrors.length > 0) {
        return res.status(400).json({
          errors: referralErrors,
        });
      }
      user.referred_by_id = referringUser.id;
      referralValid = true;
    } else {
      user.referred_by_id = null;
    }
    const newUser = await DB.User.create({
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      platform: user.platform,
      referral_code: generateReferralCode(user.first_name),
      referred_by_id: user.referred_by_id,
      uid: user.uid,
      uid_provider: "facebook",
    });
    // apply referral reward to both users
    if (referralValid) {
      await applyReferral(newUser.id, newUser.referred_by_id);
      newUser.wallet = 20;
    }
    // Attach access/refresh tokens to response headers
    // Generate access/refresh tokens
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken();
    res.setHeader("access-token", accessToken);
    res.setHeader("refresh-token", refreshToken);
    return res.status(201).json({
      message: "User was created",
      data: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        phone_number: newUser.phone_number,
        referral_code: newUser.referral_code,
        wallet: newUser.wallet,
      },
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
