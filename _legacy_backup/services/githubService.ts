import { GithubRepo } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

export const fetchUserRepos = async (username: string): Promise<GithubRepo[]> => {
  try {
    // Fetch repositories, sorted by last updated, up to 100 results
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`GitHub user "${username}" not found.`);
      }
      throw new Error('Failed to fetch repositories from GitHub.');
    }
    
    const data = await response.json();
    
    // Map the response to our simplified GithubRepo type
    return data.map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        language: repo.language,
        topics: repo.topics || [],
        homepage: repo.homepage,
    }));
  } catch (error) {
    console.error('GitHub API Error:', error);
    throw error;
  }
};
