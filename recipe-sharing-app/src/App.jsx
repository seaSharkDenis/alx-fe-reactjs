import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import RecommendationsList from "./components/RecommendationsList";
import FavoritesList from "./components/FavoriteList";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1>Recipe Sharing App</h1>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>
        
        <main>
          <SearchBar />
          <Routes>
            <Route path="/" element={
              <div className="main-content">
                <aside className="sidebar">
                  <RecommendationsList />
                  <FavoritesList />
                </aside>
                <section className="content-main">
                  <RecipeList />
                  <AddRecipeForm />
                </section>
              </div>
            } />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;