const express = require('express');
let gh = require('../helpers/github');
let db = require('../database/index');
let app = express();
const Promise = require('bluebird');
var bodyParser = require('body-parser')


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text())
app.post('/repos', function (req, res) {
  return gh.getReposByUsername(req.body)
    .then(function(repos) {
      return gh.getImportantData(repos)
    })
    .then(function(parsedRepos) {
      return Promise.all(parsedRepos.map(db.save));
    })
    .then((repos) => res.send(repos));
});

app.get('/repos', function (req, res) {
  return db.getTopRepos() 
    .then(function(repos) {
      res.send(repos);
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});