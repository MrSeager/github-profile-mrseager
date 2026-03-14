export interface HeaderPanelProps {
  onSelectUser: (username: string) => void;
}

export interface MainPanelProps {
  error: string;
  user: GitHubUserFull | null;
  repos: GitHubRepo[];
}

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
}

export interface GitHubUserSearch {
  id: number;
  login: string;
  avatar_url: string;
}

export interface GitHubUserFull {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}