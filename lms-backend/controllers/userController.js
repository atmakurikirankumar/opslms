const User = require("../models/User");
const Team = require("../models/Team");
const Role = require("../models/Role");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    let users_revised = [];
    for (const user of users) {
      const team = await Team.findById(user.team);
      const role = await Role.findById(user.role);
      users_revised.push({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        team: team.name,
        role: role.name,
        isAdmin: user.isAdmin,
      });
    }
    return res.status(200).json(users_revised);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getTeamSizeGroupByTeam = async (req, res) => {
  try {
    const teams = await User.aggregate([
      { $group: { _id: "$team", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    let usersByGroup = [];
    for (const t of teams) {
      const team = await Team.findById(t._id);
      usersByGroup.push({ teamname: team.name, count: t.count });
    }
    return res.status(200).json(usersByGroup);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getNumberOfUsersInEachRole = async (req, res) => {
  try {
    const roles = await User.aggregate([{ $group: { _id: "$role", count: { $sum: 1 } } }]);
    let usersByRole = [];
    for (const r of roles) {
      const role = await Role.findById(r._id);
      usersByRole.push({ rolename: role.name, count: r.count });
    }
    return res.status(200).json(usersByRole);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateUserById = async (req, res) => {
  try {
    const { firstname, lastname, teamname, isAdmin } = req.body;
    const team = await Team.findOne({ name: teamname });
    if (!team) {
      return res.status(404).json({ message: "Team Not Found" });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstname, lastname, team: team._id, isAdmin },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllUsers,
  getTeamSizeGroupByTeam,
  getNumberOfUsersInEachRole,
  deleteUserById,
  updateUserById,
};
