import React, {Component} from 'react';
import axios from 'axios';

class RecipeBook extends Component {
  constructor(){
    super();
    this.state = {};
  }
  deleteBook = () => {
    const { params } = this.props.match;
    axios.delete(`http://localhost:5000/api/book/${params.id}`)
    .then( responseFromApi =>{
        this.props.history.push('/profile'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  render() {
    return(
      <div className="page-height">
        <h1>Book Title</h1>
        <button onClick={() => this.deleteBook()}>Delete Book</button>
        <br />
        <br />
        <h2>List of Recipes</h2>
      </div>
    )
  }
}

export default RecipeBook;