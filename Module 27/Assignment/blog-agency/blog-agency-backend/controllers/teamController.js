const Team = require('../models/Team');

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
