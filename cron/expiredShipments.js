import Cron from "node-cron";
import DB from "../models";

// Check expired shipments every day and update stock if required
Cron.schedule("0 0 * * *", async () => {
  const timeNow = new Date();
  try {
    const shipments = await DB.Shipment.findAll({
      where: {
        expired: false,
      },
    });
    shipments.forEach(async (shipment) => {
      if (shipment.expiry_date - timeNow < 0) {
        /*

          Expired Shipment

        */

        // Update Shipment record
        shipment.update({
          expired: true,
        });
        // Find Inventory record for shipment
        const inventoryRecord = await DB.Inventory.findOne({
          where: {
            product_id: shipment.product_id,
            branch_id: shipment.branch_id,
          },
        });

        // Calculate new stock
        const newActualStock =
          inventoryRecord.actual_stock - shipment.remaining_quantity;

        // Update Inventory record
        await DB.Inventory.update(
          {
            actual_stock: newActualStock,
          },
          {
            where: {
              id: inventoryRecord.id,
            },
          }
        );
      }
    });
  } catch (error) {
    console.log("Error(Expired Shipments Cron Job): " + error.message);
  }
});

export default Cron;
