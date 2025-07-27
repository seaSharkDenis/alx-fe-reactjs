import useRecipeStore from "./recipeStore";
import { Link } from "react-router-dom";

function RecipeList() {
  const recipes = useRecipeStore((state) => 
    state.searchTerm ? state.filteredRecipes : state.recipes
  );

  return (
    <div>
       <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
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
