const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


router.get('/', (req, res) => {
  const filePath = path.join(__dirname, './../audio/Haydn_Adagio.mp3');

  const fileSizeInBytes = fs.statSync(filePath);
  const range = req.headers.range || null;
  if (range) {
    const parts = range.replace('bytes=', '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10): fileSizeInBytes.size -1;
    const chunksize = (end - start) + 1;
    const f = fs.createReadStream(filePath, {start, end});
    res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSizeInBytes.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Type': 'audio/mpeg',
        'Content-Length': chunksize
      })
      f.pipe(res);

  } else {
    const f = fs.createReadStream(filePath);
    res.writeHead(200, {
      'Content-Type': 'audio/mpeg',
      'Content-length': fileSizeInBytes['size']
    })
    f.pipe(res);
  }


})




module.exports = router;
