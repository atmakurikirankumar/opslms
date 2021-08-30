const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Team = require("../models/Team");
const Role = require("../models/Role");
const generateToken = require("../utils/generateToken");
const Leave = require("../models/Leave");
const moment = require("moment");

// Signup
const registerUser = async (req, res) => {
  const { firstname, lastname, username, password, team } = req.body;
  let { role } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Error: User already exists" });
    }

    const roleDocument = await Role.findOne({ name: role ? role : "ROLE_USER" });
    if (!roleDocument) {
      return res.status(400).json({ message: `Error: ${role} role Not Found` });
    }

    const teamDocument = await Team.findOne({ name: team });
    if (!teamDocument) {
      return res.status(400).json({ message: `Error: ${team} Team Not Found` });
    }

    user = new User({
      firstname,
      lastname,
      username,
      password,
      team: teamDocument._id,
      role: roleDocument._id,
      isAdmin: role === "ROLE_ADMIN",
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const savedUser = await user.save();

    if (savedUser) {
      res.status(201).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        role: savedUser.role,
        team: savedUser.team,
        token: generateToken(user._id),
        isAdmin: savedUser.isAdmin,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Signin
const signinUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Error: Bad Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Error: Bad Credentials" });
    }

    const role = await Role.findById(user.role);
    if (!role) {
      return res.status(400).json({ message: "Error: Role Not Found" });
    }

    res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      role: user.role,
      team: user.team,
      token: generateToken(user._id),
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// reset password
const resetPassword = async (req, res) => {
  let { username, password } = req.body;
  let user;
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    user = await User.findOneAndUpdate({ username }, { password }, { new: true });

    if (user) {
      return res.status(200).json({ message: "Password Changed successfully" });
    } else {
      return res.status(400).json({ message: "Username does not exist" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// user profile
const getUserProfile = async (req, res) => {
  const currentYearFirstDate = moment().startOf("year").format("YYYY-MM-DD");

  try {
    let user = req.user;
    const team = await Team.findById(user.team);
    if (!team) {
      return res.status(404).json({ message: "Team Not Found" });
    }

    const role = await Role.findById(user.role);
    if (!role) {
      return res.status(404).json({ message: "Role Not Found" });
    }

    const leaves = await Leave.find({
      user: req.user._id,
      startdate: { $gte: currentYearFirstDate },
    });

    let leavesDays = leaves.map((leave) =>
      calculateNumberOfDays(formatdate(leave.startdate), formatdate(leave.enddate))
    );

    const leavesTakenThisYear = leavesDays.reduce((accu, curr) => accu + curr);

    return res.status(200).json({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      team: team.name,
      role: role.name,
      isAdmin: user.isAdmin,
      leavesTakenThisYear,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const calculateNumberOfDays = (sdate, edate) => {
  let start = moment(sdate);
  let end = moment(edate);
  let weekdayCounter = 0;
  while (start <= end) {
    if (start.format("ddd") !== "Sat" && start.format("ddd") !== "Sun") {
      weekdayCounter++;
    }
    start = moment(start).add(1, "days");
  }
  return weekdayCounter;
};

const formatdate = (date) => {
  return date.toISOString().substring(0, 10);
};

module.exports = { registerUser, signinUser, resetPassword, getUserProfile };
