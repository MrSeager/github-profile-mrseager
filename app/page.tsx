// app/page.tsx
"use client";
//Components
import Image from "next/image";
import { useState } from "react";
import HeaderPanel from "@/components/HeaderPanel";
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
    <div className="text-white bg-black min-h-screen flex flex-col items-center">
      <HeaderPanel onSelectUser={searchUser} />

      <main className="p-8 flex flex-col items-center">
        {error && <p className="text-red-500">{error}</p>}

        {user && (
          <div className="text-center">
            <Image
              src={user.avatar_url}
              alt={user.name + ' profile imager'}
              className="rounded-full shadow"
              width={200}
              height={200}
            />
            <h1 className="text-3xl font-bold mt-4">{user.name || user.login}</h1>
          </div>
        )}
      </main>
    </div>
  );
}
