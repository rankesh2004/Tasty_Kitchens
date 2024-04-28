import { Component } from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import AppLogo from "../../IMG/AppLogo.png";
import LoginImg from "../../IMG/LoginImg.png";
import LoginImgMob from "../../IMG/LoginImgMob.png";
import "./index.css";

class Login extends Component {
  state = { username: "", password: "", showSubmitError: "", errorMsg: "" };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, { expires: 10 });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  successSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const option = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, option);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  usernameInput = () => {
    const { username } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }
    return (
      <div className="input-container">
        <label className="input-heading" htmlFor="username">
          USERNAME
        </label>
        <input
          className="input-bar"
          type="text"
          id="username"
          placeholder="username"
          onChange={this.onChangeUsername}
          value={username}
        />
      </div>
    );
  };

  passwordInput = () => {
    const { password } = this.state;
    return (
      <div className="input-container">
        <label className="input-heading" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="input-bar"
          type="password"
          id="password"
          placeholder="password"
          onChange={this.onChangePassword}
          value={password}
        />
      </div>
    );
  };

  render() {
    const jwtToken = Cookies.get("jwt_token");
    const {showSubmitError,errorMsg} = this.state
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-container">
        <div className="login-form-container">
          <img src={LoginImgMob} alt="tasty-img" className="tasty-img-mobile" />
          <h1 className="login-text-mobile">Login</h1>
          <form className="login-form" onSubmit={this.successSubmit}>
            <div className="logo-and-title">
              <img src={AppLogo} alt="tasty-kitchen" className="logo" />
              <p className="logo-text">Tasty Kitchens</p>
            </div>
            <h1 className="login">Login</h1>
            {this.usernameInput()}
            {this.passwordInput()}
            <button type="submit" className="login-btn">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
        <div>
          <img src={LoginImg} alt="tasty-img" className="tasty-img" />
        </div>
      </div>
    );
  }
}

export default Login;
