"use strict"
const axios = require('axios');

module.exports = function (){
  return new Promise(function (resolve, reject) {
    axios.get('https://api.gushi.ci/all.json')
    .then(function (response) {
      resolve(response.data || {})
    }).catch(function (error){
      reject(error)
    });
  });
}