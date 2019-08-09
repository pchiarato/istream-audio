const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(`${__dirname}/dist`));

const port = 4000;

const server = http.createServer(app);

app.use('/api-test', require('./app-server/controllers/test.controller'));

app.use('/audio', require('./app-server/controllers/audio.controller'));

console.log(path.join(__dirname, './dist/index.html'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'))

});

server.listen(port, () => console.log(`Server listening on port ${port}`));
