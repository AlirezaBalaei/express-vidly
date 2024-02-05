const express = require("express")
const { db } = require("./database")
const app = express()
const port = process.env.PORT || 3000

app.get("/", (req, res) => {
  res.send("")
})

app.get("/api/genres", (req, res) => {
  return res.json(db.tables.genres)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})