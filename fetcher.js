/*Implement a node app called fetcher.js.

It should take two command line arguments:

    a URL
    a local file path

It should download the resource at the URL to the local path on your machine. Upon completion, it should print out a message like Downloaded and saved 1235 bytes to ./index.html.

> node fetcher.js http://www.example.edu/ ./index.html
Downloaded and saved 3261 bytes to ./index.html

*/

// const args = process.argv.slice(2);

const URL = process.argv[2];
const localPath = process.argv[3];

const request = require('request');
const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetcher = function(URL, localPath) {

  request(URL, (error, response, body) => {

    if (error || response.statusCode !== 200) {
      console.log('error:', error, '\nURL was invalid, please try again');
      process.exit();

    } else {
      fs.readFile(localPath, 'utf8', (err, data) => {
        
        if (err) {
          console.log(`File path is invalid`);
          process.exit();

        } else {

          rl.question('File already exists, would you like to overwrite? Y/N', (answer) => {
            if (answer === 'y' || answer === 'Y') {
              fs.writeFile(localPath, body, (err) => {
                if (err) throw err;
        
                console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);

                rl.close();

              });

            } else {
              console.log('Please try again with another file path');
              rl.close();
            }
          });
        }
      });
    }
  });
};

fetcher(URL, localPath);