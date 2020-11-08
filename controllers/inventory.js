import DB from "../models";
import Express from "express";
const router = Express.Router();

//get products inventory
router.get("/", async (req, res) => {
  try {
    const inventory = await DB.Inventory.findAll();
    res.status(200).json({
      message: "Inventory retrieved successfully",
      data: inventory,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//update inventory
router.put("/:id", async (req, res) => {
  try {
    const newInventory = req.body;
    const [numberOfAffectedrows] = await DB.Inventory.update(newInventory, {
      where: {
        id: req.params.id,
      },
    });
    if (numberOfAffectedrows) {
      res.status(200).json({
        message: "Inventory updated succesfully",
      });
    } else {
      res.status(404).json({
        message: "Inventory record not found",
      });
    }
  } catch (error) {}
});

export default router;
