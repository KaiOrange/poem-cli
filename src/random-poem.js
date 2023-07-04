"use strict"
const axios = require('axios');

module.exports = function (){
  return new Promise(function (resolve, reject) {
    axios.get('https://v1.jinrishici.com/all.json')
    .then(function (response) {
      resolve(response.data || {})
    }).catch(function (error){
      reject(error)
    });
  });
}