import React from 'react';
import { Link } from 'react-router-dom';
import personAtDeskPic from "../../images/person-at-desk.jpg";

export default function NotApprovedDashboard() {
    return (
        <div className="mt-10 text-center">
            <h2 className="mb-8 text-4xl">Your registration is pending approval.</h2>
            <p className="mb-4 text-lg">It shouldn't take more than a couple of days.</p>
            <p className='text-lg'>Meanwhile, please&nbsp;
                <Link to="/profile" className="text-indigo-500 hover:text-indigo-700 hover:underline">
                    complete your profile information.
                </Link>
            </p>
            <img src={personAtDeskPic} alt="Person sitting at desk" className="mx-auto object-bottom bg-cover" />
        </div>
    );
}
