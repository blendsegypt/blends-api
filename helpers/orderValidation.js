/*
 *
 *
 * Input/Data validation for making orders on App
 *
 *
 */

import DB from "../models";
import { Op } from "sequelize";

/*
 *
 * validJsonArray() => checks if json string is parsable array
 * @accepts: String
 * @returns: boolean
 *
 */

const validJSONArray = (json) => {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      return true;
    }
  } catch (errors) {
    return false;
  }
};

/*
 *
 * sanitizeOrder() => checks if order fields types are right
 * @accepts: Order{}
 * @returns: boolean
 *
 */

const sanitizeOrder = (order) => {
  const {
    branch_id,
    delivery_address_id,
    sub_total,
    delivery_charges,
    promo_code,
    total,
  } = order;
  // validate numeric fields
  if (
    isNaN(branch_id) ||
    isNaN(delivery_address_id) ||
    isNaN(sub_total) ||
    isNaN(delivery_charges) ||
    isNaN(total)
  ) {
    return false;
  }
  // validate if orderitems is an array
  if (!Array.isArray(order.OrderItems)) {
    return false;
  }
  // validate if promo_code is a string or is undefined
  if (promo_code && typeof promo_code !== "string") {
    return false;
  }
  // validate each order item
  const valid = true;
  order.OrderItems.forEach((item) => {
    const { product_id, quantity, options } = item;
    if (isNaN(product_id) || isNaN(quantity)) {
      valid = false;
    }
    if (!validJSONArray(options)) {
      valid = false;
    }
  });
  return valid;
};

/*
 *
 * calculateSubTotal() => calculates subtotal for an order
 * @accepts: (OrderItem[], Product[])
 * @returns: double
 *
 */

const calculateSubTotal = (orderItems, productsList) => {
  // Calculate server side subTotal to compare with client side sub_total
  const subTotal = orderItems.reduce((total, item) => {
    let itemTotal = 0;
    // find product and destruct it
    const { price, sale_price, product_custom_options } = productsList.find(
      (product) => product.id === item.product_id
    );
    // Add price or sale_price if there's a sale & Quantity
    itemTotal +=
      sale_price === 0 ? price * item.quantity : sale_price * item.quantity;
    // Parse options JSON string
    const selectedOptions = JSON.parse(item.options);
    // Calculate the price of additional options
    selectedOptions.forEach((option) => {
      // Find the option in ProductCustomOptions
      const productCustomOption = product_custom_options.find(
        (custom_option) => custom_option.label === option.label
      );
      // Find the price of the chosen value
      const optionPrice = productCustomOption.custom_options.find(
        (custom_option) => custom_option.label === option.value
      ).price;
      // Add options price on itemTotal
      itemTotal += optionPrice;
    });
    return total + itemTotal;
  }, 0);

  return subTotal;
};

/*
 *
 * validateOrder() => checks if order is valid
 * @accepts: Order{}
 * @returns: boolean
 *
 */

const validateOrder = async (order) => {
  try {
    // Sanitize Order fields
    if (!sanitizeOrder(order)) {
      return false;
    }
    // Find delivery address to validate branch and that it belongs to the user
    const address = await DB.Address.findOne({
      where: {
        id: order.delivery_address_id,
        user_id: order.user_id,
      },
      include: [
        {
          model: DB.Area,
          attributes: ["id"],
          include: [
            {
              model: DB.Branch,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
    // Verify that delivery_address_id belongs to the user
    if (!address) {
      return false;
    }
    // Verify that branch_id is the one which covers user area
    if (address.Area.Branches[0].id !== order.branch_id) {
      return false;
    }
    // Extract products IDs to combine them in 1 select query
    const productsIDs = order.OrderItems.map((item) => {
      return item.product_id;
    });
    // Select all products from OrderItems from DB
    const products = await DB.Product.findAll({
      where: {
        id: { [Op.in]: productsIDs },
      },
      attributes: ["id", "name", "price", "sale_price"],
      include: [
        {
          as: "product_custom_options",
          model: DB.ProductCustomOption,
          attributes: ["label"],
          include: [
            {
              as: "custom_options",
              model: DB.CustomOption,
              attributes: ["label", "price"],
            },
          ],
        },
      ],
    });
    // Validate if subtotal matches the one provided
    const serverSideSubTotal = calculateSubTotal(order.OrderItems, products);
    if (order.sub_total !== serverSideSubTotal) {
      return false;
    }
    // Validate if delivery charges are accurate
    if (order.delivery_charges !== 5) {
      return false;
    }
    // Validate total
    if (order.sub_total + order.delivery_charges !== order.total) {
      return false;
    }
    // Validate that promo_code exists (if supplied)
    if (order.promo_code) {
      const promo_code = await DB.PromoCode.findOne({
        where: {
          code: order.promo_code,
        },
      });
      if (!promo_code) {
        return false;
      }
    }
    // Everything is validated
    return true;
  } catch (errors) {
    throw errors;
  }
};

export { validateOrder };
