import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  // State to hold the loaded recipe data
  const [data, setData] = useState([]);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // State to track errors
  const [error, setError] = useState(null);

  // useEffect to load data when component mounts
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchData = async () => {
      try {
        // Fetch data from json file
        const response = await fetch("/src/data.json");

        // Check if response is ok
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        // Parse JSON
        const jsonData = await response.json();

        // Update state with the loaded data
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        // Handle any errors
        setError(err.message);
        setLoading(false);
      }
    };
    // Call the fetch function
    fetchData();
  }, []);

  // Display loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading data...
      </div>
    );
  }

  // Display error state
  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relaive"
        role="alert"
      >
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  // Display data in a card layout
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-200">
        Recipe Sharing Platform
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.map((item) => (
          <Link
            to={`/recipe/${item.id}`}
            key={item.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow
            duration-300 hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">{item.summary}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        to="/add-recipe"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </Link>
    </div>
  );
}

export default HomePage;
