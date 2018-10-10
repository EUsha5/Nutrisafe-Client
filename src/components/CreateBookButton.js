import React, {Component} from 'react';


class CreateBookButton extends Component {
  constructor () {
    super()
    this.state = {
      isHidden: true
    }
  }
  toggleHidden () {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.toggleHidden.bind(this)}>
          Add Book
        </button>
        {!this.state.isHidden && <Child />}
      </div>
    );
  }
}
const Child = () => (
  <div>
    <form>
      <label>Title:</label>
      <input type="text" name="title" placeholder="Book Title" />

      <input type="submit" value="Add Book" />
    </form>
  </div>
  );
  
export default CreateBookButton;