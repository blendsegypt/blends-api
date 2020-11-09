import DB from "../models";
import Express from "express";
const router = Express.Router();

//retrieve all shipments
router.get("/", async (req, res) => {
  try {
    const shipments = await DB.Shipment.findAll({
      include: [{ model: DB.Branch, attributes: ["name"] }],
    });
    res.status(200).json({
      message: "Shipments succesfully retrieved",
      data: shipments,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//Add new shipment
router.post("/", async (req, res) => {
  const shipment = req.body;
  let shipmentCreated = false;
  shipmentCreated = await DB.sequelize.transaction(async (t) => {
    // Create Shipment record
    await DB.Shipment.create(shipment, {
      include: [DB.Branch, DB.Product],
      transaction: t,
    });
    // Find inventory recorrd
    const inventoryRecord = await DB.Inventory.findOne({
      where: {
        product_id: shipment.product_id,
        branch_id: shipment.branch_id,
      },
    });
    // Increase inventory actual stock
    const newActualStock =
      inventoryRecord.actual_stock + shipment.purchased_quantity;
    await DB.Inventory.update(
      {
        actual_stock: newActualStock,
      },
      {
        where: {
          id: inventoryRecord.id,
        },
        transaction: t,
      }
    );
    return true;
  });
  if (shipmentCreated) {
    res.status(200).json({
      message: "Shipment was succesfully created",
    });
  } else {
    res.status(500).json({
      error_message: "An error occured during transaction",
    });
  }
});

//remove shipment
router.delete("/:id", async (req, res) => {
  try {
    let shipmentDeleted = false;
    shipmentDeleted = DB.sequelize.transaction(async (t) => {
      const shipment = await DB.Shipment.findByPk(req.params.id);
      await DB.Shipment.destroy({
        where: {
          id: req.params.id,
        },
        transaction: t,
      });
      // Find inventory recorrd
      const inventoryRecord = await DB.Inventory.findOne({
        where: {
          product_id: shipment.product_id,
          branch_id: shipment.branch_id,
        },
      });
      // Decrease inventory actual stock
      const newActualStock =
        inventoryRecord.actual_stock - shipment.purchased_quantity;
      await DB.Inventory.update(
        {
          actual_stock: newActualStock,
        },
        {
          where: {
            id: inventoryRecord.id,
          },
          transaction: t,
        }
      );
      return true;
    });
    if (shipmentDeleted) {
      res.status(200).json({
        message: "Shipment was succesfully deleted",
      });
    } else {
      res.status(404).json({
        message: "Shipment not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
