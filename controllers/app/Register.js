import DB from "../../models";
import Express from "express";
const router = Express.Router();
import generateOTP from "../../helpers/generateOTP";
import validatePhoneNumber from "../../helpers/validatePhoneNumber";
import { validateUserFields, hashPassword } from "../../helpers/users";
import {
  generateReferralCode,
  validateReferral,
  applyReferral,
} from "../../helpers/referrals";
import { generateAccessToken, generateRefreshToken } from "../../helpers/auth";

//verify phone number and send OTP
router.post("/verify/phone", async (req, res) => {
  try {
    //Check if phone number is valid
    const phone_number = req.body.phone_number;
    if (!validatePhoneNumber(phone_number)) {
      return res.status(400).json({
        errors: ["INVALID_PHONE_NUMBER"],
      });
    }
    //Check if phone number already exists
    const phoneNumbers = await DB.User.findAll({
      where: {
        phone_number,
      },
    });
    if (phoneNumbers.length > 0) {
      return res.status(400).json({
        errors: ["PHONE_NUMBER_EXISTS"],
      });
    }
    // Generate OTP
    const OTP = generateOTP();
    // Create a record in OTP table
    await DB.OTP.create({
      phone_number,
      OTP,
    });
    /*

      To be coded: BulkSMS api request to send OTP

    */
    res.status(200).json({
      message: "OTP Sent",
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//resend OTP
router.post("/resend/otp", async (req, res) => {
  try {
    //Check if phone number is valid
    const phone_number = req.body.phone_number;
    if (!validatePhoneNumber(phone_number)) {
      return res.status(400).json({
        errors: ["INVALID_PHONE_NUMBER"],
      });
    }
    //Check if phone number already has an OTP and delete the record
    const previousOTP = await DB.OTP.destroy({
      where: {
        phone_number,
      },
    });
    if (!previousOTP) {
      return res.status(400).json({
        errors: ["NO_PREVIOUS_ATTEMPTS"],
      });
    }
    // Generate OTP
    const OTP = generateOTP();
    // Create a record in OTP table
    await DB.OTP.create({
      phone_number,
      OTP,
    });
    /*

      To be coded: BulkSMS api request to send OTP

    */
    res.status(200).json({
      message: "OTP Sent",
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//verify OTP
router.post("/verify/OTP", async (req, res) => {
  try {
    const { phone_number, OTP } = req.body;
    //validate OTP
    if (!validatePhoneNumber(phone_number) || OTP.length !== 4) {
      return res.status(400).json({
        error_message: "Invalid phone number or OTP",
      });
    }
    //search for a record that matches phone number and OTP
    const OTPrecord = await DB.OTP.findOne({
      where: {
        phone_number,
        OTP,
      },
    });
    if (OTPrecord) {
      // Remove OTP record (no longer necessary)
      await DB.OTP.update(
        { verified: true },
        {
          where: {
            phone_number,
            OTP,
          },
        }
      );
      res.status(200).json({ message: "OTP Verified" });
    } else {
      res.status(404).json({ error_message: "OTP doesnt match" });
    }
  } catch (error) {
    res.status(500).json({
      error_message: error.message,
    });
  }
});

//finish registeration
router.post("/finish", async (req, res) => {
  try {
    let referralValid = false;
    const user = req.body;
    // Validate fields
    const userFieldsErrors = validateUserFields(user);
    if (userFieldsErrors.length > 0) {
      return res.status(400).json({
        errors: userFieldsErrors,
      });
    }
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
    const hashedPassword = hashPassword(user.password);
    const newUser = await DB.User.create({
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      platform: user.platform,
      password_hash: hashedPassword.hash,
      password_salt: hashedPassword.salt,
      referral_code: generateReferralCode(user.first_name),
      referred_by_id: user.referred_by_id,
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
        phone_numer: newUser.phone_number,
        referral_code: newUser.referral_code,
        wallet: newUser.wallet,
      },
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
