require("dotenv").config();
const port = process.env.PORT ?? 3000;
const app = require("./src/App");



app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
