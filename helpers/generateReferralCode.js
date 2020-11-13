import { generateRandomString } from "./generateRandomString";

export const generateReferralCode = (userName) => {
    return (userName + generateRandomString(5, 'A#'));
}