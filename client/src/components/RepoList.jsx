import React from 'react';

const RepoList = (props) => {
  let key = -1;
  return (
    <div>
      <h4> Repo List Component </h4>
      <p>There are {props.repos.length} repos.</p>
      <ul>
      {props.repos.map(repo =>
        <li key={++key} >{repo.name}</li>
      )}
      </ul>
    </div>
  )
}
export default RepoList;