const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reaction_id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
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
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

//getter
function modifyDate(createdAt) {
  return createdAt.toLocaleString();
}

//not making it a document, only exporting schema
module.exports = reactionSchema;
