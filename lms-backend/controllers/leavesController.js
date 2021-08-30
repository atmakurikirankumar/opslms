const Leave = require("../models/Leave");
const User = require("../models/User");
const Team = require("../models/Team");

const moment = require("moment");
const { extractWeekDaysBetweenTwoDates, groupBy } = require("../utils/leavesUtil");

// add leave
const addLeave = async (req, res) => {
  const { startdate, enddate, comments } = req.body;
  let leave;
  const criteria = { startdate, enddate, user: req.user._id };
  try {
    leave = await Leave.findOne(criteria);
    if (leave) {
      return res
        .status(400)
        .json({ message: "Leave Request already submitted with provided Start date and end Date" });
    }

    leave = new Leave({ ...criteria, comments, team: req.user.team });
    const savedLeave = await leave.save();
    return res.status(201).json(savedLeave);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// get leaves for a user
const getLeaves = async (req, res) => {
  const sysDate = moment(new Date().toISOString()).format("YYYY-MM-DD");
  try {
    const leaves = await Leave.find({ user: req.user._id, enddate: { $gte: sysDate } }).sort({
      startdate: 1,
    });
    return res.status(200).json(leaves);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// get leave by id
const getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(400).json({ message: "Leave Request Not Found" });
    }
    return res.status(200).json(leave);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// update leave by id
const updateLeaveById = async (req, res) => {
  const { startdate, enddate, comments } = req.body;
  const criteria = { startdate, enddate, user: req.user._id };
  let leave;
  try {
    leave = await Leave.findOne(criteria);
    if (leave) {
      return res
        .status(400)
        .json({ message: "Leave Request already submitted with provided Start date and end Date" });
    }

    leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { startdate, enddate, comments },
      { new: true }
    );
    if (!leave) {
      return res.status(400).json({ message: "Leave Request Not Found" });
    }
    return res.status(200).json(leave);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// remove leave by id
const removeLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(400).json({ message: "Leave Request Not Found" });
    }
    await leave.deleteOne();
    return res.status(200).json({ message: "Leave Request removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// get your team leaves
const getTeamLeavesByUserId = async (req, res) => {
  try {
    if (req.params.id !== req.user._id.toString()) {
      return res.status(401).json({ message: "Error: Unauthorized" });
    }
    const sysDate = moment(new Date().toISOString()).format("YYYY-MM-DD");
    const team = req.user.team;
    const leaves = await Leave.find({
      team,
      enddate: { $gte: sysDate },
    }).sort({ startdate: 1 });
    const leavesWithUserDetails = [];
    for (const leave of leaves) {
      const userdetails = await User.findById(leave.user).select("-password");
      leave.user = userdetails;
      leavesWithUserDetails.push(leave);
    }
    return res.status(200).json(leavesWithUserDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// get your team leaves group by current year months
const getTeamLeavesByUserIdAndGroupByCurrentYearMonth = async (req, res) => {
  const currentYearFirstDate = moment().startOf("year").format("YYYY-MM-DD");
  const team = req.user.team;
  try {
    const currentYearLeaves = await Leave.find({
      team,
      startdate: { $gte: currentYearFirstDate },
    }).sort({ startdate: 1 });

    const extractedDays = currentYearLeaves.map((leave) => {
      const sdate = leave.startdate.toISOString().substring(0, 10),
        edate = leave.enddate.toISOString().substring(0, 10),
        leaveDates = extractWeekDaysBetweenTwoDates(sdate, edate);

      return leaveDates.map((ldate) => {
        return {
          id: leave._id,
          user: leave.user,
          leaveDate: ldate,
          leaveMonth: ldate.substring(5, 7),
        };
      });
    });

    const extractedData = extractedDays.flat();

    const groupByMonthData = groupBy("leaveMonth")(extractedData);

    return res.status(200).json([
      {
        monthname: "January",
        LeavesTaken: groupByMonthData["01"] ? groupByMonthData["01"].length : 0,
      },
      {
        monthname: "February",
        LeavesTaken: groupByMonthData["02"] ? groupByMonthData["02"].length : 0,
      },
      {
        monthname: "March",
        LeavesTaken: groupByMonthData["03"] ? groupByMonthData["03"].length : 0,
      },
      {
        monthname: "April",
        LeavesTaken: groupByMonthData["04"] ? groupByMonthData["04"].length : 0,
      },
      {
        monthname: "May",
        LeavesTaken: groupByMonthData["05"] ? groupByMonthData["05"].length : 0,
      },
      {
        monthname: "June",
        LeavesTaken: groupByMonthData["06"] ? groupByMonthData["06"].length : 0,
      },
      {
        monthname: "July",
        LeavesTaken: groupByMonthData["07"] ? groupByMonthData["07"].length : 0,
      },
      {
        monthname: "August",
        LeavesTaken: groupByMonthData["08"] ? groupByMonthData["08"].length : 0,
      },
      {
        monthname: "September",
        LeavesTaken: groupByMonthData["09"] ? groupByMonthData["09"].length : 0,
      },
      {
        monthname: "October",
        LeavesTaken: groupByMonthData["10"] ? groupByMonthData["10"].length : 0,
      },
      {
        monthname: "November",
        LeavesTaken: groupByMonthData["11"] ? groupByMonthData["11"].length : 0,
      },
      {
        monthname: "December",
        LeavesTaken: groupByMonthData["12"] ? groupByMonthData["12"].length : 0,
      },
    ]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// get all leaves
const getAllLeaves = async (req, res) => {
  try {
    const sysDate = moment(new Date().toISOString()).format("YYYY-MM-DD");
    const leaves = await Leave.find({
      enddate: { $gte: sysDate },
    }).sort({ startdate: 1 });
    const leavesWithUserDetails = [];
    for (const leave of leaves) {
      const userdetails = await User.findById(leave.user).select("-password");
      leave.user = userdetails;

      const {
        _id,
        user: { firstname, lastname, username },
        startdate,
        enddate,
        comments,
        createdAt,
        updatedAt,
        team,
      } = leave;

      const teamModel = await Team.findById(team);

      leavesWithUserDetails.push({
        _id,
        firstname,
        lastname,
        username,
        team: teamModel.name,
        startdate,
        enddate,
        comments,
        submittedOn: createdAt,
        lastModifiedOn: updatedAt,
      });
    }

    return res.status(200).json(leavesWithUserDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// get all team leaves group by current year months
const getAllTeamLeavesGroupByCurrentYearMonth = async (req, res) => {
  const currentYearFirstDate = moment().startOf("year").format("YYYY-MM-DD");
  try {
    const currentYearLeaves = await Leave.find({
      startdate: { $gte: currentYearFirstDate },
    }).sort({ startdate: 1 });

    const extractedDays = currentYearLeaves.map((leave) => {
      const sdate = leave.startdate.toISOString().substring(0, 10),
        edate = leave.enddate.toISOString().substring(0, 10),
        leaveDates = extractWeekDaysBetweenTwoDates(sdate, edate);

      return leaveDates.map((ldate) => {
        return {
          id: leave._id,
          user: leave.user,
          leaveDate: ldate,
          leaveMonth: ldate.substring(5, 7),
        };
      });
    });

    const extractedData = extractedDays.flat();

    const groupByMonthData = groupBy("leaveMonth")(extractedData);

    return res.status(200).json([
      {
        monthname: "January",
        LeavesTaken: groupByMonthData["01"] ? groupByMonthData["01"].length : 0,
      },
      {
        monthname: "February",
        LeavesTaken: groupByMonthData["02"] ? groupByMonthData["02"].length : 0,
      },
      {
        monthname: "March",
        LeavesTaken: groupByMonthData["03"] ? groupByMonthData["03"].length : 0,
      },
      {
        monthname: "April",
        LeavesTaken: groupByMonthData["04"] ? groupByMonthData["04"].length : 0,
      },
      {
        monthname: "May",
        LeavesTaken: groupByMonthData["05"] ? groupByMonthData["05"].length : 0,
      },
      {
        monthname: "June",
        LeavesTaken: groupByMonthData["06"] ? groupByMonthData["06"].length : 0,
      },
      {
        monthname: "July",
        LeavesTaken: groupByMonthData["07"] ? groupByMonthData["07"].length : 0,
      },
      {
        monthname: "August",
        LeavesTaken: groupByMonthData["08"] ? groupByMonthData["08"].length : 0,
      },
      {
        monthname: "September",
        LeavesTaken: groupByMonthData["09"] ? groupByMonthData["09"].length : 0,
      },
      {
        monthname: "October",
        LeavesTaken: groupByMonthData["10"] ? groupByMonthData["10"].length : 0,
      },
      {
        monthname: "November",
        LeavesTaken: groupByMonthData["11"] ? groupByMonthData["11"].length : 0,
      },
      {
        monthname: "December",
        LeavesTaken: groupByMonthData["12"] ? groupByMonthData["12"].length : 0,
      },
    ]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addLeave,
  getLeaves,
  removeLeaveById,
  getLeaveById,
  updateLeaveById,
  getTeamLeavesByUserId,
  getTeamLeavesByUserIdAndGroupByCurrentYearMonth,
  getAllLeaves,
  getAllTeamLeavesGroupByCurrentYearMonth,
};
