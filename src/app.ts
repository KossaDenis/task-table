const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Application started and Listening on port 3000");
});

// serve your css as static
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
  res.sendFile(__dirname + "/pages/table2/index2.html");
  res.sendFile(__dirname + "/pages/table3/index3.html");
});
