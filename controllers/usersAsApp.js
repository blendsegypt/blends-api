import DB from "../models";
import Express from "express";
const router = Express.Router();
import generateOTP from "../helpers/generateOTP";
import validatePhoneNumber from "../helpers/validatePhoneNumber";
import { validateUserFields } from "../helpers/users";

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

//register a new user
router.post("/register", async (req, res) => {
  try {
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
    const newUser = await DB.User.create({
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      platform: user.platform,
      password_hash: user.password_hash,
      password_salt: user.password_salt,
    });

    return res.status(201).json({
      message: "User was created",
      user: {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        phone_numer: newUser.phone_number,
        platform: newUser.platform,
      },
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;