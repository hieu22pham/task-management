const express = require('express')
const router = express.Router();
const Task = require("../../../models/task.model")

router.get("/tasks", async (req, res) => {
  const tasks = await Task.find({
    deleted: false
  })

  res.json(tasks)
})

router.get("/tasks/detail/:id", async (req, res) => {
  try {
    const id = req.params.id

    const task = await Task.findOne({
      _id: id,
      deleted: false
    })

    res.json(task)
  } catch (e) {
    res.json("Không tìm thấy")
  }
})

module.exports = router;