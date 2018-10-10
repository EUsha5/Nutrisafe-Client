import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateBookButton from '../CreateBookButton';

class Profile extends Component {
  constructor(){
    super();
    this.state={
      listOfBooks: [],
    };
  }
  
  getAllBooks = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/profile/book/create`, {withCredentials:true})
    .then(responseFromApi => {
      this.setState({
        listOfBooks: responseFromApi.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  componentDidMount() {
    this.getAllBooks();
  }
  render(){
    return(
      <div className="profile-height">
        <div className="profile-info">
          <div className="about-me">
          <h2>About (First Name):</h2>
          <span>About me About me About me About me About me 
            About me About me About meAbout me About me About me About me About me 
            About me About me About meAbout me About me About me About me About me 
            About me About me About me </span>
          </div>
          <div>
            <h3>Total Recipes: <span>#</span></h3>
            <h3>Total Books: <span>#</span></h3>
          </div>
        </div>
        <div>
          <h2>My Book Shelf</h2>
            <div>
            {this.state.listOfBooks.map((book, index) => {
              return (
                <div key={book._id}>
                  <Link to={`/profile/book/${book._id}`}>
                    {book.title}
                  </Link>
                </div>
            )})
          }
            </div>
                <CreateBookButton />
        </div>       
      </div>
    )
  }
}

export default Profile;
