import React from 'react'
import PropTypes from 'prop-types'

class CreateBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.create({
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    })
    this.setState({ title: '', author: '', url: ''})
  }

  handleInputChange = (event, name) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>Title: <input value={this.state.title} name="title" onChange={this.handleInputChange}/></div>
          <div>Author: <input value={this.state.author} name="author" onChange={this.handleInputChange}/></div>
          <div>URL: <input value={this.state.url} name="url" onChange={this.handleInputChange}/></div>
          <div><button type="submit">create</button></div>
        </form>
      </div>
    )
  }
}

CreateBlog.propTypes = {
  create: PropTypes.func.isRequired
}

export default CreateBlog