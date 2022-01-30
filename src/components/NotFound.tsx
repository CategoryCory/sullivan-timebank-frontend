import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full grid place-items-center flex-grow">
            <div className="flex justify-center items-center gap-6">
                <h2 className="px-6 pb-3 text-5xl text-gray-400 border-r-2 border-gray-300">404</h2>
                <div>
                    <p className='text-gray-700'>That page couldn't be found.</p>
                    <p className='text-gray-700'>
                        You may&nbsp;
                        <button onClick={() => navigate(-1)} className="font-bold text-indigo-600 hover:text-indigo-800">
                            return to the previous page
                        </button>
                        &nbsp;or&nbsp;
                        <Link to="/" className='font-bold text-indigo-600 hover:text-indigo-800'>
                            go to the home page
                        </Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
