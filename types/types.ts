export interface HeaderPanelProps {
  onSelectUser: (username: string) => void;
}

export interface MainPanelProps {
  error: string;
  user: GitHubUserFull | null;
}

export interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
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