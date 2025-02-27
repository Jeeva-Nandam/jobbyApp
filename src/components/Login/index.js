import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userName: '',
    passWord: '',
    errorMsg: '',
    showError: false,
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassWord = event => {
    this.setState({passWord: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userName, passWord} = this.state
    const bodyDetails = {
      username: userName,
      password: passWord,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(bodyDetails),
    }

    const response = await fetch(apiUrl, option)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const jwtToken = data.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      history.replace('/') // Home page
    } else {
      const message = data.error_msg
      this.setState({errorMsg: message, showError: true})
    }
  }

  render() {
    const {errorMsg, showError, userName, passWord} = this.state
    if (Cookies.get('jwt-token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-background">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.onSubmitForm} className="login-form">
            <label htmlFor="inputName" className="label-input">
              USERNAME
            </label>
            <input
              type="text"
              value={userName}
              onChange={this.onChangeUserName}
              placeholder="USERNAME"
              id="inputName"
              className="input-element"
            />
            <label className="label-input" htmlFor="inputPassword">
              PASSWORD
            </label>
            <input
              type="password"
              value={passWord}
              onChange={this.onChangePassWord}
              placeholder="PASSWORD"
              id="inputPassword"
              className="input-element"
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          {showError && <p className="err-msg">*{errorMsg}</p>}
        </div>
      </div>
    )
  }
}
export default Login
