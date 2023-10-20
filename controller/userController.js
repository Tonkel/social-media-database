const { Users } = require("../models/index");

module.exports = {
  // Get all courses
  async getUsers(req, res) {
    try {
      const users = await Users.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
