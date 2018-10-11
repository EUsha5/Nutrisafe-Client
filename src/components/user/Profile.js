import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateBookButton from '../CreateBookButton';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfBooks: [],
      user: null,
      aboutme: this.props.loggedInUser.aboutme,
    };
  }

  getAllBooks = () => {
    axios.get(process.env.REACT_APP_API_URL + "/profile", { withCredentials: true })
      .then(responseFromApi => {
        this.setState({
          listOfBooks: responseFromApi.data.recipebook
        })
          // console.log('========BOOKS========', responseFromApi.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getAllBooks();
  }

  showAllBooks = () => {
    if (this.state.listOfBooks.length > 0) {
      return (
        this.state.listOfBooks.map((book, index) => {
          console.log('++++++++++LITTLEBOOK+++++++++', book)
          return (
            <div key={book._id}>
              <Link to={`/profile/book/${book._id}`}>
                <h3>{book.title}</h3>
              </Link>
            </div>
          )
        })
      )
    }
  }

//edit profile 
// editProfile = () => {
//   .then( response => {
//     console.log("^^^^^^^^RESPONSE^^^^^^^^^", response)
//     this.setState({
//       aboutme: ''
//     })
//   })
//   .catch((err) => {
//     console.log(err)
//   })
// }


  
handleFormSubmit = (event) => {
  const aboutme = this.state.aboutme;
  event.preventDefault();
  axios.put(process.env.REACT_APP_API_URL + `/profile/${this.props.loggedInUser._id}`, { withCredentials: true })
  .then((response) => {
console.log('*********RESPONSE*******', response)
  //  let blah = this.props.loggedInUser;
    // this.props.history.push('/profile/:id')
  })
  .catch(err => {
    console.log(err)
  })

}  
    handleAboutMeChange = (event) => {
    console.log('%%%%%%%%%%%ABOUTME%%%%%%%%%%%', this.state.aboutme)
    this.setState({
      aboutme: event.target.value
    })
  }

render() {
    // console.log('++++++++++LITTLEBOOK+++++++++', this.showAllBooks)
    // console.log('___________User________', this.props.loggedInUser.recipebook)
    console.log('&&&&&&&&&&ABOUTME&&&&&&&&&&&',this.props.loggedInUser.aboutme)
    return (
      <div className="profile-height">
        <div className="profile-info">
          <div className="about-me">
            <h2>About {this.props.loggedInUser.firstName}:</h2>
            <span>{this.props.loggedInUser.aboutme}</span>
          </div>
          <div>
            <h3>Total Recipes: <span>#</span></h3>
            <h3>Total Books: <span>#</span></h3>
          </div>
        </div>
        <div>
          <h2>My Book Shelf</h2>
          <div>
            {this.showAllBooks()}
          </div>
        </div>
        {/* <CreateBookButton aquireData={this.getAllBooks()} /> */}
        <div>
          <h3>Edit Profile:</h3>
          <form onSubmit={this.handleFormSubmit}>
          <label>About Me:</label>
          <textarea type="text" name="aboutme" value={this.state.aboutme} onChange={e=>this.handleAboutMeChange(e)}/>
          <input type="submit" value="Edit"/>
          </form>
        </div>
      </div>       
      // </div>
    )
  }
}

export default Profile;
