"use client";
//Components
import { useState, useEffect } from "react";
import Image from "next/image";
//Icons
import { FiSearch } from "react-icons/fi";
//Types
import { GitHubUser } from "@/types/types";

interface HeaderPanelProps {
    onSelectUser: (username: string) => void;
}

export default function HeaderPanel({ onSelectUser }: HeaderPanelProps ) {
    const [value, setValue] = useState<string>("");
    const [results, setResults] = useState<GitHubUser[]>([]);
    const [showPanel, setShowPanel] = useState<boolean>(false);

    useEffect(() => {
        if (value.length < 2) {
            queueMicrotask(() => setResults([]));
            return;
        }

        const controller = new AbortController();

        const fetchUsers = async () => {
            try {
            const res = await fetch(
                `https://api.github.com/search/users?q=${value}`,
                { signal: controller.signal }
            );
            const data = await res.json();
            setResults(data.items || []);
            } catch (err) {
            // ignore abort errors
            }
        };

        fetchUsers();

        return () => controller.abort();
    }, [value]);

    const handleSelect = (username: string) => {
        onSelectUser(username);
        setValue(username);
        setShowPanel(false);
    };

    return (
        <header className="p-4 w-full max-w-[120rem]">
            <form 
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSelect(value);
                }} 
                className="relative flex w-[50%] mx-auto rounded rounded-[10px] bg-[#20293A]"
            >
                <label className="flex justify-center items-center px-3">
                    <FiSearch />
                </label>
                <input
                    type="text"
                    placeholder="Search GitHub username..."
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setShowPanel(true);
                    }}
                    className="px-3 py-2 w-full "
                />
            </form>

            {showPanel && results.length > 0 && (
            <div className="absolute w-[50%] mx-auto left-0 right-0 mt-2 bg-[#20293A] rounded-lg shadow-lg overflow-hidden z-20">
                {results.slice(0, 5).map((user) => (
                    <button
                        type="button"
                        key={user.id}
                        onClick={() => handleSelect(user.login)}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-[#2A3550] text-left"
                    >
                        <Image
                            src={user.avatar_url}
                            alt={user.login}
                            className="rounded-full"
                            width={100}
                            height={100}
                        />
                        <span>{user.login}</span>
                    </button>
                    ))}
                </div>
            )}
        </header>
    );
}