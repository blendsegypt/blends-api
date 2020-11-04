import DB from "../models";
import { Op } from "Sequelize";

// Define unique validation errors and return a string of errors
const generateErrors = function (
  { phone_number, email, password_salt },
  validationData
) {
  const errors = [];
  for (let key in validationData) {
    if (phone_number == validationData[key].phone_number) {
      if (!errors.includes("PHONE_NUMBER_EXISTS")) {
        errors.push("PHONE_NUMBER_EXISTS");
      }
    }
    if (email == validationData[key].email && email != null) {
      if (!errors.includes("EMAIL_EXISTS")) {
        errors.push("EMAIL_EXISTS");
      }
    }
    if (password_salt == validationData[key].password_salt) {
      if (!errors.includes("PASSWORD_SALT_EXISTS")) {
        errors.push("PASSWORD_SALT_EXISTS");
      }
    }
  }
  return errors;
};

// check for existing unique parameters before creating users
const checkIfExists = async function ({
  phone_number = "",
  email = "",
  password_salt = "",
}) {
  try {
    // SELECT * FROM User WHERE "phone_number" = user.phone_number OR "email" ...
    const or = [];
    const attributes = [];
    if (phone_number !== "") {
      or.push({ phone_number });
      attributes.push("phone_number");
    }
    if (email !== "") {
      or.push({ email });
      attributes.push("email");
    }
    if (password_salt !== "") {
      or.push({ password_salt });
      attributes.push("password_salt");
    }
    // If no attributes supplied, return out of function.
    if (attributes.length === 0) {
      return {
        flag: true,
        message: "No fields supplied to checkIfExists()",
      };
    }
    const exist = await DB.User.findAll({
      where: {
        [Op.or]: or,
      },
      attributes: attributes,
      raw: true,
    });
    if (exist.length === 0) {
      return {
        flag: true,
      };
    } else {
      return {
        flag: false,
        errors: generateErrors({ phone_number, email, password_salt }, exist),
      };
    }
  } catch (error) {
    throw error;
  }
};

export { checkIfExists };
