const express = require("express");
const router = express.Router();
const { createObjectController } = require("../controllers/gadget-controllers");
const { findObjectController } = require("../controllers/gadget-controllers");

router.get("/", findObjectController);
router.post("/", createObjectController);

module.exports = router;
