const Team = require("../models/Team");

// get all teams
const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({}).sort({ name: 1 });
    return res.status(200).json(teams);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// get team by id
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(400).json({ message: "Team Not Found" });
    }
    return res.status(200).json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//update team by id
const updateTeamById = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!team) {
      return res.status(400).json({ message: "Team Not Found" });
    }
    return res.status(200).json(team);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// add new team
const addTeam = async (req, res) => {
  try {
    const team = new Team({ name: req.body.teamname });
    const savedTeam = await team.save();
    return res.status(201).json({ message: "Team created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

//delete team by id
const deleteTeamById = async (req, res) => {
  let team;
  try {
    team = await Team.findByIdAndDelete(req.params.id);
    if (team) {
      return res.status(200).json({ message: "Team Removed" });
    } else {
      return res.status(500).json({ message: "Unable to remove team" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { getTeams, addTeam, deleteTeamById, getTeamById, updateTeamById };
