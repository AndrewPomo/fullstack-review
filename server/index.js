const express = require('express');
var gh = require('../helpers/github');
var db = require('../database/index');
let app = express();
var bodyParser = require('body-parser')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.text())
app.post('/repos', function (req, res) {
  gh.getReposByUsername(req.body, function(repos) {
    gh.getImportantData(repos, function(parsedRepos) {
      db.save(parsedRepos);
      res.send();
    });
  })
  console.log('body: ' + req.body);
});

app.get('/repos', function (req, res) {
  db.getTopRepos(function(repos) {
    console.log(repos)
    res.send(repos)
  });
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});