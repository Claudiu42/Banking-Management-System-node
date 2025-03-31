const express = require("express");
const router = express.Router();

const {
  getAllBanci,
  createBanca,
  updateBanca,
  deleteBanca,
} = require("../controller/banci");

router.get("/", getAllBanci);
router.post("/", createBanca);
router.patch("/:id", updateBanca);
router.delete("/:id", deleteBanca);

module.exports = router;
