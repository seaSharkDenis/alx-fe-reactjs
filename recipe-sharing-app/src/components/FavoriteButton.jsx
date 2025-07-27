import useRecipeStore from "./recipeStore";

const FavoriteButton = ({ recipeId }) => {
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const favorites = useRecipeStore((state) => state.favorites);
  
  const isFavorite = favorites.includes(recipeId);

  return (
    <button 
      onClick={() => toggleFavorite(recipeId)}
      className={`favorite-btn ${isFavorite ? 'active' : ''}`}
    >
      {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
    </button>
  );
};

export default FavoriteButton;