import axios from "axios";

async function fetchUserData(username, location = "", minRepos = 0) {
    try {
        let query = `${username} in:login`;
        if (location) query += ` location:${location}`;
        if (minRepos > 0) query += ` repos:>${minRepos}`;

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
                
                // Fetch additional repository data
                const reposResponse = await axios.get(
                    `https://api.github.com/users/${user.login}/repos?per_page=1&sort=updated`,
                    {
                        headers: {
                            'Accept': 'application/vnd.github.v3+json'
                        }
                    }
                );

                return {
                    ...user,
                    ...userDetails.data,
                    html_url: userDetails.data.html_url, // GitHub profile URL
                    last_updated_repo: reposResponse.data[0]?.name || 'None',
                    last_updated: reposResponse.data[0]?.updated_at || 'Unknown'
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
            throw new Error("API rate limit exceeded. Please try again later.");
        } else {
            throw new Error("Something went wrong");
        }
    }
}

export default fetchUserData;