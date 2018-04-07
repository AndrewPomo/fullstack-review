import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this)
  }

  search (term) {
    $.ajax({
      url: "http://localhost:1128/repos",
      method: "POST",
      data: term,
      contentType: 'text/plain'
    })
  }

  componentDidMount () {
    const context = this;
    $.ajax({
      url: "http://localhost:1128/repos",
      method: "GET",
      success: function(data) {
        context.setState({
          repos: data
        })
      },
    })
    
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));