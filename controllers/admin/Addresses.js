import DB from "../../models";
import Express from "express";
import { Op } from "sequelize";

const router = Express.Router({
  mergeParams: true, // retrieve params from previous middle wares
});

// create new address by user_id
router.post("/", async (req, res) => {
  try {
    const address = req.body;
    address.user_id = req.params.user_id;
    const newAddress = await DB.Address.create(address);
    return res.status(201).json({
      message: "Address has been succesfully created",
      data: newAddress,
    });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
});

// read all addresses by user_id
router.get("/", async (req, res) => {
  try {
    const addresses = await DB.Address.findAll({
      where: {
        user_id: req.params.user_id,
      },
      include: [DB.Area],
    });
    return res.status(200).json({
      message: "Address/es has been succesfully retreived",
      data: addresses,
    });
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
});

// read address by address_id and user_id
router.get("/:id", async (req, res) => {
  try {
    const address = await DB.Address.findOne({
      where: {
        [Op.and]: [{ id: req.params.id }, { user_id: req.params.user_id }],
      },
    });
    if (address !== null) {
      return res.status(200).json({
        message: "Address has been succesfully retreived",
        data: address,
      });
    } else {
      return res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
});

// update address by address_id and user_id
router.put("/:id", async (req, res) => {
  try {
    const address = req.body;
    const [numberOfAffectedRows] = await DB.Address.update(address, {
      where: {
        [Op.and]: [{ id: req.params.id }, { user_id: req.params.user_id }],
      },
      returning: true,
    });
    if (numberOfAffectedRows) {
      return res.status(201).json({
        message: "Address has been succesfully updated",
      });
    } else {
      return res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
});

// delete all addresses by user_id
router.delete("/", async (req, res) => {
  try {
    console.log("user_id: " + req.params.user_id);
    const addressesDeleted = await DB.Address.destroy({
      where: {
        user_id: req.params.user_id,
      },
    });
    if (addressesDeleted) {
      return res.status(200).json({
        message: "Address/es has been succesfully deleted",
      });
    } else {
      return res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
});

// delete ddress by address_id and user_id
router.delete("/:id", async (req, res) => {
  try {
    console.log("user_id: " + req.params.user_id);
    const addressDeleted = await DB.Address.destroy({
      where: {
        [Op.and]: [{ id: req.params.id }, { user_id: req.params.user_id }],
      },
    });
    if (addressDeleted) {
      return res.status(200).json({
        message: "Address has been succesfully deleted",
      });
    } else {
      return res.status(404).json({ message: "Address not found" });
    }
  } catch (error) {
    return res.status(500).json({ error_message: error.message });
  }
});

export default router;
