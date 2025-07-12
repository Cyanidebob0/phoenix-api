const express = require("express");
const router = express.Router();
const { createObjectController } = require("../controllers/gadget-controllers");

router.post("/", createObjectController);

module.exports = router;
