const express = require("express");
const {
  createPlace,
  getPlaces,
  getPlace,
  updatePlace,
  deletePlace,
} = require("../controllers/placeController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.post("/create", verifyToken, createPlace);
router.get("/", getPlaces);
router.get("/:id?", getPlace);
router.put("/update/:id", verifyToken, updatePlace);
router.delete("/update/:id", verifyToken, deletePlace);

module.exports = router;
