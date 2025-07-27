import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: "",
  favorites: [],
  recommendations: [],
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      ),
    })),
  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  setRecipes: (recipes) => {
    set({ recipes });
    setTimeout(() => get().filterRecipes(), 0);
  },

  setSearchTerm: (term) => {
    set({ searchTerm: term });
    setTimeout(() => get().filterRecipes(), 0);
  },
  generateRecommendations: () =>
    set((state) => {
      const recommended = state.recipes.filter(
        (recipe) => state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),

  // filterRecipes: () => {
  //   const state = get();
  //   const filtered = state.recipes.filter(
  //     (recipe) =>
  //       recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
  //       recipe.description
  //         .toLowerCase()
  //         .includes(state.searchTerm.toLowerCase()) // Also search in description
  //   );
  //   set({ filteredRecipes: filtered });
  // },
}));

//   // New favorite-related functions
//   addFavorite: (recipeId) =>
//     set((state) => ({
//       favorites: [...state.favorites, recipeId],
//     })),
//   removeFavorite: (recipeId) =>
//     set((state) => ({
//       favorites: state.favorites.filter((id) => id !== recipeId),
//     })),
//   toggleFavorite: (recipeId) =>
//     set((state) => ({
//       favorites: state.favorites.includes(recipeId)
//         ? state.favorites.filter((id) => id !== recipeId)
//         : [...state.favorites, recipeId],
//     })),

//   // Recommendation functions
//   generateRecommendations: () => {
//     const { recipes, favorites } = get();
//     if (favorites.length === 0) {
//       // If no favorites, return random recipes
//       const shuffled = [...recipes].sort(() => 0.5 - Math.random());
//       return set({ recommendations: shuffled.slice(0, 3) });
//     }

//     // Simple recommendation based on similar categories (you can enhance this)
//     const recommended = recipes.filter(
//       (recipe) =>
//         !favorites.includes(recipe.id) && // Don't recommend already favorited
//         favorites.some((favId) => {
//           const favRecipe = recipes.find((r) => r.id === favId);
//           return recipe.category === favRecipe?.category;
//         })
//     );

//     // Fallback to random if not enough recommendations
//     if (recommended.length < 3) {
//       const shuffled = [...recipes]
//         .filter((r) => !favorites.includes(r.id))
//         .sort(() => 0.5 - Math.random());
//       recommended.push(...shuffled.slice(0, 3 - recommended.length));
//     }

//     set({ recommendations: recommended.slice(0, 3) });
//   },

//   get filteredRecipes() {
//     const term = get().searchTerm.toLowerCase();
//     return get().recipes.filter(
//       (recipe) =>
//         recipe.title.toLowerCase().includes(term) ||
//         recipe.description.toLowerCase().includes(term)
//     );
//   },
// }));

export default useRecipeStore;
