"use strict"
const axios = require('axios');
const fs = require('fs');
const path = require('path');

let TOKEN = null;
let fileName = path.join(__dirname,'..', 'token.json');

function fetchData(resolve,reject){
  axios.get('https://v2.jinrishici.com/sentence',{
      headers: { 'X-User-Token': TOKEN },
    })
    .then(function (response) {
      resolve(response.data || {})
    }).catch(function (error){
      reject(error)
    });
}

module.exports = function (){
  return new Promise(function (resolve, reject) {
    // 旧的接口：'https://api.gushi.ci/all.json'
    fs.exists(fileName, function (exists) {
      if (!exists) {
        axios.get('https://v2.jinrishici.com/token').then(function (response) {
          TOKEN = response.data.data
          fs.writeFile(
            fileName,
            JSON.stringify(response.data),
            err => {
              if (err) throw err;
              fetchData(resolve, reject)
            }
          );
        })
      } else {
        fs.readFile(fileName, { encoding: 'utf8' }, (err, data) => {
          if (err) throw err;
          TOKEN = JSON.parse(data).data;
          fetchData(resolve, reject)
        });
      }
    });
  });
}