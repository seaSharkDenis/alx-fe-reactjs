import DeleteRecipeButton from "./DeleteRecipeButton";
import EditRecipeForm from "./EditRecipeForm";
import {React, useState} from "react";
import useRecipeStore from "./recipeStore";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const {id} = useParams();
  const recipeId = Number(id);
  const [isEditing, setIsEditing] = useState(false);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );
  if (!recipe) {
    return null; // Don't render anything if the recipe is not found (e.g., after deletion)
  }

  return (
    <div>
      {isEditing ? (
        <EditRecipeForm recipe={recipe} onDone={() => setIsEditing(false)} />
      ) : (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <DeleteRecipeButton recipeId={recipe.id} />
        </>
      )}
    </div>
  );
};

export default RecipeDetails;
