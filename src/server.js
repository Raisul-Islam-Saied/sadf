const app = require("./app");
const { port } = require("./config/config");
const connectDB = require("./config/db");

app.listen(port, () => {
  console.log(`your server is listening at http://localhost:${port}`);
  connectDB();
});
