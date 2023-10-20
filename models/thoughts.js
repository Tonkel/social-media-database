const { Schema, Types, model } = require("mongoose");
const reactions = require("./reaction");

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now.toLocaleString(),
    },
    reactions: [reactions],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;
