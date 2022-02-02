import React from 'react';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useStore } from "../../stores/store";

export default function NotApprovedBanner() {
    const { userStore } = useStore();

    return (
        <div className="container mx-auto my-10 px-4">
            <h2 className="mb-4 text-4xl text-gray-700">Hi, {userStore.user?.displayName}!</h2>
            <h4 className="text-xl text-gray-500">Just one more step to finish your registration.</h4>
            <div className="w-full my-14 p-8 flex flex-col items-center gap-4 border-2 border-orange-500 rounded-2xl
                            lg:flex-row lg:justify-center lg:gap-24"
            >
                <div className="">
                    <h4 className="text-xl text-gray-500">
                        <TipsAndUpdatesIcon sx={{ mr: 2, fontSize: "3.5rem" }} />Tips for creating a strong profile
                    </h4>
                </div>
                <ul className="list-disc grow-[2] space-y-3">
                    <li className="text-gray-700">
                        Make sure to use a profile picture that shows your whole face and does not include other people.
                    </li>
                    <li className="text-gray-700">
                        Only list the skills that you know you can provide.
                    </li>
                    <li className="text-gray-700">
                        Add a short, clean additional description if you need.
                    </li>
                </ul>
            </div>
        </div>
    )
}
