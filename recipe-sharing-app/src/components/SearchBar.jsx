import useRecipeStore from "./recipeStore";

function SearchBar() {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <input
      type="text"
      placeholder="Search recipes..."
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
    />
  );
};

export default SearchBar;