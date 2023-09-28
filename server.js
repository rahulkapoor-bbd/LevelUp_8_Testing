const express = require("express");
const path = require('path')

const app = express();
app.use(express.static("./public"));
//route
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
});

app.listen(8080, () => console.log(`Server started on port ${8080}`));