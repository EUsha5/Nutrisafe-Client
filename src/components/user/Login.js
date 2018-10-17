import React, {Component} from 'react';
import AuthService from './authService';
import {Link} from 'react-router-dom' 


class Login extends Component {
  constructor(props){
    super(props);
    this.state = { username: '', password: ''};// loggedInUser: null
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    console.log("submitting form data for user log in <<<<<<<<<<<<<<<<<<<<");
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
  // debugger
    this.service.login(username, password)
    .then( response => {
      console.log(response);
      console.log('********************', this.state.password);
      console.log("the response after logging in ^^^^^^^^^^^^^^^^^^^^^^^ ", response);
        this.setState({
            username: "", 
            password: "",
            // loggedInUser: response
        });
        console.log('=-=-=-=-=-=-==-=-', response)
        this.props.setTheUser(response)
    })
    .catch( error => console.log(error) )
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
        
  render(){

    // console.log(this.state)
    // console.log(this.service.login)
    
    return(
      <div className="auth bg-img-bw">
        <form className="auth-form" onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input className="input" type="text" name="username" value={this.state.username} onChange={ e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input className="input" type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          <input className="submit-btn" type="submit" value="Login" />
        </form>
  
        <div className="no-acct">
          <p>Don't have an account?</p>
          <Link className="submit-btn" to={"/signup"}>Signup</Link>
        </div>
  
      </div>
    )
  }
}
export default Login;