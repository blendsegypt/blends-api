import DB from "../models";
import Express from "express";
const router = Express.Router();

//create new promoCode
router.post("/", async (req, res) => {
  try {
    const promoCode = req.body;
    const newPromoCode = await DB.PromoCode.create(promoCode);
    return res.status(201).json({
      message: "Promo code was succesfully created",
      data: newPromoCode,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//list all promoCodes
router.get("/", async (req, res) => {
  try {
    const promoCode = await DB.PromoCode.findAll({
      include: [
        {
          model: DB.Product,
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json({
      message: "Promo code succesfully retreived",
      data: promoCode,
    });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//update promoCode
router.put("/:id", async (req, res) => {
  try {
    const newPromoCode = req.body;
    const [numberOfAffectedRows] = await DB.PromoCode.update(newPromoCode, {
      where: {
        id: req.params.id,
      },
    });
    if (numberOfAffectedRows) {
      res.status(200).json({ message: "Promo code was succesfully updated" });
    } else {
      res.status(404).json({ message: "Promo code is not found!" });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

//delete promoCode
router.delete("/:id", async (req, res) => {
  try {
    const promoCodeDeleted = await DB.PromoCode.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (promoCodeDeleted) {
      res.status(200).json({ message: "Promo code was succesfully deleted" });
    } else {
      res.status(404).json({ message: "Promo code was not found!" });
    }
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

export default router;
