const express = require("express");
const router = express.Router();

const {
  getAllConturi,
  createCont,
  updateCont,
  deleteCont,
} = require("../controller/conturi_bancare");

router.get("/", getAllConturi); // Get all entries
router.post("/", createCont); // Create a new entry
router.patch("/:idcont", updateCont); // Update an existing entry
router.delete("/:idcont", deleteCont); // Delete a specific entry

module.exports = router;

//get all conturi sa imi returneze si id-ul si apoi patch/delete din frontend