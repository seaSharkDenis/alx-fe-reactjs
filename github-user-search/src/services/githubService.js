// import.meta.env.VITE_APP_GITHUB_API_KEY;
import axios from "axios";

async function fetchUserData(username) {
    try{
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return response.data;
    }catch(error){
        if(error.response && error.response.status === 404){
            throw new Error("User not found");
        }else{
            throw new Error("Something went wrong");
        }
    }
}

export default fetchUserData;
