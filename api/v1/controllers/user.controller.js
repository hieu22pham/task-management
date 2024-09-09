const md5 = require("md5")
const User = require("../models/user.model")
const generateHelper = require("../../../helper/generate")
const sendMailHelper = require("../../../helper/sendMail")
const ForgotPassword = require("../models/forgot-password.model")


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
      password: req.body.password,
      token: generateHelper.generateRandomString(30)
    })

    user.save();

    const token = user.token;
    res.cookie("token", token)

    res.json({
      code: 200,
      message: "Tạo tài khoản thành công!",
      token: token
    })
  }
}

module.exports.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  const user = await User.findOne({
    email: email,
    deleted: false
  })

  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại!",
    })

    return;
  }
  if (md5(password) !== user.password) {
    res.json({
      code: 400,
      message: "Sai mật khẩu!",
    })
    return;
  }

  const token = user.token
  res.cookie("token", token)

  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
  })
}

module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email

  const user = await User.findOne({
    email: email,
    deleted: false
  })

  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại!",
    })

    return;
  }

  const otp = generateHelper.generateRandomNumber(6)
  const timeExpire = 3

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now() + timeExpire * 60 * 1000
  }

  const forgotPassword = new ForgotPassword(objectForgotPassword)

  await forgotPassword.save()

  const subject = "Mã OTP xác minh lấy lại mật khẩu"
  const html = `
  Mã OTP để lấy lại mật khẩu của bạn là <b>${otp}</b> (Sử dụng trong ${timeExpire} phút).
  Vui lòng không chia sẻ OTP này với bất kỳ ai.
  `;

  sendMailHelper.sendMail(email, subject, html)

  res.json({
    code: 200,
    message: "Mã OTP sẽ hết hạn sau 3 phút!",
  })
}

module.exports.otpPassword = async (req, res) => {
  try {
    const email = req.body.email
    const otp = req.body.otp

    const result = await ForgotPassword.findOne({
      email: email,
      otp: otp
    })

    if (!result) {
      res.json({
        code: 404,
        message: "Mã OTP không hợp lệ!",
      })

      return;
    }

    const user = await User.findOne({
      email: email
    })

    const token = user.token
    res.cookie("token", token)

    res.json({
      code: 200,
      message: "Xác thực thành công!",
      token: token
    })
  } catch (error) {
    res.json({
      code: 404,
      message: "Lỗi hệ thống",
    })
  }
}

module.exports.resetPassword = async (req, res) => {
  const token = req.cookies.token
  const password = req.body.password

  const user = await User.findOne({
    token: token
  })

  if (md5(password) === user.password) {
    res.json({
      code: 400,
      message: "Vui lòng nhập mật khẩu mới khác mật khẩu cũ",
    })

    return;
  }

  await User.updateOne({
    token: token
  },
    {
      password: md5(password)
    }
  )

  res.json({
    code: 200,
    message: "Đổi mật khẩu thành công!",
  })
}

module.exports.detail = async (req, res) => {
  try {
    const token = req.cookies.token;

    const user = await User.findOne({
      token: token,
      deleted: false
    }).select("-password -token")

    res.json({
      code: 200,
      message: "Lấy thông tin thành công!",
      info: user
    })
  } catch (error) {
    res.json({
      code: 404,
      message: "Lỗi hệ thống!",
    })
  }
}
