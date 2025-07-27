import { useEffect } from "react";
import useRecipeStore from "./recipeStore";
import { Link, StaticRouter } from "react-router-dom";

function RecipeList() {
  const filteredRecipes = useRecipeStore(state=>state.filteredRecipes);
  const recipes = useRecipeStore(state => state.recipes);

  useEffect(()=>{
    useRecipeStore.getState().filteredRecipes();
  }, [recipes]);

  return (
    <div>
       <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecipeList;
