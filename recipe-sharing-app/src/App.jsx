import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <BrowserRouter>
      <div>

        <h1>Recipe Sharing App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/recipes">Recipe List</Link>
        </nav>
        <SearchBar />
        <Routes>
          <Route path="/" element={
            <>
              <RecipeList />
              <AddRecipeForm />
            </>
          } />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
