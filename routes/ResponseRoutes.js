const express = require("express");
const router = new express.Router();
const { getResponseById } = require("../controllers/ResponseController");

router.get("/form/:formId", getResponseById);

module.exports = router;
