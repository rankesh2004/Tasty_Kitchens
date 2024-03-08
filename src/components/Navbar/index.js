import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

class Navbar extends Component {
  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {location} = this.props
    const {pathname} = location
    const pathParts = pathname.split('/')
    const path = pathParts[1]
    const homeBtn = path === '' ? 'nav-btn-click' : ''
    const cartBtn = path === 'cart' ? 'nav-btn-click' : ''
    return (
      <nav className="Navbar-container">
        <Link to="/" className="link">
          <div className="Navbar-logo">
            <img
              src="https://res-console.cloudinary.com/dnncpaqsn/media_explorer_thumbnails/c5a61ba4687875adfa62865bd8948520/detailed"
              alt="tasty-kitchen"
              className="Nav-logo"
            />
            <h1 className="Nav-logo-text">Tasty Kitchens</h1>
          </div>
        </Link>
        <div className="Nav-menu">
          <Link to="/" className="link">
            <button
              type="button"
              className={`nav-btn ${homeBtn}`}
              onClick={this.onHome}
            >
              Home
            </button>
          </Link>
          <Link to="/cart" className="link">
            <button
              type="button"
              className={`nav-btn ${cartBtn}`}
              onClick={this.onCart}
            >
              Cart
            </button>
          </Link>
          <button type="button" onClick={this.onLogout} className="log-out-btn">
            Logout
          </button>
        </div>
        <GiHamburgerMenu className="hamburger" />
      </nav>
    )
  }
}

export default withRouter(Navbar)
