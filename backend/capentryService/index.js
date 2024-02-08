const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
