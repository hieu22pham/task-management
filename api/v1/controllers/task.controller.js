const Task = require("../models/task.model")
const paginationHelper = require("../../../helper/pagination")
const searchHelper = require("../../../helper/search")

module.exports.index = async (req, res) => {
  console.log(req.query)
  const find = {
    deleted: false
  }

  if (req.query.status) {
    find.status = req.query.status
  }

  const objectSearch = searchHelper(req.query)

  if (req.query.keyword) {
    find.title = objectSearch.regex
  }

  let initPagination = {
    currentPage: 1,
  }

  if (req.query.page) {
    initPagination.limitItem = 2
  }

  const countTasks = await Task.countDocuments(find)
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countTasks
  )

  const sort = {}

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue
  }
  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip)

  res.json(tasks)
}

module.exports.detail = async (req, res) => {
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
}

module.exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id
    const status = req.body.status

    await Task.updateOne({
      _id: id,
      status: status
    })



    console.log(req.body)
    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!"
    })
  } catch (e) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    })
  }
}