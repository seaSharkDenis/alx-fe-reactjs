import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("/src/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        const selectedRecipe = data.find(
          (recipe) => recipe.id === parseInt(id)
        );

        if (!selectedRecipe) {
          throw new Error("Recipe not found");
        }
        setRecipe(selectedRecipe);
        setLoading(false);
      } catch (err) {
        setError(err.messsage);
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"></div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relaive"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
          <Link
            to="/"
            className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-blue-500 hover:text-blue-700"
      >
        <svg
          xmlns="https://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Recipes
      </Link>

      {/* Recipe Header */}
      <div className="mb-8">
        <h1 className="text-3xl">{recipe.title}</h1>
        <p className="text-gray-600 mb-4">{recipe.summary}</p>
      </div>

      {/* Recipe Image */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-md">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Recipe content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Ingredients */}
        <div className="md:col-span-1 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span
                  className="inline-block w-5 h-5 bg-blue-100 text-blue-600 rounded-full
                            mr-2 mt-1 flex-shrink-0 items-center justify-center text-xs"
                >
                  -
                </span>
                <span className="text-blue-600">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="md:col-span-2">
          <h2 className="text-2xl">Steps</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step, index) => (
              <li
                key={index}
                className="pb-4 border-b border-gray-100 last:border-0"
              >
                <div className="flex">
                  <span
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8
                                rounded-full bg-blue-500 text-white font-bold mr-4"
                  >
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
