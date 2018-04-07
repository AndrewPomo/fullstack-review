const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request.get(options, function(err, httpResponse, body) {
    if (err) {
      return console.error('upload failed:', err);
    }

    callback(body);
  })
}

let getImportantData = (githubResponse, callback) => {

  callback(JSON.parse(githubResponse).map( repo => {
    return {
      '_id': repo.id,
      'name': repo.name,
      'description': repo.description,
      'html_url': repo.html_url,
      'size': repo.size,
      'stargazers_count': repo.stargazers_count,
      'watchers_count': repo.watchers_count,
      'forks_count': repo.forks_count,
      'owner': repo.owner.login,
      'owner_url': repo.owner.html_url
    }
  }))
}

module.exports.getReposByUsername = getReposByUsername;
module.exports.getImportantData = getImportantData;