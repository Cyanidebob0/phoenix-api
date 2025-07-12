const express = require("express");
const router = express.Router();
const {
  createObjectController,
  findObjectController,
  updateObjectController,
  deleteObjectController,
} = require("../controllers/gadget-controllers");

router.get("/", findObjectController);
router.post("/", createObjectController);
router.patch("/", updateObjectController);
router.delete("/", deleteObjectController);

module.exports = router;
