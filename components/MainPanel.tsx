//Components
import Image from "next/image";
import Link from "next/link";
//Types
import { MainPanelProps } from "@/types/types";

export default function MainPanel({ error, user, repos }: MainPanelProps) {
    return(
        <main className="flex flex-col items-center w-full max-w-[120rem]">
            {error && <p className="text-red-500">{error}</p>}

            {user && (
                <div className="px-3 flex flex-col items-center w-full max-w-[80rem]">
                    <div className="flex gap-5 items-center text-[20px] w-full">
                        <Image
                            src={user.avatar_url}
                            alt={user.name + ' profile imager'}
                            className="rounded-[15px] -mt-20 border border-10 border-[#20293A]"
                            width={150}
                            height={150}
                        />
                        <div className="flex bg-[#111729] px-5 py-2 rounded rounded-[15px] divide-x divide-gray-600">
                            <h2 className="py-1 pe-3">Followers</h2>
                            <h2 className="py-1 ps-3">{user.followers}</h2>
                        </div>
                        <div className="flex bg-[#111729] px-5 py-2 rounded rounded-[15px] divide-x divide-gray-600">
                            <h2 className="py-1 pe-3">Following</h2>
                            <h2 className="py-1 ps-3">{user.following}</h2>
                        </div>
                        <div className="flex bg-[#111729] px-5 py-2 rounded rounded-[15px] divide-x divide-gray-600">
                            <h2 className="py-1 pe-3">Location</h2>
                            <h2 className="py-1 ps-3">{user.location}</h2>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <h3 className="text-3xl font-bold mt-4">{user.name || user.login}</h3>
                        <p className="">{user.bio}</p>
                    </div>
                    <div>
                        {repos.length > 0 && (
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                {repos.map((repo) => (
                                    <div
                                        key={repo.id}
                                        className="bg-[#111729] p-4 rounded-[15px] shadow-lg border border-[#20293A]"
                                    >
                                        <h3 className="text-xl font-bold mb-2">{repo.name}</h3>

                                        {repo.description && (
                                            <p className="text-gray-400 mb-3">{repo.description}</p>
                                        )}

                                        <div className="flex gap-4 text-sm text-gray-300">
                                        <span>⭐ {repo.stargazers_count}</span>
                                        <span>🍴 {repo.forks_count}</span>
                                        {repo.language && <span>{repo.language}</span>}
                                        </div>

                                        <Link
                                            href={repo.html_url}
                                            target="_blank"
                                            className="block mt-3 text-blue-400 hover:underline"
                                        >
                                            View on GitHub
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link href={`https://github.com/${user.login}?tab=repositories`} target="_blank">View all repositories</Link>
                </div>
            )}
        </main>
    );
}