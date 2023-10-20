const router = require("express").Router();
const db = require("../../config/connection");
const { Thoughts, Users } = require("../../models/index");

// /api/thoughts

router.get("/", async (req, res) => {
  try {
    const result = await Thoughts.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Thoughts.findById(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await Thoughts.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await Thoughts.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!result) {
      console.log("No thought with this id.");
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Thoughts.findOneAndRemove({ _id: req.params.id });

    if (!result) {
      console.log("No thought with this id.");
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(404).json(err);
  }
});
module.exports = router;
