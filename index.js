const express = require("express")
const database = require("./config/database")
require("dotenv").config()

const app = express()
const port = process.env.port

database.connect()

app.get("/tasks", (req, res) => {
  res.send("Danh sách các công việc")
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})