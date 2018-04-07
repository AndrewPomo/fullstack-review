const mongoose = require('mongoose');
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

let save = (data) => {
  data.forEach(function(repo) {
    Repo.create(repo, function (err) {
      if (err) return console.error(err);
      console.log("success!!!")
    })
  })
}

let getTopRepos = (callback) => {
  // Repo.find({}, 'name description html_url owner', function(err, repos) {
  //   if (err) console.log(err);
  //   // console.log(repos)
  //   callback(repos);
  // })
  console.log('hello')
  Repo.find({})
  .sort({'size': -1})
  .limit(25)
  .exec(function(err, repos) {
    if (err) console.log(err);
    callback(repos);
  });
}

module.exports.save = save;
module.exports.getTopRepos = getTopRepos;
