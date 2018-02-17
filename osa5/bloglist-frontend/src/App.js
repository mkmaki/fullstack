import React from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      error: null,
      success: null
    }
  }

  componentDidMount() {
    const loggedIn = window.localStorage.getItem('FullStackUser')
    if (loggedIn) {
      const user = JSON.parse(loggedIn)
      this.setState({ user: user })
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    .catch(error => {
      //console.log(error)
    })
  }

  showNote = (type, content) => {
    this.setState({ [type]: content })
    setTimeout(() => {
      this.setState({ [type]: null })
    }, 4000)
  }

  login = (ob) => {
    blogService.login(ob)
      .then(response => {
        this.setState({ user: response.data })
        this.showNote('success', 'Login Success!')
        window.localStorage.setItem('FullStackUser', JSON.stringify(response.data))
        blogService.setToken(response.data.token)
      })
      .catch(error => {
        console.log(error)
        this.showNote('error', 'Login Failed!')
      })
  }

  logout = (event) => {
    event.preventDefault()
    this.setState({ user: null })
    window.localStorage.removeItem('FullStackUser')
    blogService.setToken(null)
  }

  create = (ob) => {
    ob.token = this.state.user.token
    blogService.create(ob)
      .then(response => {
        this.showNote('success', 'Success!')
      })
      .then(() => {
        blogService.getAll().then(blogs =>
          this.setState({ blogs })
        )
      })
      .catch(error => {
        console.log(error)
        this.showNote('error', 'Posting a blog failed miserably!')
      })
  }

  delete = (ob) => {
    ob.token = this.state.user.token
    blogService.deleteBlog(ob)
      .then(response => {
        this.showNote('success', 'Delete success!')
      })
      .then(() => {
        blogService.getAll().then(blogs =>
          this.setState({ blogs })
        )
      })
      .catch(error => {
        console.log(error)
        this.showNote('error', 'Delete failed miserably!')
      })
  }
  addLike = (id) => {
    blogService.modify(id)
      .catch(error => {
        console.log(error)
      })
  }

  handleInputChange = (event, name) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    // Create new component for this
    const ShowPage = () => (
      <div className="blogspage">
        <div>{this.state.user.name} logged in.</div>
        <form onSubmit={this.logout}><button type="submit">Logout</button></form>

        <h1>blogs!</h1>
        {this.state.blogs
          .sort(function (a, b) {
            return b.likes - a.likes;
          })
          .map(blog =>
            <Togglable otsikko={blog.title}>
              <Blog
                key={blog._id} blog={blog}
                showDelete={(blog.user === null || blog.user._id === this.state.user.id) ? 'true' : 'false'}
                addLike={this.addLike}
                delete={this.delete}/>
            </Togglable>
          )}
      </div>
    )

    return (
      <div className="main">
          <Notification error={this.state.error} success={this.state.success} />
        {this.state.user === null && <Login login={this.login}/>}
        {this.state.user !== null && ShowPage()}
        {this.state.user !== null && <Togglable otsikko="create blog!"> <CreateBlog create={this.create}/> </Togglable>}
      </div>
    )
  }
}

// Move me
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
export default App;
