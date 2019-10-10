"use strict"
const axios = require('axios');
const TOKEN = 'DGfXPJmVnrpMe7NW5QRV2s6tgbmtI94U';

module.exports = function (){
  return new Promise(function (resolve, reject) {
    // 旧的接口：'https://api.gushi.ci/all.json'
    axios.get('https://v2.jinrishici.com/sentence',{
      headers: { 'X-User-Token': TOKEN },
    })
    .then(function (response) {
      resolve(response.data || {})
    }).catch(function (error){
      reject(error)
    });
  });
}