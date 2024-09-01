const taskRoutes = require("./task.route")

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin

  const version = "/api/v1"

  app.use(PATH_ADMIN + `${version}/tasks`, taskRoutes)
}