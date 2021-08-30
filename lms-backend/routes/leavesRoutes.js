const express = require("express");
const router = express.Router();
const {
  addLeave,
  getLeaves,
  removeLeaveById,
  getLeaveById,
  updateLeaveById,
  getTeamLeavesByUserId,
  getTeamLeavesByUserIdAndGroupByCurrentYearMonth,
  getAllLeaves,
  getAllTeamLeavesGroupByCurrentYearMonth,
} = require("../controllers/leavesController");
const { protect, admin } = require("../middlewares/authMiddleware");
const { addLeaveValidationRules, validate } = require("../utils/validator");

router
  .route("/")
  .post(addLeaveValidationRules(), validate, protect, addLeave)
  .get(protect, getLeaves);

router.route("/all").get(protect, admin, getAllLeaves);
router.route("/all/groupbymonth").get(protect, admin, getAllTeamLeavesGroupByCurrentYearMonth);

router
  .route("/:id")
  .delete(protect, removeLeaveById)
  .get(protect, getLeaveById)
  .put(protect, addLeaveValidationRules(), validate, updateLeaveById);

router.route("/:id/team").get(protect, getTeamLeavesByUserId);

router.route("/team/groupbymonth").get(protect, getTeamLeavesByUserIdAndGroupByCurrentYearMonth);

module.exports = router;
