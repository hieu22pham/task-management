const Task = require("../models/task.model")
const paginationHelper = require("../../../helper/pagination")

module.exports.index = async (req, res) => {
  console.log(req.query)
  const find = {
    deleted: false
  }

  if (req.query.status) {
    find.status = req.query.status
  }

  let initPagination = {
    currentPage: 1,
    limitItems: 4
  }

  const countProducts = await Task.countDocuments(find)
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countProducts
  )

  const sort = {}

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue
  }
  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
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