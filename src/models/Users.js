import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
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
  userType: {
    type: String,
    role: {
      type: String,
      enum: ["guest", "regular", "admin"],
      default: "regular",
    },
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  hashPassword: {
    type: String,
    minlenght: 8,
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

export default User;
