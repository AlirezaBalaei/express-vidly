const express = require("express")
const router = express.Router()
const genres = require("../data/genres.json")
const fs = require("fs")

router.get("/", (req, res) => {
  return res.json(genres)
})

router.get("/:id", (req, res) => {
  const id = req.params.id
  const matchedGenre = getGenreById(id)
  res.send(matchedGenre)
})

router.post("/", (req, res) => {
  let error = null
  const id = req.body?.id
  console.log(req.body)
  const isValidId = !isNaN(+id)
  if(!isValidId) {
    res.send("id must be a unique number!")
    return
  }

  const isUniqueId = !getGenreById(id)
  const genre = {
    "id": String(id),
    "genre": String(req.body?.["genre"])
  }

  if(isUniqueId) {
    genres.push(genre)
    fs.writeFile("./data/genres.json", JSON.stringify(genres), function(err){
      if(err) {
        error = err
        res.send("something went wrong try again later!")
        return
      } else {
        res.send(genre)
        return
      }
    })
  } else {
    res.send("id must be unique!")
  }
})

function getGenreById(id) {
  return genres.find(genre => genre?.id == id)
}


module.exports = router