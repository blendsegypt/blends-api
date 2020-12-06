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
        code: order.promo_code.toUpperCase(),
      },
    });
    return promoCode;
  } catch (error) {
    throw error;
  }
};

const isMaxUsageCountReached = (promoCode) => {
  return (promoCode.limited && promoCode.usage_count >= promoCode.max_usage_per_code) ? true : false;
}

const checkCodeUsage = (promoCode, order) => {
  if (!promoCode.active || promoCode.active === null) {
    return {
      isUsable: false,
      message: "Promo code not active",
    }
  }
  if (isMaxUsageCountReached(promoCode)) {
    return {
      isUsable: false,
      message: "Promocode is expired",
    }
  }
  if (isPromoCodeExpired(promoCode)) {
    return {
      isUsable: false,
      message: "Promo code is expired",
    }
  }
  if (!isMinAmountReached(order.sub_total, promoCode.min_order_value)) {
    return {
      isUsable: false,
      message: `Order value must be at least: ${promoCode.min_order_value}EGP`,
    }
  }
  return {
    isUsable: true,
    message: "PromoCode can be used",
  };
}

const checkUserUsage = async (promoCode, userId) => {
  try {
    const userPromoCode = await DB.UserPromoCode.findOne({
      where: {
        [Op.and]: [{ user_id: userId }, { promo_code_id: promoCode.id }],
      },
    });
    // promcode user usage reached maximum
    return (userPromoCode !== null && userPromoCode.usage >= promoCode.max_usage_per_user) ? false : true;
  } catch (error) {
    throw error;
  }
};

// apply promoCode on UserPromoCode and PromoCode tables in data base
// return boolean
const applyPromoCodeOnTable = async (promoCode, userId) => {
  try {
    let usageUpdated = false;
    const userPromoCode = await DB.UserPromoCode.findOne({
      where: {
        [Op.and]: [{ user_id: userId }, { promo_code_id: promoCode.id }],
      },
    });
    // promoCode not used by user
    // - create new user usage
    if (userPromoCode === null) {
      const newUserPromoCode = {
        usage: 1,
        user_id: userId,
        promo_code_id: promoCode.id,
      };
      await DB.UserPromoCode.create(newUserPromoCode);
      usageUpdated = true;
    }
    // promoCode used by user
    //  - check that promoCode can be re-used
    else if (userPromoCode.usage < promoCode.max_usage_per_user) {
      await DB.UserPromoCode.increment(
        'usage',
        {
          where: {
            [Op.and]: [
              { user_id: userId },
              { promo_code_id: promoCode.id },
            ],
          },
        });
      usageUpdated = true;
    }
    if (usageUpdated) {
      await DB.PromoCode.increment(
        'usage_count', {
        where: { id: promoCode.id },
      });
      // increment wallet with cashback amount
      if (promoCode.type === 'cashback') {
        await DB.User.increment({
          wallet: promoCode.cashback_amount,
        }, {
          where: { id: userId },
        });
      }
      return true;
    }
    // promoCode can't be used (reached maximum)
    return false;
  } catch (error) {
    throw error;
  }
};

// apply promo code on given order accordind to type
const applyPromoCodeOnOrder = (promoCode, order) => {
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
  order.promo_code = promoCode.code;
  return order;
};

export {
  isPromoCodeExpired,
  isMinAmountReached,
  isMaxUsageCountReached,
  getPromoCode,
  checkCodeUsage,
  checkUserUsage,
  applyPromoCodeOnTable,
  applyPromoCodeOnOrder,
};
