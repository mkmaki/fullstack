import React from 'react'
import PropTypes from 'prop-types'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputUser: '',
      inputPassword: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.login({
      username: this.state.inputUser,
      password: this.state.inputPassword
    })
    this.setState({ inputUser: '', inputPassword: '' })
  }

  handleInputChange = (event, name) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <h1>Please login!</h1>
          <div>Username: <input value={this.state.inputUser} name="inputUser" onChange={this.handleInputChange}/></div>
          <div>Password: <input type="password" name="inputPassword" value={this.state.inputPassword} onChange={this.handleInputChange}/></div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default Login