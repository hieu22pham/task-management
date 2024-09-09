const User = require("../models/user.model")

module.exports.requireAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")
    console.log(token[1])

    const user = await User.findOne({
      token: token,
      deleted: false
    })

    next()
  }
  else {
    res.json({
      code: 400,
      message: "Vui lòng gửi kèm token!"
    })
  }
}