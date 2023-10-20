const router = require("express").Router();
const db = require("../../config/connection");
const { Thoughts, Users } = require("../../models/index");

// /api/users

router.get("/", async (req, res) => {
  try {
    const result = await Users.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Users.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await Users.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      //adds id to friends array
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    //populates based on ids in friends array and references users model
    const result = await user.populate("friends");

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      //deletes friend in friends array where Id matches
      { $pull: { friends: { $in: [req.params.friendId] } } },
      { new: true }
    );
    //then repopulate if you want to see full friends data
    const result = await user.populate("friends");

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!result) {
      console.log("No user with this id.");
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Users.findOneAndRemove({ _id: req.params.id });

    if (!result) {
      console.log("No user with this id.");
    }

    //get users thought ids, create another try catch block, find all thoughts through thought ids and delete them

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
