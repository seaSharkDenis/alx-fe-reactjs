// src/components/AddRecipeForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    ingredients: '',
    steps: '',
    image: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.prepTime.trim()) newErrors.prepTime = 'Prep time is required';
    if (!formData.cookTime.trim()) newErrors.cookTime = 'Cook time is required';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    if (!formData.steps.trim()) newErrors.steps = 'Steps are required';
    
    // Additional validation for ingredients format
    if (formData.ingredients.trim() && formData.ingredients.split('\n').filter(i => i.trim()).length < 2) {
      newErrors.ingredients = 'Please enter at least 2 ingredients';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this to your backend API
      const newRecipe = {
        ...formData,
        id: Date.now(), // Temporary ID
        ingredients: formData.ingredients.split('\n').filter(i => i.trim()),
        steps: formData.steps.split('\n').filter(i => i.trim()),
        tags: []
      };
      
      console.log('Submitting recipe:', newRecipe);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to home page after submission
      navigate('/');
    } catch (error) {
      console.error('Error submitting recipe:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Recipe</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipe Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Recipe Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Spaghetti Carbonara"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="A brief description of your recipe"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Time Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-1">
              Preparation Time *
            </label>
            <input
              type="text"
              id="prepTime"
              name="prepTime"
              value={formData.prepTime}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.prepTime ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 15 mins"
            />
            {errors.prepTime && <p className="mt-1 text-sm text-red-600">{errors.prepTime}</p>}
          </div>
          <div>
            <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-1">
              Cooking Time *
            </label>
            <input
              type="text"
              id="cookTime"
              name="cookTime"
              value={formData.cookTime}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.cookTime ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., 30 mins"
            />
            {errors.cookTime && <p className="mt-1 text-sm text-red-600">{errors.cookTime}</p>}
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
            Ingredients * (one per line)
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows="5"
            value={formData.ingredients}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.ingredients ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={`400g spaghetti\n200g pancetta\n4 large eggs\n...`}
          />
          {errors.ingredients && <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>}
        </div>

        {/* Instructions */}
        <div>
          <label htmlFor="steps" className="block text-sm font-medium text-gray-700 mb-1">
            Instructions * (one step per line)
          </label>
          <textarea
            id="steps"
            name="steps"
            rows="7"
            value={formData.steps}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.steps ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={`Bring a large pot of salted water to boil...\nWhile pasta cooks, fry pancetta...\n...`}
          />
          {errors.steps && <p className="mt-1 text-sm text-red-600">{errors.steps}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/recipe-image.jpg"
          />
          <p className="mt-1 text-sm text-gray-500">Optional - you can add an image later</p>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Recipe'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;