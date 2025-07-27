import { Link } from "react-router-dom";
import useRecipeStore from "./recipeStore";

function FavoritesList () {
  const favorites = useRecipeStore((state) => 
    state.favorites.map(id => 
      state.recipes.find(recipe => recipe.id === id)
    ));

  return (
    <div className="favorites-list">
      <h2>My Favorites</h2>
      {favorites.map((recipe) => (
        <div key={recipe.id} className="favorite-item">
          <h3>
            <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;