const express = require("express");
const router = express.Router();

const {
  getAllClienti,
  createClient,
  updateClient,
  deleteClient,
} = require("../controller/clienti");

router.get("/", getAllClienti);
router.post("/", createClient);
router.patch("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
