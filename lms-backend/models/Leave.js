const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    },
    startdate: {
      type: Date,
    },
    enddate: {
      type: Date,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
