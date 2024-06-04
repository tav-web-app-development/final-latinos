require("dotenv").config();
const port = process.env.PORT ?? 3000;
const app = require("./src/App");
const { initialzeDB } = require("./src/functions/init");

app.listen(port, async () => {
  console.log(`app running at http://localhost:${port}`);
  await initialzeDB();
});
