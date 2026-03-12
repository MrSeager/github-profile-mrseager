export interface GitHubUser {
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
  public_repos: number;
  location: string | null;
}