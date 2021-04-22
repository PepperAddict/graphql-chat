const express = require("express");
const app = express();
const path = require("path");

//webpack configuration + hot reloading
const webpack = require('./middleware/webpack')(app)


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Express server listening on port ${port}`));
