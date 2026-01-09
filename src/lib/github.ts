export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    topics: string[];
    updated_at: string;
    pushed_at: string;
    fork: boolean;
}

// Default GitHub username - can be overridden via env var
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'jacuzzi8888';

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                },
                next: { revalidate: 3600 } // Cache for 1 hour
            }
        );

        if (!response.ok) {
            console.error('GitHub API error:', response.status);
            return [];
        }

        const repos: GitHubRepo[] = await response.json();

        // Filter out forks and sort by stars
        return repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count);
    } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
        return [];
    }
}

export function formatRepoDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Updated today';
    if (diffDays === 1) return 'Updated yesterday';
    if (diffDays < 7) return `Updated ${diffDays} days ago`;
    if (diffDays < 30) return `Updated ${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
    return `Updated ${Math.floor(diffDays / 365)} years ago`;
}

// Language colors for badges
export const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Rust: '#dea584',
    Go: '#00ADD8',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    Vue: '#41b883',
    Svelte: '#ff3e00',
};
