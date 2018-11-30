const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

app.listen(port, function () {
  console.log('Example app listening on port 3000!')
})
