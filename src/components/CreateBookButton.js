import React, { Component } from 'react';
import axios from 'axios';

class CreateBookButton extends Component {
  constructor() {
    super()
    this.state = {
      isHidden: true,
      title: ''
    }
  }



  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  
  render() {
    // console.log('=========STATE=========', this.state)
    return (
      <div>
        <button onClick={this.toggleHidden.bind(this)}>
          Add Book
        </button>
        {!this.state.isHidden && <Child getData={() => this.props.aquireData} />}
      </div>
    );
  }
}
class Child extends Component {
  constructor() {
    super();
    this.state = { title: '' }
  }
  
  handleFormSubmit = (event) => {
    const title = this.state.title;
    event.preventDefault()
    this.props.getData();
    axios.post(process.env.REACT_APP_API_URL + "/profile/book/create", {title}, { withCredentials: true })
    .then(() => {
      this.setState({
        title: ''
      })
    })

    .catch((err) => {
      console.log(err);
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
}
  render() {
    console.log('================BOOK TITLE========', this.state);
    return (

      <div onSubmit={e => this.handleFormSubmit(e)} >
        <form>
          <label>Title:</label>
          <input type="text" name="title" placeholder="Book Title" value={this.state.title} onChange={e => this.handleChange(e)} />

          <input type="submit" value="Add Book"/>
        </form>
      </div>
    );
  }
}

export default CreateBookButton;