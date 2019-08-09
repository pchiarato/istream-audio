const express = require('express');
const router = express.Router();
const rest = require('./../services/rest');

const baseUrl = 'http://ws.audioscrobbler.com';

// router.get('/', (req, res) => res.status(200).send('ok'));

router.get('/', async (req, res) => {
  res.status(200).json('ok');
  // try {
  //   const data = await rest.get(`${baseUrl}/2.0/?method=track.getInfo&artist=cher&track=believe`);
  //   res.status(200).json(data);

  // } catch(error) {
  //   console.log(error);
  //   res.status(400).json('Error while fetching data');
  // }

})

module.exports = router;
