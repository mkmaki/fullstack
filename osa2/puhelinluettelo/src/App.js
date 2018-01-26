import React from 'react'
import Rest from './services/rest'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      error: null,
      success: null
    }
  }

  componentWillMount() {
    Rest.getAllNumbers()
    .then(response => {
      this.setState({ persons: response.data })
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newPersons = this.state.persons.slice()
    const newName = this.state.newName
    const newNumber = this.state.newNumber
    
    if(newPersons.map(data => data.number).indexOf(newNumber) !== -1) {
      this.showNote('error', 'Numero on jo puhelinluettelossa!')      
      return;
    }

    if(newPersons.map(data => data.name.toLowerCase()).indexOf(newName.toLowerCase()) === -1) { // Nimi ei listassa      
      Rest.addPerson({ name: newName, number: newNumber}) // serverUpdate
      .then(response => {
        const newId = response.data.id        
        newPersons.push({ name: newName, number: newNumber, id: newId })        
        this.setState({ persons: newPersons, newName: '', newNumber: '' }) // stateUpdate
        this.showNote('success', 'Lisäys onnistui.')
      })
      .catch(error => {
        this.showNote('error', 'Numero on jo puhelinluettelossa!')
      })
    } 
    else { // Nimi on listassa
      if(window.confirm(newName + ' on jo luettelossa, korvataanko vanha numero uudella?')) {
        const person = newPersons.find(person => person.name.toLowerCase() === this.state.newName.toLowerCase())
        const personId = person.id
        person.number = newNumber        
        Rest.replacePerson({ name: newName, number: newNumber}, personId) // serverUpdate
          .then(response => {            
            this.setState({ persons: newPersons, newName: '', newNumber: ''}) // stateUpdate
            this.showNote('success', 'Numeron päivitys onnistui.')
          })
          .catch(error => {
            Rest.addPerson({ name: newName, number: newNumber})
            this.showNote('success', 'Numeron päivitys onnistui.')
        })        
      }      
    }
  }
  
  handleRemove = (id) => {
    return () => {
      if(window.confirm('Oletko varma?')) {        
        Rest.removePerson(id)        
        const newPersons = this.state.persons.filter(person => person.id !== id)
        this.setState({ persons: newPersons })
        this.showNote('success', 'Henkilön poisto onnistui.')
      }
    }
  }
  
  showNote = (type, content) => {
    this.setState({ [type]: content })
    setTimeout(() => {
      this.setState({ [type]: null })
    }, 4000)
  }
  handleChange = (event, name) => {
    this.setState({ [name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>      
        <Notification
          error={this.state.error}
          success={this.state.success} />
        <Filter
          filter={this.state.filter}
          handleChange={this.handleChange} />
        <LisaaNimi
          newName={this.state.newName}
          newNumber={this.state.newNumber}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}/>
        <Numerot
          persons={this.state.persons} 
          filter={this.state.filter} 
          handleRemove={this.handleRemove} 
        />
      </div>
    )
  }
}

const LisaaNimi = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      Lisää uusi / muuta voimassaolevaa numeroa
      <div>
        nimi: <input value={props.newName} onChange={(event) => props.handleChange(event, 'newName')} />
      </div>
      <div>
        numero: <input value={props.newNumber} onChange={(event) => props.handleChange(event, 'newNumber')} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
  </form>
  )
}

const Filter = (props) => {
  return (
    <div>
      Filter: <input value={props.filter} onChange={(event) => props.handleChange(event, 'filter')}/>
    </div>
  )
}
const Numerot = (props) => {
  const luettelo = props.persons
    .filter(data => data.name.toLowerCase().includes(props.filter.toLowerCase()))
    .map((person) => <tr key={person.id}><td width="150">{person.name}</td><td width="100" align="right"> {person.number}</td><td><button onClick={props.handleRemove(person.id)}>poista</button></td></tr>)
  
  return (
    <table>
      <thead>
        <tr><th><h1>Numerot</h1></th></tr>
      </thead>
      <tbody>
        {luettelo}
      </tbody>
    </table>
  )
}
const Notification = (props) => {
  if (props.error === null && props.success === null) {
    return null
  }
  return (
    <div>
      {props.success !== null && <div className="success">{props.success}</div>}
      {props.error !== null && <div className="error">{props.error}</div>}
    </div>
  )
}

export default App