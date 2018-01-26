import React, {Component} from 'react';
import axios from 'axios'


class App extends Component {
  constructor() {
    super()
    this.state = {
      searchBar: '',
      searchResults: []
    }
  }
  countrySearch = (event, country) => {
    event.preventDefault()
    let searched = country ? country : this.state.searchBar    
    const url = 'https://restcountries.eu/rest/v2/name/' + searched
    axios.get(url).then(response => {      
      this.setState({ searchResults: response.data })
    })    
  }
  handleInputChange = (event) => {
    this.setState({ searchBar: event.target.value })
  }

  render() {
    let results = ''
    const len = this.state.searchResults.length
    if(len > 10) {
      results = 'too many matches (over 10)'
    } else if(len > 1) {
      results = this.state.searchResults.map((countries,i) => <div key={i} onClick={(event) => this.countrySearch(event, countries.name)}>{countries.name}</div>)
    } else if(len === 1) {
      results = this.state.searchResults.map((countries,i) => <div key={i}>{countries.name} <div>capital: {countries.capital}</div><div> population: {countries.population}</div><div> <img alt={countries.flag} width="400" height="320" src={countries.flag}/></div></div>)
    } 
    return (
      <div>
        Hae: 
        <form onSubmit={this.countrySearch}>
          <input onChange={this.handleInputChange}/>
        </form>
        {results}        
      </div>
    );
  }
}
export default App;
