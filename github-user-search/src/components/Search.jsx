import { useState } from "react";
import fetchUserData from "../services/githubService";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [minimumRepositories, setMinimumRepositories] = useState(0);
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = inputValue.trim();
    if (!username) return;

    setSearching(true);
    setNotFound(false);
    setSearchResult(null);
    setError("");

    try {
      const data = await fetchUserData(
        username,
        userLocation,
        minimumRepositories
      );
      setSearchResult(data);
      if (data.total_count === 0) {
        setNotFound(true);
      }
    } catch (err) {
      console.error("GitHub API error:", err);
      setNotFound(true);
      setError(err.message);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          GitHub User Search
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search GitHub User"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Location (optional)
              </label>
              <input
                id="location"
                type="text"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                placeholder="Filter by location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="repos"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Min Repositories (optional)
              </label>
              <input
                id="repos"
                type="number"
                value={minimumRepositories}
                onChange={(e) =>
                  setMinimumRepositories(parseInt(e.target.value) || 0)
                }
                placeholder="Minimum repositories"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={searching}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </form>

        {searching && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {notFound && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {error || "No users found matching your search criteria."}
                </p>
              </div>
            </div>
          </div>
        )}

        {searchResult && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Search Results ({searchResult.total_count} users found)
            </h2>

            <div className="space-y-6">
              {searchResult.items.map((user) => (
                <div
                  key={user.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={user.avatar_url}
                        alt={`${user.login}'s avatar`}
                        className="w-20 h-20 rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {user.name || user.login}
                      </h3>
                      <p className="text-gray-600">
                        <a
                          href={`https://github.com/${user.login}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          @{user.login}
                        </a>
                      </p>
                      <p className="text-gray-600 mt-1">
                        {user.bio && (
                          <span>
                            {user.bio}
                            <br />
                          </span>
                        )}
                        {user.location && (
                          <span>
                            📍 {user.location}
                            <br />
                          </span>
                        )}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm">
                        <span className="text-gray-700">
                          <strong>{user.followers}</strong> followers
                        </span>
                        <span className="text-gray-700">
                          <strong>{user.following}</strong> following
                        </span>
                        <span className="text-gray-700">
                          <strong>{user.public_repos}</strong> repositories
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
