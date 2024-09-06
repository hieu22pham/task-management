const express = require("express")
const database = require("./config/database")
const routesApiVer1 = require("./api/v1/routes/index.router")
const bodyParser = require("body-parser")
const cors = require("cors")

require("dotenv").config()

const app = express()
const port = process.env.port

database.connect()

app.use(bodyParser.json())
app.use(cors())

routesApiVer1(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})