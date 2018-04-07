const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  _id: Number,
  name: String,
  description: String,
  html_url: String,
  size: Number,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
  owner: String,
  owner_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  return new Promise ((resolve, reject) => {
    Repo.create(repo, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(repo);
      }
    });
  });
}

let getTopRepos = (callback) => {
  return new Promise((resolve, reject) => {
    Repo.find({})
    .sort({'size': 1})
    .limit(25)
    .exec(function(err, repos) {
      if (err) { 
        reject(err);
      } else {
        resolve(repos);
      }
    });
  });
}

module.exports.save = save;
module.exports.getTopRepos = getTopRepos;