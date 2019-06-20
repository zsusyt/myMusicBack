const Sequelize = require('sequelize');
const sequelize = require('./dbConnect').sequelize;

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

module.exports.Album = Album;
module.exports.Song = Song;