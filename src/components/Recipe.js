import React, {Component} from 'react';


class Recipe extends Component {
  render() {
    return(
      <div className="recipe-height">
      <div>
        <h1>Recipe name</h1>
      </div>
        <div className="recipe-img">
          <h1>recipe image from db</h1>
        </div>
<div className="nutri-values">
  <p>nutrional values</p>
</div>
        <br/>
        <br/>
        
      </div>
    )
  }
}

export default Recipe;