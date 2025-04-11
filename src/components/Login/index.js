import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorStatus: false,
    errorMsg: '',
  }

  onChangeInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  successFullLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  errorLoginMessage = errorMsg => {
    this.setState({errorMsg, errorStatus: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDatails = {username, password}
    const url = 'https://apis.ccbp.in/login/'
    const options = {method: 'POST', body: JSON.stringify(userDatails)}
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.successFullLogin(data.jwt_token)
    } else {
      this.errorLoginMessage(data.error_msg)
    }
  }

  render() {
    const {username, password, errorStatus, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <div className="login-sub-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label className="label-style" htmlFor="userInput">
              USERNAME
            </label>
            <input
              type="text"
              className="input-style"
              id="userInput"
              value={username}
              onChange={this.onChangeInput}
            />
            <label className="label-style" htmlFor="passwordInput">
              PASSWORD
            </label>
            <input
              type="password"
              className="input-style"
              id="passwordInput"
              value={password}
              onChange={this.onChangePassword}
            />
            <button className="login-button">Login</button>
            {errorStatus && <p className="error-style">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
