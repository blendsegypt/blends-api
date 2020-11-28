/*  

  Helpers for Inventory manipulation

*/
import DB from "../models";
import { Op } from "sequelize";

export const decrementRetailProductsInventory = async (
  OrderItems,
  branch_id
) => {
  try {
    OrderItems.forEach(async (item) => {
      await DB.Inventory.increment(
        {
          actual_stock: -1 * item.quantity,
        },
        {
          where: {
            branch_id,
            product_id: item.product_id,
          },
        }
      );
    });
  } catch (error) {
    throw error;
  }
};
