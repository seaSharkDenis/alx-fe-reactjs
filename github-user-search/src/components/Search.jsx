import { useState } from "react";
import Loading from './Loading';
import UserNotFound from './UserNotFound';
import fetchUserData from "../services/githubService";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [userData, setUserData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchedUsername, setSearchedUsername] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = inputValue.trim();
    if(!username) return;

    setSearching(true);
    setNotFound(false);
    setUserData(null);
    setSearchedUsername(username);
    try{
      const data = await fetchUserData(username);
      setUserData(data);

    }catch(err){
      console.error("Gihub API error:", err);
      setNotFound(true);
    }finally{
      setSearching(false);
    }

    setInputValue('');
  };

  
  return (
    <div>
      <h1>Simple Github Search Application</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search Github User"
        />
        <button type="submit">Submit</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {searching && <p>Loading...</p>}
        {notFound && <p> Looks like we cant find the user </p>}
        {userData && (
          <div>
            <h2>User Data</h2>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Username:</strong> {userData.login}</p>
            <p><strong>Followers:</strong> {userData.followers}</p>
            <p><strong>Following:</strong> {userData.following}</p>
            <p>
              <strong>User Image:</strong><br />
              <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} width="100" />
            </p>
            <p><strong>Public Repos:</strong> {userData.public_repos}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
