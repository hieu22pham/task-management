const md5 = require("md5")
const User = require("../models/user.model")

//[POST] /api/v1/users/register
module.exports.register = async (req, res) => {
  req.body.password = md5(req.body.password)

  console.log(req.body)

  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false
  })

  console.log(existEmail)
  if (existEmail) {
    res.json({
      code: 400,
      message: "Email đã tồn tại!"
    })
  } else {
    const user = new User({
      fullName: req.body.fulName,
      email: req.body.email,
      password: req.body.password
    })

    user.save();

    const token = user.token;

    res.json({
      code: 200,
      message: "Tạo tài khoản thành công!",
      token: token
    })
  }



}