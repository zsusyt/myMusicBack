const express = require('express')
const app = express()
const port = 3000
const Sequelize = require('sequelize');

const sequelize = new Sequelize('music', 'crawler', '123456', {
  host: 'localhost',
  dialect: 'mysql',/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  define: {
    freezeTableName: true
  }
});

const Album = sequelize.define('album', {
  imgSrc: {
    type: Sequelize.STRING
  },
  titleCn: {
    type: Sequelize.STRING
  },
  titleEn: {
    type: Sequelize.STRING
  },
})

const Song = sequelize.define('song', {
  highUrl: {
    type: Sequelize.STRING
  },
  lowUrl: {
    type: Sequelize.STRING
  },
  subTitle: {
    type: Sequelize.STRING
  },
  serial: {
    type: Sequelize.INTEGER
  },
  album_id: {
    type: Sequelize.INTEGER
  },
})

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