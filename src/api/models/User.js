const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    lowercase: true,
    required: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    required: true,
  },
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  UserSchema,
  User,
};
