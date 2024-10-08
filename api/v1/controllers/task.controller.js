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

module.exports.changeMulti = async (req, res) => {
  try {
    const { ids, key, value } = req.body

    switch (key) {
      case "status":
        await Task.updateMany({
          _id: { $in: ids },
        }, {
          status: value
        })

        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!"
        })
        break;
      case "delete":
        await Task.updateMany({
          _id: { $in: ids },
        }, {
          deleted: true
        })

        res.json({
          code: 200,
          message: "Xóa thành công các công việc!"
        })
        break;
      default:
        res.json({
          code: 400,
          message: "Không tồn tại trạng thái!"
        })
    }
  }
  catch (e) {
    res.json({
      code: 400,
      message: "Không tồn tại!"
    })
  }
}

module.exports.create = async (req, res) => {
  try {
    req.body.createdBy = req.user.id
    const task = new Task(req.body)
    const data = await task.save()

    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: data
    })
  } catch (e) {
    res.json({
      code: 400,
      message: "Lỗi!"
    })
  }
}

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    console.log(req.body)

    await Task.updateOne({ _id: id }, req.body)

    res.json({
      code: 200,
      message: "Cập nhật thành công!"
    })
  } catch (e) {
    res.json({
      code: 400,
      message: "Lỗi!"
    })
  }
}

module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    console.log(id)
    console.log(req.body)

    await Task.updateOne({
      _id: id
    },
      {
        deleted: true,
        deletedAt: new Date()
      }
    )

    res.json({
      code: 200,
      message: "Xóa thành công!"
    })
  } catch (e) {
    res.json({
      code: 400,
      message: "Lỗi!"
    })
  }
}

