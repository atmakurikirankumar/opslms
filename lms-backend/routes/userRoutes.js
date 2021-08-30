const express = require("express");
const {
  getAllUsers,
  getTeamSizeGroupByTeam,
  getNumberOfUsersInEachRole,
  deleteUserById,
  updateUserById,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/all").get(protect, admin, getAllUsers);
router.route("/teamsize").get(protect, admin, getTeamSizeGroupByTeam);
router.route("/rolesize").get(protect, admin, getNumberOfUsersInEachRole);
router.route("/:id").delete(protect, admin, deleteUserById).put(protect, admin, updateUserById);

module.exports = router;
