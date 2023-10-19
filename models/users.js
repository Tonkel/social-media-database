const { Schema, Types } = require("mongoose");
const Thoughts = require("./thoughts");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    unique: true,
    required: true,
    trim: true,
  },
  thoughts: [Thoughts._id],
  friends: [userSchema._id],
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
