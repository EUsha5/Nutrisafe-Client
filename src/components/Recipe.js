import React, {Component} from 'react';
import axios from 'axios';

class Recipe extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }

componentDidMount(){
  this.getRecipe();
}

getRecipe = () => {
  console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
    axios.get(process.env.REACT_APP_API_URL +"/currentrecipe", {withCredentials: true})
    .then( responseFromApi =>{
      console.log('{}{}{}}{}{}{}}}}{}{}{}{{}{}' , responseFromApi)
        const theRecipe = responseFromApi.data;
        this.setState(theRecipe, ()=> console.log('STATETSTATESTATESTATE', this.state));


    })
    .catch((err)=>{
        console.log(err)
    })
}




  render() {
    return(
      <div className="recipe-height">
      <div>
        {/* <h1>{this.state.recipe.label}</h1> */}
      </div>
        <div className="recipe-img">
          {/* <h1>{this.state.recipe.image}</h1> */}
        </div>
        <div className="nutri-values">
          <p>Nutrional Values:</p> 
            {/* <span>{this.state.recipe.totalNutrients.ENERC_KCAL}kcal calories</span>
            <span>{this.state.recipe.totalNutrients.CHOCDF}g carbs</span>
            <span>{this.state.recipe.totalNutrients.FIBTG}g fiber</span>
            <span>{this.state.recipe.totalNutrients.PROCNT}g protien</span>
            <span>{this.state.recipe.totalNutrients.SUGAR}g sugar</span> */}
          <p>Dietary Values:</p>

        </div>
        <div>
          <h2 className="recipe-ingredients">Ingredients:</h2>
        </div>
        <div>
          {/* <h3>CookTime: {this.state.recipe.totalTime}min</h3>
          <h3>Yield: {this.state.recipe.yield}</h3> */}
        </div>
        <div>
          <h2>Instructions:</h2>
            <h3>Please visit the link for cooking directions</h3>
            {/* <span>{this.state.recipe.url}</span> */}
        </div>
      
      </div>
    )
  }
}

export default Recipe;