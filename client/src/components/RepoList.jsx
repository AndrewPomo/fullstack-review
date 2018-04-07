import React from 'react';

const RepoList = (props) => {
  let key = -1;
  console.log(props.repoCount);
  return (
    <div>
      <h4> Repo List Component </h4>
      {props.repoCount > 0 &&
        <p> Added {props.repoCount} new repos.</p>
      }
      <p>There are {props.repos.length} repos.</p>
      <hr/>
      {props.repos.map(repo =>
        <div>
          <h3 key={++key}><a href={repo.html_url}>{repo.name}</a></h3>
          <p>Owner: <a href={repo.owner_url}>{repo.owner}</a></p>
          <p>{repo.description}</p>
          <hr></hr>
        </div>
      )}
    </div>
  )
}
export default RepoList;