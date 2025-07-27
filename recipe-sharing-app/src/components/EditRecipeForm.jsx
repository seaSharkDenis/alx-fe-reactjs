import React, { useState } from "react";
import useRecipeStore from "./recipeStore";

function EditRecipeForm({ recipe, onDone }) {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }
    updateRecipe({
      ...recipe,
      title,
      description,
    });
    onDone();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
      <button type="button" onClick={onDone}>
        Cancel
      </button>
    </form>
  );
}

export default EditRecipeForm;
