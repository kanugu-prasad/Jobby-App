import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="nav-icon-container">
        <li>
          <Link to="/">
            <AiFillHome className="each-nav-ion-style" />
          </Link>
        </li>
        <li>
          <Link to="/jobs">
            <BsBriefcase className="each-nav-ion-style" />
          </Link>
        </li>
        <li>
          <button className="button-first-style">
            <FiLogOut className="each-nav-ion-style" onClick={onClickLogOut} />
          </button>
        </li>
      </ul>
      <ul className="home-job-container">
        <li>
          <Link to="/" className="link-header-style">
            <p className="header-mid-style">Home</p>
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link-header-style">
            <p className="header-mid-style">Jobs</p>
          </Link>
        </li>
      </ul>
      <button className="header-mid-button" onClick={onClickLogOut}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
