import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'components'

import './nav'
class PrimaryNavigation extends React.Component {
  constructor() {
    super()
    this.state = {
      opened: false
    }
  }

  toggleNav() {
    this.setState({ opened: !this.state.opened });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark main-navigation px-0">
        <a className="navbar-brand" href="#">
          logo
        </a>

        <button className={`navbar-toggler ${this.state.opened ? 'hide-nav' : ''}`} type="button" onClick={this.toggleNav.bind(this)}>
          <span></span>
        </button>

        <div className={`collapse navbar-collapse navbar-collapse-md justify-content-end ${this.state.opened ? 'show' : ''}`} id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/" exact activeClassName="active">Home</Link>
            <Link className="nav-item nav-link" to="/sample" activeClassName="active">Sample</Link>
          </div>
        </div>
      </nav>
    )
  }
}

PrimaryNavigation.propTypes = {
  reverse: PropTypes.bool,
}

export default PrimaryNavigation
