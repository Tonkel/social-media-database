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
      default: Date.now,
      get: modifyDate,
    },
    reactions: [reactions],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//getter
function modifyDate(createdAt) {
  return createdAt.toLocaleString();
}

//virtual
thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//create table("collection")
const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;
