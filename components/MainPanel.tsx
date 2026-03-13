//Components
import Image from "next/image";
//Types
import { MainPanelProps } from "@/types/types";

export default function MainPanel({ error, user }: MainPanelProps) {
    return(
        <main className="flex flex-col items-center w-full max-w-[120rem]">
            {error && <p className="text-red-500">{error}</p>}

            {user && (
                <div className="text-center flex flex-col items-start w-full max-w-[80rem]">
                    <div className="flex gap-3 items-center">
                        <Image
                            src={user.avatar_url}
                            alt={user.name + ' profile imager'}
                            className="rounded-[15px] -mt-30 border border-10 border-[#20293A]"
                            width={200}
                            height={200}
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
                    <div>
                        <h3 className="text-3xl font-bold mt-4">{user.name || user.login}</h3>
                    </div>
                </div>
            )}
        </main>
    );
}