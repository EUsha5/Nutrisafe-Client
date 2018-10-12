import React, {Component} from 'react';
import AuthService from './authService';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: '', firstName: '', lastName: '', email:''};
    this.service = new AuthService();
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;

    this.service.signup(username, password, firstName, lastName, email)
    .then( theUser => {
      this.setState({
        username: "", 
        password: "",
        firstName: "",
        lastName: "",
        email:""
      });
      this.props.setTheUser(theUser)
    })
    .catch( error => console.log(error))
  }
  
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render(){

    return(
    // 
      <div className="auth">
        <form className="auth-form" onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input className="input" type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)}/>

          <label>First Name:</label>
          <input className="input" type="text" name="firstName" value={this.state.firstName} onChange={e => this.handleChange(e)}/>

          <label>Last Name:</label>
          <input className="input" type="text" name="lastName" value={this.state.lastName} onChange={e => this.handleChange(e)}/>
          
          <label>Password:</label>
          <input className="input" type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

          <label>Email:</label>
          <input className="input" type="email" name="email" value={this.state.email} onChange={e => this.handleChange(e)} />
          
          <input type="submit" value="Signup" />
        </form>

        <div className="no-acct">
          <p>Already have account?</p>
          <Link className="submit-btn" to={"/"}>Login</Link>
        </div>

      </div>
    )
  }
}

export default Signup;
