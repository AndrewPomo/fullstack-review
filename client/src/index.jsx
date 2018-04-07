import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      repoCount: 0
    }
    this.search = this.search.bind(this)
    this.getFromDB = this.getFromDB.bind(this)
  }

  search (term) {
    let context = this;
    $.ajax({
      url: "http://localhost:1128/repos",
      method: "POST",
      data: term,
      contentType: 'text/plain',
      success: function(repos) { 
        context.getFromDB(repos.length);
      }
    });
  }

  getFromDB(repoCount) {
    if (!repoCount) {
      repoCount = this.state.repoCount;
    }
    console.log(repoCount)
    let context = this;
    $.ajax({
      url: "http://localhost:1128/repos",
      method: "GET",
      success: function(data) {
        console.log(repoCount)
        context.setState({
          repos: data,
          repoCount: repoCount
        })
      },
    })
  }

  componentDidMount () {
    this.getFromDB();
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <RepoList repos={this.state.repos} repoCount={this.state.repoCount}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));