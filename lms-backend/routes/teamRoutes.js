const express = require("express");
const router = express.Router();
const {
  getTeams,
  addTeam,
  deleteTeamById,
  getTeamById,
  updateTeamById,
} = require("../controllers/teamController");
const { validate, addTeamValidations } = require("../utils/validator");
const { protect, admin } = require("../middlewares/authMiddleware");

router.route("/").get(getTeams).post(protect, admin, addTeamValidations(), validate, addTeam);

router
  .route("/:id")
  .delete(protect, admin, deleteTeamById)
  .get(protect, getTeamById)
  .put(protect, admin, updateTeamById);

module.exports = router;
