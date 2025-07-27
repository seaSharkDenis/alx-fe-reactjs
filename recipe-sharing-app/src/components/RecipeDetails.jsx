import DeleteRecipeButton from "./DeleteRecipeButton";
import EditRecipeForm from "./EditRecipeForm";
import { React, useState } from "react";
import useRecipeStore from "./recipeStore";
import { useParams, useNavigate } from "react-router-dom";
// import FavoriteButton from "./FavoriteButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = Number(id);
  const [isEditing, setIsEditing] = useState(false);
  const recipe = useRecipeStore(state =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );
  const navigate = useNavigate();
  if (!recipe) {
    return <p>Recipe not found</p>;
  }

  return (
    <div>
      {isEditing ? (
        <EditRecipeForm recipe={recipe} onDone={() => setIsEditing(false)} />
      ) : (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <div className="recipe-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            {/* <FavoriteButton recipeId={recipe.id} /> */}
            <DeleteRecipeButton
              recipeId={recipe.id}
              onDelete={() => navigate("/")}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
