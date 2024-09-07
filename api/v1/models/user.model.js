const mongoose = require("mongoose");

const generate = require("../../../helper/generate")

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: generate.generateRandomString(30)
    },
    status: {
      type: String,
      default: "active"
    },
    deleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema, "tasks");

module.exports = Task;