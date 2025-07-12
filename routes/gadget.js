const express = require("express");
const router = express.Router();
const {
  createObjectController,
  findObjectController,
  updateObjectController,
  deleteObjectController,
  selfDestructController,
} = require("../controllers/gadget-controllers");

router.get("/", findObjectController);
router.post("/", createObjectController);
router.patch("/", updateObjectController);
router.delete("/", deleteObjectController);

router.post("/:id/self-destruct", selfDestructController);

module.exports = router;
