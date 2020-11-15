import DB from "../models";
import { generateRandomString } from "./generateRandomString";

export const generateReferralCode = (userName) => {
    return (userName + generateRandomString(5, 'A#'));
}

// validate referral code existance
export const validateReferral = async (referralCode) => {
    const errors = [];
    try {
        const referringUser = await DB.User.findOne({
            where: {
                referral_code: referralCode,
            },
        });
        if (referringUser === null) {
            errors.push("INVALID_REFERRAL_CODE");
        }
        return [
            errors,
            referringUser,
        ]
    } catch (error) {
        throw error;
    }
}

// apply reward to referred user and referring user
export const applyReferral = async (referredUserId, referringUserId) => {
    try {
        const referredUserReward = 20;
        const refferingUserReward = 10;
        // add diffrent rewards to both wallet
        await DB.User.increment({ wallet: referredUserReward }, { where: { id: referredUserId } });
        await DB.User.increment({ wallet: refferingUserReward }, { where: { id: referringUserId } });

    } catch (error) {
        throw error;
    }
}