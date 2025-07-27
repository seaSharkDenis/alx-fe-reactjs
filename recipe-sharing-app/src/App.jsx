import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <RecipeList />
          <AddRecipeForm />
          <Routes>
            <Route path="/recipes/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
