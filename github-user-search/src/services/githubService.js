// import.meta.env.VITE_APP_GITHUB_API_KEY;

async function fetchUserData(username) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) {
    throw new Error("User not found");
  }
  return await response.json();
}

export default fetchUserData;
