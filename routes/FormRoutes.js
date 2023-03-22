const express = require("express");
const router = express.Router();
const {
  createForm,
  getFormById,
  formOngoing,
  formCompleted,
  formDraft,
  formByEmail,
  formCount,
} = require("../controllers/FormControllers");

router.post("/createform", createForm);
router.get("/form/:id", getFormById);
router.get("/:email", formByEmail);
router.get("/count/:email", formCount);
router.get("/completed/:email", formCompleted);
router.get("/ongoing/:email", formOngoing);
router.get("/draft/:email", formDraft);

module.exports = router;
