// app/page.tsx
"use client";
//Components
import Image from "next/image";
import { useState } from "react";
import HeaderPanel from "@/components/HeaderPanel";
import MainPanel from "@/components/MainPanel";
//Types
import { GitHubUserFull } from "@/types/types";

export default function Home() {
  const [user, setUser] = useState<GitHubUserFull | null>(null);
  const [error, setError] = useState("");

  const searchUser = async (username: string) => {
    setError("");
    setUser(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);

      if (!res.ok) {
        setError("User not found");
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="text-white bg-[#20293A] min-h-screen flex flex-col items-center">
      <HeaderPanel onSelectUser={searchUser} />

      <MainPanel 
        error={error}
        user={user}
      />
    </div>
  );
}
