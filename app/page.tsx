"use client";
//Components
import { useState } from "react";
import HeaderPanel from "@/components/HeaderPanel";
import MainPanel from "@/components/MainPanel";
//Types
import { GitHubUserFull, GitHubRepo } from "@/types/types";

export default function Home() {
  const [user, setUser] = useState<GitHubUserFull | null>(null);
  const [error, setError] = useState<string>("");
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  const searchUser = async (username: string) => {
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);

      if (res.status === 403) {
        setError("GitHub rate limit reached. Try again in a minute.");
        return;
      }

      if (res.status === 404) {
        setError("User not found");
        return;
      }

      const data = await res.json();
      setUser(data);

      fetchRepos(username);
    } catch {
      setError("Something went wrong");
    }
  };

  const fetchRepos = async (username: string) => {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`
    );
    const data = await res.json();

    if (Array.isArray(data)) {
      setRepos(data);
    } else {
      setRepos([]); // rate limit or error
    }
  };

  return (
    <div className="text-white bg-[#20293A] min-h-screen flex flex-col items-center">
      <HeaderPanel onSelectUser={searchUser} />

      <MainPanel 
        error={error}
        user={user}
        repos={repos}
      />
    </div>
  );
}
