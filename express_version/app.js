const express = require('express')
const app = express()
const port = 3000
const Album = require('./model').Album;
const Song = require('./model').Song;

app.get('/', (req, res) => {
  let albums = Album.findAll(
    {
      limit: 10,
      attributes: ['imgSrc', 'titleCn']
    }
  ).then(albums=>{
    res.send(albums) 
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))