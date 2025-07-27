import React from 'react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';

const Home = () => (
  <div className="max-w-3xl mx-auto p-4">
    <SearchBar />
    <RecipeList />
  </div>
);

export default Home;