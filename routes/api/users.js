const router = require("express").Router();
const db = require("../../config/connection");
const { Thoughts, Users } = require("../../models/index");
const { getUsers } = require("../../controller/userController");

// /api/users

// router.route("/").get(getUsers);

router.get("/", async (req, res) => {
  try {
    const result = await Users.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await Users.collection.insertOne(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

//todo make route to update user info by id
router.put("/:id", async (req, res) => {
  try {
    const result = await Users.collection.insertOne(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
