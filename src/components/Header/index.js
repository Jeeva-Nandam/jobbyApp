import {Link, withRouter} from 'react-router-dom'
import {MdHome, MdWork} from 'react-icons/md'
import Cookies from 'js-cookie'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="main-header">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className=""
        />
      </Link>
      <div className="lg-container">
        <ul className="lg-list">
          <li>
            <Link to="/" className="link header-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link header-item">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="submit" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>

      <ul className="mobile-view">
        <li className="mobile-list">
          <Link to="/" className="link-mobile">
            <MdHome className="icons" />
          </Link>
        </li>
        <li className="mobile-list">
          <Link to="/jobs" className="link-mobile">
            <MdWork className="icons" />
          </Link>
        </li>
        <li className="mobile-list">
          <button type="submit" className="button-icon" onClick={onClickLogout}>
            <FiLogOut className="icons" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
