const express = require("express")
const database = require("./config/database")
const Task = require("./models/task.model")

require("dotenv").config()

const app = express()
const port = process.env.port

database.connect()



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})