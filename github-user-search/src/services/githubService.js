import axios from "axios";

async function fetchUserData(username, location = "", minimumRepositories = 0) {
    try {
        let query = `${username} in:login`;
        if (location) query += ` location:${location}`;
        if (minimumRepositories > 0) query += ` repos:>${minimumRepositories}`;

        const response = await axios.get(
            `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=10`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        // Fetch detailed data for each user
        const usersWithDetails = await Promise.all(
            response.data.items.map(async (user) => {
                const userDetails = await axios.get(
                    `https://api.github.com/users/${user.login}`,
                    {
                        headers: {
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    }
                );
                return {
                    ...user,
                    ...userDetails.data
                };
            })
        );

        return {
            total_count: response.data.total_count,
            items: usersWithDetails
        };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            throw new Error("User not found");
        } else if (error.response && error.response.status === 403) {
            // GitHub API rate limit exceeded
            throw new Error("API rate limit exceeded. Please try again later.");
        } else {
            throw new Error("Something went wrong");
        }
    }
}

export default fetchUserData;