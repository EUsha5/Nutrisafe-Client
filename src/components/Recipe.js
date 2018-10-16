import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      {this.state.recipe && 
        <h1>{this.state.recipe.label}</h1>
      }
        <div className="recipe-img">
        {this.state.recipe &&
         <img src={this.state.recipe.image} alt=""/>
      }
        </div>
      </div>
        <div className="nutri-values">
          <p>Nutrional Values:</p> 


          {this.state.recipe && 
            <span>{this.state.recipe.totalNutrients.ENERC_KCAL.quantity.toFixed(1)}kcal calories</span>
          }<br/>{this.state.recipe && 
            <span>{this.state.recipe.totalNutrients.CHOCDF.quantity.toFixed(1)}g carbs</span>}
            <br/>{this.state.recipe && 
            <span>{this.state.recipe.totalNutrients.FIBTG.quantity.toFixed(1)}g fiber</span>}
            <br/>{this.state.recipe && 
            <span>{this.state.recipe.totalNutrients.PROCNT.quantity.toFixed(1)}g protien</span>}
            <br/>{this.state.recipe && 
            <span>{this.state.recipe.totalNutrients.SUGAR.quantity.toFixed(1)}g sugar</span>}
          <p>Dietary Values:</p>

        </div>
        <div>
          <h2 className="recipe-ingredients">Ingredients:</h2>

        </div>
        <div>
        {this.state.recipe && 
          <h3>CookTime: {this.state.recipe.totalTime}min</h3>}
          {this.state.recipe && 
          <h3>Yield: {this.state.recipe.yield}</h3>
        }
        </div>
        <div>
          <h2>Instructions:</h2>
            <h3>Please visit the link for cooking directions</h3>
            {this.state.recipe && 
            <Link to={this.state.recipe.url}><span className="og-url">{this.state.recipe.url}</span></Link>
            }
        </div>
      
      </div>
    )
  }
}

export default Recipe;