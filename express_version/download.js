const Album = require('./model').Album;
const Song = require('./model').Song;
const fs = require('fs');
const path = require('path');

const http = require('http');
const util = require('util');
const chalk = require('chalk');
const request = require('request');

let pAlbum = Album.findAll(
  {
    attributes: ['id','titleCn']
  }
)
let pSong = Song.findAll(
  {
    attributes: ['serial', 'highUrl', 'subTitle', 'album_id']
  }
)

function download(url, filePath, callback, downloadOne) {
  fs.exists(filePath, function (exists) {
    if(exists) {
      console.log(chalk.yellow('% ') + chalk.white(filePath) + chalk.yellow(' 已存在，不再下载'));
      downloadOne()
    } else {
      var stream = fs.createWriteStream(filePath);
      request(url).pipe(stream).on('close', callback);
    };
  });
}

Promise.all([pAlbum, pSong])
.then( results=>{
  let albums = results[0];
  let songs = results[1];

  let result = [];
  albums.forEach( album=>{
    let item = {};
    // item.albumName = album.titleCn;

    item.songs = songs
      .filter(song=>song.album_id === album.id)

    item.songs = item.songs.map(song=>({
      url: song.highUrl,
      filePath: path.resolve('.','songs', album.titleCn.toString(), song.serial.toString()+"_"+song.subTitle.toString()+".mp3")
    }))
    result = result.concat(item.songs);
  })

  let tempRe = result.slice(0,100);

  function downloadOne() {
    setTimeout( ()=>{
      if(tempRe.length > 0) {
        let item = tempRe.pop();
        let dirPath = item.filePath.split('/').slice(0, -1).join('/');

        fs.exists(dirPath, function (exists) {
          if(exists) {
            download(item.url, item.filePath, function () {
              console.log(chalk.green('✓ ') + chalk.yellow('下载 ') + chalk.blue(item.filePath) + chalk.green(' 成功!'));
              downloadOne();
            }, downloadOne)
          } else {
            fs.mkdir(dirPath, {recursive: true}, (err)=>{
              if(err) console.log(err)
              download(item.url, item.filePath, function () {
                console.log(chalk.green('✓ ') + chalk.yellow('下载 ') + chalk.blue(item.filePath) + chalk.green(' 成功!'));
                downloadOne();
              }, downloadOne)
            })

          };
        });
      } else {
        console.log(chalk.green('✓✓✓ ') + chalk.yellow('全部下载完成 '));
      }
    }, 2000)
  }

  downloadOne();
  // fs.writeFileSync('album.json', JSON.stringify(tempRe))
})