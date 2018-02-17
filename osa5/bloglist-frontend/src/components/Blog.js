import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: this.props.blog.likes
    }
    this.addLike = this.addLike.bind(this)
    this.delete = this.delete.bind(this)
  }

  addLike(e) {
    this.props.addLike(this.props.blog.id)
    this.setState({ likes: this.state.likes + 1 })
  }

  delete(e) {
    this.props.delete({ id: this.props.blog.id })
  }

  render() {
    const blogStyle = {
      paddingTop: 3,
      paddingLeft: 5,
      marginBottom: 3
  }

  return (
    <div style={blogStyle}>
      <div>{this.props.showDelete}</div>
      <div>{this.props.blog.author}</div>
      <div>{this.props.blog.id}</div>
      <div>{this.state.likes} likes <button onClick={this.addLike}>Like!</button></div>
      <div>Added by {this.props.blog.user === null ? 'Unknown' : this.props.blog.user.name}  </div>
      {this.props.showDelete === 'true' && <div><button onClick={this.delete}>Delete</button></div>}
    </div>
    )
  }
}

export default Blog