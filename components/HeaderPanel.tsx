"use client";
//Components
import { useState, useEffect } from "react";
import Image from "next/image";
//Icons
import { FiSearch } from "react-icons/fi";
//Types
import { GitHubUser, HeaderPanelProps, GitHubUserFull } from "@/types/types";

const profileCache = new Map<string, GitHubUserFull>();

export default function HeaderPanel({ onSelectUser }: HeaderPanelProps ) {
    const [value, setValue] = useState("");
    const [results, setResults] = useState<GitHubUser[]>([]);
    const [showPanel, setShowPanel] = useState<boolean>(false);

    const fetchUsers = async () => {
        try {
            const res = await fetch(`https://api.github.com/search/users?q=${value}`);
            const data = await res.json();

            if (!data.items) {
            setResults([]);
            return;
            }

            setResults(data.items.slice(0, 5)); // ONLY SEARCH RESULTS
        } catch {
            setResults([]);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
        if (value.length < 2) {
            setResults([]);
            return;
        }
        fetchUsers();
        }, 300);

        return () => clearTimeout(timeout);
    }, [value]);

    const handleSelect = (username: string) => {
        onSelectUser(username);
        setValue(username);
        setShowPanel(false);
    };

    return (
        <header className="py-5 w-full h-[300px] max-w-[120rem] bg-[url(/images/hero-image-github-profile.jpg)] bg-no-repeat bg-top bg-cover">
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSelect(value);
                }} 
                className="relative flex w-[50%] mx-auto rounded rounded-[10px] bg-[#20293A]"
            >
                <label className="flex justify-center items-center px-4">
                    <FiSearch size={20} />
                </label>
                <input
                    type="text"
                    placeholder="username"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setShowPanel(true);
                    }}
                    className="px-3 py-4 w-full focus:outline-0 placeholder:text-white"
                />
            </form>

            {showPanel && results.length > 0 && (
            <div className="absolute w-[50%] mx-auto left-0 right-0 mt-2 bg-[#111729] rounded-[15px] shadow-lg overflow-hidden z-20">
                {results.slice(0, 5).map((user) => (
                    <button
                        type="button"
                        key={user.id}
                        onClick={() => handleSelect(user.login)}
                        className="flex items-center gap-3 w-full px-2 py-2 duration-300 hover:bg-[#2A3550] text-left"
                    >
                        <Image
                            src={user.avatar_url || "/images/default-avatar.png"}
                            alt={`${user.login} profile img`}
                            width={90}
                            height={90}
                            className="rounded-[15px]"
                        />
                        <h1 className="text-[20px]">{user.login}</h1>
                    </button>
                    ))}
                </div>
            )}
        </header>
    );
}