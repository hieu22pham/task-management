const express = require("express")
const database = require("./config/database")
const routesApiVer1 = require("./api/v1/routes/index.router")

require("dotenv").config()

const app = express()
const port = process.env.port

database.connect()

routesApiVer1(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})