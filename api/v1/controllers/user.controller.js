const md5 = require("md5")

//[POST] /api/v1/users/register
module.exports.register = async (req, res) => {
  req.body.password = md5(req.body.password)

  console.log(req.body)

  

  res.json({
    code: 200,
    message: "Cập nhật trạng thái thành công!"
  })

}