import React, { Component } from 'react'

export default class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    }

    this.onUser = this.onUser.bind(this);
    this.onPassword = this.onPassword.bind(this);
    this.login_user = this.login_user.bind(this);
  }

  login_user(){
    let username = this.state.username;
    let password = this.state.password;
    this.props.login(username, password);
  }

  onUser(event){
    this.setState({username: event.target.value});
    console.log(this.state.username);
  }

  onPassword(event){
    this.setState({
      password: event.target.value
    });
  }

  render() {

    return (
        <div className="container centre" width="500px">
<form>
  <div className="form-outline mb-4">
    <input type="email" onChange={this.onUser} value={this.state.username} id="username" className="form-control" />
    <label className="form-label" htmlFor="form2Example1">Username</label>
  </div>

  
  <div className="form-outline mb-4">
    <input type="password"  onChange={this.onPassword} value={this.state.password} id="password" className="form-control" />
    <label className="form-label" htmlFor="form2Example2">Password</label>
  </div>

  
  <div className="row mb-4">
    <div className="col d-flex justify-content-center">
      
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="form2Example31"/>
        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
      </div>
    </div>

    <div className="col">
    
      <a href="/">Forgot password?</a>
    </div>
  </div>

  <button type="button" onClick={this.login_user} className="btn btn-primary btn-block mb-4">Sign in</button>

  
  <div className="text-center">
    <p>Not a member? <a href="/">Register</a></p>
    <p>or sign up with:</p>
    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-facebook-f"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-google"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-twitter"></i>
    </button>

    <button type="button" className="btn btn-link btn-floating mx-1">
      <i className="fab fa-github"></i>
    </button>
  </div>
</form>
</div>
    )
  }
}
