import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm:"",
  setSearchTerm: (term) => set({ searchTerm: term }),
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
  setRecipes: (recipes) => set({ recipes }),
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      ),
    })),
    
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
    get filteredRecipes() {
    const term = get().searchTerm.toLowerCase();
    return get().recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(term) ||
        recipe.description.toLowerCase().includes(term)
      // Add more fields here for advanced filtering (e.g., ingredients)
    );
  },
}));

export default useRecipeStore;
