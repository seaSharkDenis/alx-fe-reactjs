import { useState } from 'react';
import './App.css';
import Search from './components/Search';
import fetchUserData from './services/githubService';
import Loading from './components/Loading';
import UserNotFound from './components/UserNotFound';

function App() {
  const [userData, setUserData] = useState(null);
  const [searching, setSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchedUsername, setSearchedUsername] = useState('');

  const handleSearch = async(username) => {
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
  };

  return (
    <>
    < Search onSearch={handleSearch}/>
    {searching && <Loading/>}
    {notFound && <UserNotFound username={searchedUsername}/>}
    {userData && (
      <div>
        <h2>User Data</h2>
        <p>Name: {userData.name}</p>
        <p>Username: {userData.login}</p>
        <p>Followers: {userData.followers}</p>
        <p>Following: {userData.following}</p>
        <p>User Image: <br /> 
           <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} />
           </p>
        <p>Public Repos: {userData.public_repos}</p>
      </div>
    )}
    </>
  )
}

export default App
