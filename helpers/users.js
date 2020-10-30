
import DB from "../models";
import { Op } from "Sequelize"

// Define unique validation errors and return a string of errors 
const validationErrors = function (user, validationData) {
    const errors = []
    for (let obj in validationData) {
        if (user.phone_number == validationData[obj].phone_number) {
            if (!errors.includes("PHONE_NUMBER_EXISTS")) {
                errors.push("PHONE_NUMBER_EXISTS");
            }
        }
        if (user.email == validationData[obj].email && user.email != null) {
            if (!errors.includes("EMAIL_EXISTS")) {
                errors.push("EMAIL_EXISTS");
            }
        }
        if (user.password_salt == validationData[obj].password_salt) {
            if (!errors.includes("PASSWORD_SALT_EXISTS")) {
                errors.push("PASSWORD_SALT_EXISTS");
            }
        }
    }
    return errors;
}
const generateRandString = function () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
const generateRandInteger = function () {
    return Math.floor(Math.random() * 100);
}

// add random data in missing properties, in case of update
const fillMissing = function (user) {
    if (!user.hasOwnProperty('phone_number'))
        user = {
            "phone_number": generateRandInteger(),
        }
    if (!user.hasOwnProperty('email'))
        user.email = generateRandString() + "@random.com";
    if (!user.hasOwnProperty('password_salt'))
        user.password_salt = generateRandString();
    return (user);
}

// check for existing unique parameters before creating users
const checkIfExists = async function (user) {
    try {
        user = fillMissing(user);
        // SELECT * FROM User WHERE "phone_number" = user.phone_number OR "email" ...
        const exist = await DB.User.findAll({
            where: {
                [Op.or]: [
                    { "phone_number": user.phone_number }, { "email": user.email }, { "password_salt": user.password_salt }
                ],
            },
            attributes: ["phone_number", "email", "password_salt"],
            raw: true,
        });
        if (exist.length === 0) {
            return {
                flag: true,
                message: "data entered is unique",
            }
        }
        else {
            return {
                flag: false,
                message: "entered data is not unique",
                errors: validationErrors(user, exist),
            }
        }
    } catch (error) {
        console.log("serious problem !!!!");
        console.log({ error_message: error.message }); // ask khalid
    }
}

export { checkIfExists };
