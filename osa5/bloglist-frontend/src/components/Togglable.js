import React from 'react'
import PropTypes from 'prop-types'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {

    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    return (
      <div>
        <div style={hideWhenVisible}>
          <div onClick={this.toggleVisibility}>
            {this.props.otsikko}
          </div>
        </div>
        <div style={showWhenVisible} >
          <div onClick={this.toggleVisibility}>
            {this.props.otsikko}
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Togglable.propTypes = {
  otsikko: PropTypes.string.isRequired
}
export default Togglable