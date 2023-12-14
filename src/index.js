//const https = require('https');
//const fs = require('fs');
//const path = require('path');
const app = require("./app");
let port = 8000;

/*const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, '/cert.key')),
  cert: fs.readFileSync(path.join(__dirname, '/cert.pem'))
}*/

async function main() {
  try {
    //https.createServer(httpsOptions, app).listen(port);
    app.listen(port);
    console.log(`APIRest running on http://localhost:${port}/api/`);
  } catch (error) {
    console.log(error);
  }
}

main();