/**
 * takes a url and a local path file
 * 
 * should return:
 * > node fetcher.js http://www.example.edu/ ./index.html
 * Downloaded and saved 3261 bytes to ./index.html
 * 
 * connect to website
 * make http request and wait for response
 * after, use fs.writeFile() write the html to the file
 * cut the starter bit off?
 * 
 * 1 char = 1 byte
 */

const fs = require('fs');
const request = require('request');

//grabs input and removes excess
const input = process.argv
input.splice(0, 2);



const checkBytes = (file) => {
  fs.readFile(file, 'utf8', (readErr, data) => {
    if(readErr) {
      return console.log(`Error at readFile: ${readErr}`)
    } else {
      console.log(`Downloaded and saved ${data.length} bytes to ${file}`)
      return (data.length);
    }
  })
};


// fetcher
const fetcher = function (url, local) {
  request(url, (reqErr, response, body) => {
    if (reqErr) {
      return console.log(`Error at request: ${reqErr}`);
    }

    fs.writeFile(local, body, writErr => {
      if (writErr) {
        return console.log(`Error at writeFile: ${writErr}`)
      
      } else {
        checkBytes(input[1]);
      }
      })

    });
};


// run
fetcher(input[0], input[1]);