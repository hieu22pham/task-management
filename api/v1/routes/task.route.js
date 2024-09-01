const express = require('express')
const router = express.Router();
const Task = require("../../../models/task.model")

router.get("", async (req, res) => {
  console.log(req.query)
  const find = {
    deleted: false
  }

  if (req.query.status) {
    find.status = req.query.status
  }

  const tasks = await Task.find(find)

  res.json(tasks)
})

router.get("/detail/:id", async (req, res) => {
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