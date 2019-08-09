const axios = require('axios');
const settings = require('./../../settings');

const rest = {
  get: (url) => {
    return new Promise((resolve, reject) => {
      axios.get(`${url}&api_key=${settings.apiKey}&format=json`).then(response => {
        resolve(response.data);
      }).catch(error => reject(error));
    })
  },
  post: (url, body) => {
    return new Promise((resolve, reject) => {
      axios.post(`${url}&api_key${settings.apiKey}&format=json`, body).then(response => {
        resolve(response.data);
      }).catch(error => reject(error));
    })
  }
}


module.exports = rest;
