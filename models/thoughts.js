const { Schema, Types } = require("mongoose");
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
      default: Date.now,
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

thoughtsSchema.virtual("createdAt").get(function () {
  return this.createdAt.toLocaleString();
});
thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = mongoose.model("Thoughts", thoughtsSchema);

module.exports = Thoughts;
