import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import AuthService from './components/user/authService';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Navbar from './components/Navbar';
import Profile from './components/user/Profile';
import RecipeBook from './components/RecipeBook';
import Recipe from './components/Recipe';
import CreateRecipe from './components/CreateRecipe';
import Footer from './components/Footer';
import ProtectedRoute from './components/user/protected-route';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedInUser: null};
    this.service = new AuthService();
  }

  
  fetchUser(){
    // console.log("running the fetch user function ******************");
    if(this.state.loggedInUser === null){
      this.service.loggedin()
      .then(response => {
        console.log("response from the fetch user function ^&&^&&^&^^&^&^&^&^&^&^&^&^&&^&^&^&^&&^&^&&^^&", response);
        this.setState({
          loggedInUser: response
        })
      })
      .catch(err => {
        console.log("error from the fetch user function %%%%%%%%%%%%&&&&&&&&&&&&&$$$$$$$$$$$$$$$$$$$$$", err);
        this.setState({
          loggedInUser: false
        })
      }) 
    }
  }
  
  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    this.fetchUser();
    return (
      <div className="App">
      <Navbar setTheUser={this.getTheUser} userInSession={this.state.loggedInUser} />
        <Switch>
          <Route exact path="/signup" render={() =><Signup setTheUser={this.getTheUser}/>} />
          <Route exact path='/' render={() => <Login setTheUser={this.getTheUser}/>} />
          <ProtectedRoute  path="/profile" user={this.state.loggedInUser} component= {Profile} />
          <ProtectedRoute exact path="/profile/book/:id" render={() => <RecipeBook />} />
          <ProtectedRoute exact path="/recipes/:id" render={() => <Recipe />} />
          <ProtectedRoute exact path="/recipes/create/:id" render={() => <CreateRecipe />} />
       </Switch>
      <Footer />
      </div>
    );
  }
}

export default App;
