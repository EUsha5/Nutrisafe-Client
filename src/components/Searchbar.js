import React, { Component } from 'react';
import Select from 'react-select';
// class SearchBar extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       username: ''
//     }
//   }

//   handleSearch (e) {
//     this.setState({ username: e.target.value })
//   }

//   handleGoClick () {
//     if (!this.props.github.isFetchingUser) {
//       this.props.actions.fetchUser(this.state)
//     }
//   }

//   render () {
//     return (
//       <div className='searchbar-container'>
//         <form onSubmit={e => e.preventDefault()}>
//           <input
//             type='text'
//             size='45'
//             placeholder='Search Das Food'
//             onChange={this.handleSearch.bind(this)}
//             value={this.state.username} />
//           <button
//             type='submit'
//             onClick={this.handleGoClick.bind(this)}>
//             Search
//           </button>
//         </form>
//       </div>
//     )
//   }
// }

// import './SearchBar.scss'
// class SearchBar extends Component {
//   constructor(props){
//     super(props);
//     this.state={term:''};
//   }
//   onInputChange(term){
//     const name = this.props.searchBoxName || undefined
//     this.setState({term});
//     if(this.props.onSearchTermChange){
//       this.props.onSearchTermChange({name,term})
//     }
//   }
//     render() {
//       const name = this.props.searchBoxName || undefined
//         return (
//             <div className="search-box">
//               <div className="search-icon">
//                 <img src="http://share.ashiknesin.com/search-icon.png" alt=""></img>
//               </div>
//               <input name={name} className="search-input" id="search" type="text" placeholder="Search" value={this.state.term}
//                 onChange={event=>this.onInputChange(event.target.value)} onKeyPress={this.props.onKeyPress|| null}/>
//             </div>
//         );
//     }
// }
 
// export default SearchBar;

// export default SearchBar

// import React, { Component } from 'react';
// import Select from 'react-select';

class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      term:'',
      selectedOption: null,
      options: [
        { value: 'pork', label: 'Pork' },
        { value: 'chicken', label: 'Chicken' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ] 
    };
  }

  fetchRecipes = (term) => {
    const recipeSearchKeys = [
      'app_id=8c92a79b&app_key=328006e37eb03156c8eb6598ccfe4a3d',
      'app_id=a561e388&app_key=4c2118d8374559f20b9779e0d162d153',
      'app_id=7433666f&app_key=bb91ec4a4fbe08fb45fbe1dea5019ff3',
      'app_id=ef107028&app_key=2acf8835708aa777c03cd671e935e79f',
      'app_id=93097a01&app_key=b4975072b6bb36844e7ade0b3b22700e',
      'app_id=7a2f4d77&app_key=886fd31fa9e8f6ac02a94e4cbe731c1d',
      'app_id=338a7519&app_key=be0e2b0b2bdac9044d3e071aafc27dde',
      'app_id=94588f2b&app_key=cb0cd17c292ef50bae37599a8a32a16a',
      'app_id=8eb0f8ce&app_key=0b96578057b6b6c344f59aedeab08098',
      'app_id=40a3d7f6&app_key=7a70e9e0297764b6142565c461606b6f'
    ];
  
    fetch(`https://api.edamam.com/search?q=${term}&${recipeSearchKeys[Math.floor(Math.random() * 10)]}`)
    .then(res => {
      if (res.status !== 200) {
        this.fetchRecipes(term);
        return null;
      }
      return res.json();
    })
    .then(res => {
      if (res === null ) {
        console.log('used API key hit');
        return null;
      }
      let selectOptions = [];

      res.hits.map(recipe => {
        // Saves recipe id and name
        const value = recipe.recipe.uri;
        const label = recipe.recipe.label;
        const ingredients = recipe.recipe.ingredients;

        selectOptions.push({ value, label, ingredients })
      })
      this.setState({ options: selectOptions })
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.fetchRecipes(this.state.term);
  }

  handleChange = (selectedOption) => {
      // TODO: fix issue with this being triggered when form is empty
      // and searching for random recipes
    if (this.state.selectedOption !== null || selectedOption) {
      this.setState({ selectedOption });
      // prevents searches on returned searches
      // for example: if 'Vanilla' is searched, prevents search on...
      // 'Peach Vanilla Jam'
      this.fetchRecipes(selectedOption.label);
    }
  }

  onInputChange = (input) => {
    this.setState({ term: input })
  }

  render() {
    const { options } = this.state;
    const style = { minWidth: '200px' };
    return (
      <form className="search-box" onSubmit={this.handleSubmit} style={style}>
        <Select
          placeholder={'Search recipes...'}
          onInputChange={this.onInputChange}
          onChange={this.handleChange}
          options={options}
          isSearchable={true}
        />
      </form>
    );
  }
}
 
export default SearchBar;