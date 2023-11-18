const express = require("express");
const router = express.Router();
const {
  createNewPlace,
  getAllUserPlaces,
  getSinglePlace,
  updatePlace,
  getAllPlaces,
} = require("../controllers/placeController");

router.post("/places", createNewPlace);
router.get("/user-places", getAllUserPlaces);
router.get("/places/:id", getSinglePlace);
router.put("/places", updatePlace);
router.get("/places", getAllPlaces);

module.exports = router;
