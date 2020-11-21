import DB from "../models";
import { Op } from "Sequelize";

// checks for promo code expiry
const isPromoCodeExpired = (promoCode) => {
  const today = new Date();
  const startDate = new Date(promoCode.start_date);
  const endDate = new Date(promoCode.end_date);

  return today >= startDate && today <= endDate ? false : true;
};

// checks for min subtotal from promo code
const isMinAmountReached = (subTotal, minAmount) => {
  return subTotal >= minAmount ? true : false;
};

// returns promo code
const getPromoCode = async (order) => {
  try {
    const promoCode = await DB.PromoCode.findOne({
      where: {
        code: order.promo_code,
      },
    });
    return promoCode;
  } catch (error) {
    throw error;
  }
};

// checks and update user usage for promoCode
const checkUsage = async (promoCode, userId, preview) => {
  try {
    const userPromoCode = await DB.UserPromoCode.findOne({
      where: {
        [Op.and]: [{ user_id: userId }, { promo_code_id: promoCode.id }],
      },
    });
    // promoCode not used by user
    if (userPromoCode === null) {
      if (preview) return true;
      const newUserPromoCode = {
        usage: 1,
        user_id: userId,
        promo_code_id: promoCode.id,
      };
      await DB.UserPromoCode.create(newUserPromoCode);
      return true;
    }
    // promoCode used by user
    //  - promoCode can be re-used
    if (userPromoCode.usage < promoCode.max_usage_per_user) {
      if (preview) return true;
      const newUsage = userPromoCode.usage + 1;
      await DB.UserPromoCode.update(
        { usage: newUsage },
        {
          where: {
            [Op.and]: [{ user_id: userId }, { promo_code_id: promoCode.id }],
          },
        }
      );
      return true;
    }
    // promoCode can't be used (reached maximum)
    return false;
  } catch (error) {
    throw error;
  }
};

// apply promo code accordind to type
const applyPromoCode = (promoCode, order) => {
  switch (promoCode.type) {
    case "free_delivery":
      order.delivery_charges = 0;
      order.total = order.sub_total;
      break;
    case "percentage":
      order.sub_total -=
        (promoCode.percentage_discount / 100) * order.sub_total;
      order.total = order.sub_total + order.delivery_charges;
      break;
    case "fixed":
      order.sub_total -= promoCode.fixed_amount;
      order.total = order.sub_total + order.delivery_charges;
      break;
    case "cashback": // TO BE FIXED (WHEN WALLET IS MADE)
      order.cashback = promoCode.cashback_amount;
      break;
    case "free_item":
      if (promoCode.free_product != null) {
        order.orderItems.push({
          product_id: promoCode.free_product,
          quantity: promoCode.free_product_quantity,
          options: [],
          price: 0,
        });
      }
  }
  return order;
};

export {
  isPromoCodeExpired,
  isMinAmountReached,
  getPromoCode,
  checkUsage,
  applyPromoCode,
};
