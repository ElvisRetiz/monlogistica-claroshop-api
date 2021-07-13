const app = require("./app");
let port = 8085;

async function main() {
  try {
    app.listen(port);
    console.log(`APIRest running on http://localhost:${port}/api/`);
  } catch (error) {
    console.log(error);
  }
}

main();